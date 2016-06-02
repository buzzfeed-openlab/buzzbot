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
} from 'react-bootstrap';

export default class MessageForm extends React.Component {
    constructor() {
        super();

        this.validateMessageText = this.validateMessageText.bind(this);
        this.validateButton = this.validateButton.bind(this);

        this.handleMessageTextChange = this.handleMessageTextChange.bind(this);
        this.handleButtonChange = this.handleButtonChange.bind(this);
        this.handleUnstructuredChange = this.handleUnstructuredChange.bind(this);

        this.state = {
            messageText: '',
            unstructuredReply: false,
            buttons: [
                { text: '', tag: '' },
                { text: '', tag: '' },
                { text: '', tag: '' },
            ],
        };
    }

    render() {
        return (
            <form>
                <FormGroup
                    controlId="formMessageText"
                    validationState={this.validateMessageText()}
                >
                    <ControlLabel>Message text:</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.messageText}
                        placeholder="Enter text"
                        onChange={this.handleMessageTextChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>

                <Checkbox
                    checked={this.state.unstructuredReply}
                    onChange={this.handleUnstructuredChange}
                >
                    Expect unstructured reply
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
                            disabled={this.state.unstructuredReply}
                        />
                        <FormControl.Feedback />
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.buttons[0].tag}
                            placeholder="button tag"
                            onChange={this.handleButtonChange.bind(this, 0, 'tag')}
                            disabled={this.state.unstructuredReply}
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
                            disabled={this.state.unstructuredReply}
                        />
                        <FormControl.Feedback />
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.buttons[1].tag}
                            placeholder="button tag"
                            onChange={this.handleButtonChange.bind(this, 1, 'tag')}
                            disabled={this.state.unstructuredReply}
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
                            disabled={this.state.unstructuredReply}
                        />
                        <FormControl.Feedback />
                        {' '}
                        <FormControl
                            type="text"
                            value={this.state.buttons[2].tag}
                            placeholder="button tag"
                            onChange={this.handleButtonChange.bind(this, 2, 'tag')}
                            disabled={this.state.unstructuredReply}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </Form>
            </form>
        );
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

    handleMessageTextChange(e) {
        const newState = update(this.state, {
            messageText: {
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
}