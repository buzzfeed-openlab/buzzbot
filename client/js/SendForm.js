import React from "react";
import update from 'react-addons-update';
import request from 'axios';
import Select from 'react-select';
import ReactBootstrap, {
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Form,
    Checkbox,
    Button,
} from 'react-bootstrap';


export default class SendForm extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: {},
            tags: {},
            selectedMessage: undefined,
            selectedTags: undefined
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.validateAll = this.validateAll.bind(this);
    }

    componentWillMount() {
        const socket = this.props.route.socket;

        socket.on('messages', this.handleMessages);
        socket.on('tags', this.handleTags);

        socket.emit('get-messages');
        socket.emit('get-tags');
    }

    componentWillUnmount() {
        const socket = this.props.route.socket;

        socket.removeListener('messages', this.handleMessages);
        socket.removeListener('tags', this.handleTags);
    }

    render() {
        const midToText = {};
        for (var mid in this.state.messages) {
            const message = this.state.messages[mid];
            var messageText = message.data.text;
            if (!messageText && message.data.attachment && message.data.attachment.payload) {
                messageText = message.data.attachment.payload.text;
            }

            midToText[mid] = messageText;
        }

        const messageList = Object.keys(midToText).map((mid) => {
            return {
                value: mid,
                label: mid + ': ' + midToText[mid]
            }
        });

        const tagList = Object.keys(this.state.tags).map((tagid) => {
            const tag = this.state.tags[tagid];
            return {
                value: tagid,
                label: tag.messageId + ': ' + midToText[tag.messageId] + ' => ' + tag.tag
            };
        });

        return (
            <div>
                <Row>
                    <Col md={12}>
                        <form onSubmit={this.sendMessage}>
                            <h3>Send a Message</h3>
                            <FormGroup controlId="formSendMessageSelect">
                                <ControlLabel>Select Message to send</ControlLabel>
                                <Select
                                    name="formSendMessageSelect"
                                    value={this.state.selectedMessage}
                                    options={messageList}
                                    onChange={this.handleMessageChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="formSendTagsSelect">
                                <ControlLabel>Send only to users with ALL selected Tags</ControlLabel>
                                <Select
                                    name="formSendTagsSelect"
                                    multi={true}
                                    value={this.state.selectedTags}
                                    options={tagList}
                                    onChange={this.handleTagChange}
                                />
                            </FormGroup>
                            <Button
                                type="submit"
                                disabled={this.validateAll() != 'success'}
                            >
                                  Send Message
                            </Button>
                        </form>
                    </Col>
                </Row>
            </div>
        );
    }

    sendMessage() {
        var tagIds = [];
        if (this.state.selectedTags) {
            tagIds = this.state.selectedTags.map((t) => t.value)
        }

        request.post('/send', {
            messageId: this.state.selectedMessage.value,
            tagIds: tagIds
        }).then((response) => {
            window.location.reload();
        }).catch((response) => {
            console.log('ERROR SENDING OUT MESSAGE: ', response);
        });
    }

    handleMessages(messages) {
        const messageState = {};

        for (var i = 0; i < messages.length; ++i) {
            const message = messages[i];
            message.data = JSON.parse(message.data);

            messageState[message.id] = {
                $set: message
            }
        }

        const newState = update(this.state, {
            messages: messageState
        });

        this.setState(newState);
    }

    handleTags(tags) {
        const tagState = {};

        for (var i = 0; i < tags.length; ++i) {
            const tag = tags[i];

            tagState[tag.id] = {
                $set: tag
            }
        }

        const newState = update(this.state, {
            tags: tagState
        });

        this.setState(newState);
    }

    handleMessageChange(message) {
        const newState = update(this.state, {
            selectedMessage: {
                $set: message
            }
        });

        this.setState(newState);
    }

    handleTagChange(tags) {
        const newState = update(this.state, {
            selectedTags: {
                $set: tags
            }
        });
        this.setState(newState);
    }

    validateAll() {
        if (this.state.selectedMessage) {
            return 'success';
        }

        return 'error';
    }
}
