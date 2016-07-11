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
    Radio,
    InputGroup
} from 'react-bootstrap';

import request from 'axios';


export default class MessageForm extends React.Component {
    constructor() {
        super();

        this.submitMessage = this.submitMessage.bind(this);

        this.shouldDisableButtons = this.shouldDisableButtons.bind(this);
        this.validateMessageText = this.validateMessageText.bind(this);
        this.validateButton = this.validateButton.bind(this);
        this.validateAll = this.validateAll.bind(this);

        this.handleMessageTextChange = this.handleMessageTextChange.bind(this);
        this.handleMetadataTextChange = this.handleMetadataTextChange.bind(this);
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.handleUnstructuredChange = this.handleUnstructuredChange.bind(this);
        this.handlePollChange = this.handlePollChange.bind(this);
        this.handleSurpriseMeChange = this.handleSurpriseMeChange.bind(this);

        this.state = {
            messageText: '',
            mediaType: 'text',
            unstructuredReply: false,
            poll: false,
            surpriseMe: false,
            buttons: [
                { text: '', tag: '' },
                { text: '', tag: '' },
                { text: '', tag: '' },
            ],
        };
    }

    render() {
        return (
            <Row>
            <Col md={12}>
            <form onSubmit={this.submitMessage}>
                <h3>Create a Message</h3>
                <FormGroup
                    controlId="formMessageText"
                    validationState={this.validateMessageText()}
                >
                    <ControlLabel>Message text (or media url):</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.messageText}
                        placeholder="message text (or media url)"
                        onChange={this.handleMessageTextChange}
                    />
                    <FormControl.Feedback />

                    <FormGroup>
                        <Radio 
                            name={'mediaType'}
                            checked={this.state.mediaType == 'text' }
                            onChange={this.handleMediaTypeChange.bind(this, 'text')}
                            inline
                        >
                            Text
                        </Radio>
                        {' '}
                        <Radio
                            name={'mediaType'}
                            checked={this.state.mediaType == 'image' }
                            onChange={this.handleMediaTypeChange.bind(this, 'image')}
                            inline
                        >
                            Image URL
                        </Radio>
                        {' '}
                        <Radio
                            name={'mediaType'}
                            checked={this.state.mediaType == 'video' }
                            onChange={this.handleMediaTypeChange.bind(this, 'video')}
                            inline
                        >
                            Video URL
                        </Radio>
                    </FormGroup>
                </FormGroup>

                <ControlLabel>Metadata (only visible in amdin interface):</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.metadata}
                    placeholder="metadata text"
                    onChange={this.handleMetadataTextChange}
                />

                <Checkbox
                    checked={this.state.unstructuredReply}
                    onChange={this.handleUnstructuredChange}
                >
                    Expect unstructured reply &nbsp;&nbsp;(users will be able to respond with arbitray text or media)
                </Checkbox>

                <Checkbox
                    checked={this.state.poll}
                    onChange={this.handlePollChange}
                >
                    Poll question &nbsp;&nbsp;(must expect unstructured reply)
                </Checkbox>

                <Checkbox
                    checked={this.state.surpriseMe}
                    onChange={this.handleSurpriseMeChange}
                >
                    "Surprise Me" Message &nbsp;&nbsp;(must expect unstructured reply)
                </Checkbox>

