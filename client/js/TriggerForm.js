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


export default class TriggerForm extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: {},
            tags: {},
            triggerTag: undefined,
            triggerMessage: undefined,
            triggeredMessage: undefined,
        };

        this.createTrigger = this.createTrigger.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleTriggerMessageChange = this.handleTriggerMessageChange.bind(this);
        this.validateAll = this.validateAll.bind(this);
    }

    componentWillMount() {
        const socket = this.props.socket;

        socket.on('tags', this.handleTags);
        socket.on('messages', this.handleMessages);

        socket.emit('get-tags');
        socket.emit('get-messages');
    }

    componentWillUnmount() {
        const socket = this.props.socket;

        socket.removeListener('tags', this.handleTags);
        socket.removeListener('messages', this.handleMessages);
    }

    render() {
        const midToText = {};
        const triggerMidToText = {};
        for (var mid in this.state.messages) {
            const message = this.state.messages[mid];
            var messageText = message.data.text;
            if (!messageText && message.data.attachment && message.data.attachment.payload) {
                messageText = message.data.attachment.payload.text;
            }

            midToText[mid] = messageText;

            // if the message expects an unstructured reply, it can be
            // a trigger message
            if (message.unstructuredReply) {
                triggerMidToText[mid] = messageText;
            }
        }

        const tagList = Object.keys(this.state.tags).map((tagid) => {
            const tag = this.state.tags[tagid];

            return {
                value: tagid,
                label: tag.messageId + ': ' + midToText[tag.messageId] + ' => ' + tag.tag
            }
        });

        const messageList = Object.keys(midToText).map((mid) => {
            return {
                value: mid,
                label: mid + ': ' + midToText[mid]
            }
        });

        const triggerMessageList = Object.keys(triggerMidToText).map((mid) => {
            return {
                value: mid,
                label: mid + ': ' + triggerMidToText[mid]
            }
        });

        return (
            <Row>
            <Col md={12}>
                <form onSubmit={this.createTrigger}>
                    <Row>
                        <Col md={12}>
                            <h3>Create a Trigger</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={6}>
                            <FormGroup controlId="formCreateTriggerTagSelect">
                                <ControlLabel>Select a trigger Tag</ControlLabel>
                                <Select
                                    name="formCreateTriggerTagSelect"
                                    value={this.state.triggerTag}
                                    options={tagList}
                                    onChange={this.handleTagChange}
                                />
                                <ControlLabel>OR Select a trigger Message</ControlLabel>
                                <Select
                                    name="formCreateTriggerMessageSelect"
                                    value={this.state.triggerMessage}
                                    options={triggerMessageList}
                                    onChange={this.handleTriggerMessageChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={6}>
                            <FormGroup controlId="formCreateTriggeredMessageSelect">
                                <ControlLabel>Select a message to trigger</ControlLabel>
                                <Select
                                    name="formCreateTriggeredMessageSelect"
                                    value={this.state.triggeredMessage}
                                    options={messageList}
                                    onChange={this.handleMessageChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button
                                type="submit"
                                disabled={this.validateAll() != 'success'}
                            >
                                  Create Trigger
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Col>
            </Row>
        );
    }

    createTrigger() {
        const data = {
            messages: [this.state.triggeredMessage.value]
        }

        if (this.state.triggerTag) {
            data.triggerTagId = this.state.triggerTag.value;
        } else if (this.state.triggerMessage) {
            data.triggerMessageId = this.state.triggerMessage.value;
        }

        request.post('/triggers', data).then((response) => {
            window.location.reload();
        }).catch((response) => {
            console.log('ERROR CREATING TRIGGER: ', response);
        });
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

    handleTagChange(tag) {
        const newState = update(this.state, {
            triggerTag: {
                $set: tag
            }
        });

        this.setState(newState);
    }

    handleMessageChange(message) {
        const newState = update(this.state, {
            triggeredMessage: {
                $set: message
            }
        });

        this.setState(newState);
    }

    handleTriggerMessageChange(message) {
        const newState = update(this.state, {
            triggerMessage: {
                $set: message
            }
        });

        this.setState(newState);
    }

    validateAll() {
        if ((this.state.triggerTag || this.state.triggerMessage) && this.state.triggeredMessage) {
            return 'success';
        }

        return 'error';
    }
}
