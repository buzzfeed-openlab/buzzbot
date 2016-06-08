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


export default class SendForm extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: {},
            selectedMessage: undefined
        };

        this.sendMessage = this.sendMessage.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.validateAll = this.validateAll.bind(this);
    }

    componentWillMount() {
        const socket = this.props.route.socket;

        socket.on('messages', this.handleMessages);

        socket.emit('get-messages');
    }

    componentWillUnmount() {
        const socket = this.props.route.socket;

        socket.removeListener('messages', this.handleMessages);
    }

    render() {
        const messageList = Object.keys(this.state.messages).map((mid) => {
            const message = this.state.messages[mid];
            var messageText = message.data.text;
            if (!messageText && message.data.attachment && message.data.attachment.payload) {
                messageText = message.data.attachment.payload.text;
            }

            return (
                <option value={mid} key={mid}>
                    {mid}: {messageText}
                </option>
            );
        });

        return (
            <div>
                <Row>
                    <Col md={12}>
                        <form onSubmit={this.sendMessage}>
                            <h3>Send a Message</h3>
                            <FormGroup controlId="formSendMessageSelect">
                                <ControlLabel>Select Message to send</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    value={this.state.selectedMessage}
                                    onChange={this.handleMessageChange}
                                >
                                    {messageList}
                                </FormControl>
                            </FormGroup>
                            <Button
                                type="submit"
                                disabled={this.validateAll() != 'success'}
                            >
                                  Send to all
                            </Button>
                        </form>
                    </Col>
                </Row>
            </div>
        );
    }

    sendMessage() {
        request.post('/send', {
            messageId: this.state.selectedMessage
        }).then((response) => {
            console.log('SENT OUT MESSAGE: ', response);
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

    handleMessageChange(e) {
        const newState = update(this.state, {
            selectedMessage: {
                $set: e.target.value
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