                <Form componentClass="fieldset" inline>
                    <FormGroup controlId="formButton1Text" validationState={this.validateButton(0)}>
                        <ControlLabel>Button 1: </ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.buttons[0].text}
                            placeholder="button text"
                            onChange={this.handleButtonChange.bind(this, 0, 'text')}
                            disabled={this.shouldDisableButtons()}
                        />
                        <FormControl.Feedback />
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.buttons[0].tag}
                            placeholder="button tag"
                            onChange={this.handleButtonChange.bind(this, 0, 'tag')}
                            disabled={this.shouldDisableButtons()}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </Form>
                <Form componentClass="fieldset" inline>
                    <FormGroup controlId="formButton2Text" validationState={this.validateButton(1)}>
                        <ControlLabel>Button 2: </ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.buttons[1].text}
                            placeholder="button text"
                            onChange={this.handleButtonChange.bind(this, 1, 'text')}
                            disabled={this.shouldDisableButtons()}
                        />
                        <FormControl.Feedback />
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.buttons[1].tag}
                            placeholder="button tag"
                            onChange={this.handleButtonChange.bind(this, 1, 'tag')}
                            disabled={this.shouldDisableButtons()}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </Form>
                <Form componentClass="fieldset" inline>
                    <FormGroup controlId="formButton3Text" validationState={this.validateButton(2)}>
                        <ControlLabel>Button 3: </ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.buttons[2].text}
                            placeholder="button text"
                            onChange={this.handleButtonChange.bind(this, 2, 'text')}
                            disabled={this.shouldDisableButtons()}
                        />
                        <FormControl.Feedback />
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.buttons[2].tag}
                            placeholder="button tag"
                            onChange={this.handleButtonChange.bind(this, 2, 'tag')}
                            disabled={this.shouldDisableButtons()}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </Form>
                <Button
                    type="submit"
                    disabled={this.validateAll() != 'success'}
                >
                      Submit
                </Button>
            </form>
            </Col>
            </Row>
        );
    }

    submitMessage() {
        var buttonData = [];
        for (var i = 0; i < this.state.buttons.length; ++i) {
            if (this.state.buttons[i].text) {
                const button = this.state.buttons[i];
                buttonData.push({
                    "title": button.text,
                    "type": "postback",
                    "payload": button.tag
                });
            }
        }

        var messageBody;
        if (this.state.unstructuredReply || this.state.poll || !buttonData.length) {
            const mediaType = this.state.mediaType;
            if (mediaType == 'text') {
                messageBody = {
                    "message": {
                        "text": this.state.messageText
                    },
                }
            } else if (mediaType == 'image') {
                messageBody = {
                    "message": {
                        "attachment": {
                            "type":"image",
                            "payload": {
                                "url": this.state.messageText
                            }
                        }
                    }
                }
            } else if (mediaType == 'video') {
                messageBody = {
                    "message": {
                        "attachment": {
                            "type":"video",
                            "payload": {
                                "url": this.state.messageText
                            }
                        }
                    }
                }
            }

            messageBody.unstructuredReply = this.state.unstructuredReply;
            messageBody.poll = this.state.poll;
            messageBody.surpriseMe = this.state.surpriseMe;

        } else if (buttonData.length) {
            messageBody = {
                "message": {
                    "attachment": {
                        "type":"template",
                        "payload": {
                            "template_type": "button",
                            "text": this.state.messageText,
                            "buttons": buttonData
                        }
                    }
                }
            }
        } else {
            console.log('ERROR BUILDING MESSAGE DATA');
        }

        if (this.state.metadata) {
            messageBody.metadata = this.state.metadata;
        }

        request.post('/messages', messageBody).then((response) => {
            window.location.reload();
        }).catch((response) => {
            console.log('ERROR POSTING NEW MESSAGE: ', response);
        });
    }

    shouldDisableButtons() {
        return this.state.unstructuredReply || this.state.poll || this.state.surpriseMe;
    }

    validateMessageText() {
        if (!this.state.messageText || !this.state.messageText.length) {
            return 'error';
        }

        return 'success';
    }

    validateButton(index) {
        const buttonState = this.state.buttons[index];

        if (!buttonState) {
            return 'success';
        }

        // if button text is set but tag isn't,
        // or if button text is too long
        if ((buttonState.text && !buttonState.tag) ||
            (buttonState.text.length > 20)) {
            return 'error';
        }

        // if button tag is set but text isn't,
        // or if button tag is too long
        if ((buttonState.tag && !buttonState.text) ||
            (buttonState.tag.length > 20)) {
            return 'error';
        }

        // if anything is set while expecting an unstructured reply
        if ((buttonState.tag || buttonState.text) && this.state.unstructuredReply) {
            return 'error';
        }

        return 'success';
    }

    validateAll() {
        if (this.validateMessageText() == 'error') {
            return 'error';
        }

        if (!this.state.unstructuredReply &&
            (this.validateButton(0) == 'error' ||
             this.validateButton(1) == 'error' ||
             this.validateButton(2) == 'error')) {

            return 'error';
        }

        return 'success';
    }

    handleMessageTextChange(e) {
        const newState = update(this.state, {
            messageText: {
                $set: e.target.value
            }
        });

        this.setState(newState);
    }

    handleMediaTypeChange(type, e) {
        const newState = update(this.state, {
            mediaType: {
                $set: type
            }
        });

        this.setState(newState);
    }

    handleMetadataTextChange(e) {
        const newState = update(this.state, {
            metadata: {
                $set: e.target.value
            }
        });

        this.setState(newState);
    }

    handleButtonChange(index, field, e) {
        const newState = update(this.state, {
            buttons: {
                [index]: {
                    [field]: {
                        $set: e.target.value
                    }
                }
            }
        });

        this.setState(newState);
    }

    handleUnstructuredChange(e) {
        const newState = update(this.state, {
            unstructuredReply: {
                $set: e.target.checked
            }
        });

        this.setState(newState);
    }

    handlePollChange(e) {
        const newState = update(this.state, {
            poll: {
                $set: e.target.checked
            },
            unstructuredReply: {
                $set: e.target.checked
            }
        });

        this.setState(newState);
    }

    handleSurpriseMeChange(e) {
        const newState = update(this.state, {
            surpriseMe: {
                $set: e.target.checked
            },
            unstructuredReply: {
                $set: e.target.checked
            }
        });

        this.setState(newState);
    }
}