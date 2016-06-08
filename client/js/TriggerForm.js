import React from "react";
import update from 'react-addons-update';
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

import request from 'axios';


export default class TriggerForm extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: {},
            tags: {},
            triggerTag: undefined,
            triggeredMessage: undefined,
        };

        this.createTrigger = this.createTrigger.bind(this);
        this.handleTags = this.handleTags.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
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
        for (var mid in this.state.messages) {
            const message = this.state.messages[mid];
            var messageText = message.data.text;
            if (!messageText && message.data.attachment && message.data.attachment.payload) {
                messageText = message.data.attachment.payload.text;
            }

            midToText[mid] = messageText;
        }

        const tagList = Object.keys(this.state.tags).map((tagid) => {
            const tag = this.state.tags[tagid];

            return (
                <option value={tagid} key={tagid}>
                    {tag.messageId}: {midToText[tag.messageId]} => {tag.tag}
                </option>
            );
        });

        const messageList = Object.keys(midToText).map((mid) => {
            return (
                <option value={mid} key={mid}>
                    {mid}: {midToText[mid]}
                </option>
            );
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
                                <FormControl
                                    componentClass="select"
                                    value={this.state.triggerTag}
                                    onChange={this.handleTagChange}
                                >
                                    {tagList}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col sm={12} md={6}>
                            <FormGroup controlId="formCreateTriggerMessageSelect">
                                <ControlLabel>Select a message to trigger</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    value={this.state.triggeredMessage}
                                    onChange={this.handleMessageChange}
                                >
                                    {messageList}
                                </FormControl>
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
        request.post('/triggers', {
            triggerTagId: this.state.triggerTag,
            messages: [ this.state.triggeredMessage ]
        }).then((response) => {
            console.log('CREATED TRIGGER: ', response);
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

    handleTagChange(e) {
        const newState = update(this.state, {
            triggerTag: {
                $set: e.target.value
            }
        });

        this.setState(newState);
    }

    handleMessageChange(e) {
        const newState = update(this.state, {
            triggeredMessage: {
                $set: e.target.value
            }
        });

        this.setState(newState);
    }

    validateAll() {
        if (this.state.triggerTag && this.state.triggeredMessage) {
            return 'success';
        }

        return 'error';
    }
}
