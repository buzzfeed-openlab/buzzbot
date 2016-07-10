
import React from "react";
import ReactBootstrap, {
    Row,
    Col,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';

export default class Message extends React.Component {
    constructor() {
        super();
    }

    render() {
        if (!this.props.message) {
            return (
                <div>
                <Row>
                    <Col md={12}>
                        <h3>No Associated Message</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <h5 style={{ textAlign: 'left', marginTop: 8, marginBottom: 10.5 }}>
                            The responses below are unprompted. People may be reaching out with something to share, or just saying hi.
                        </h5>
                    </Col>
                </Row>
                </div>
            );
        }

        const messageData = JSON.parse(this.props.message.data);
        var messageText, buttonList;

        if (messageData.attachment && messageData.attachment.payload) {
            const data = messageData.attachment.payload;

            messageText = data.text;

            if (data.buttons) {
                buttonList = (
                    <h5 style={{ textAlign: 'left', marginTop: 8, marginBottom: 10.5 }}>
                        {data.buttons.map((b) => b.title).join('  |  ')}
                    </h5>
                );
            }

        } else if (messageData.text) {
            messageText = messageData.text;
        } else {
            console.log('WARNING unknown message type: ', messageData);
        }

        if (this.props.message.metadata) {
            messageText += ` [metadata: ${this.props.message.metadata}]`
        }

        return (
            <div style={this.props.style}>
            <Row>
                <Col md={12}>
                    <Row>
                    <Col md={12}>
                        <h3>{messageText}</h3>
                    </Col>
                    </Row>
                    <Row>
                    <Col sm={8} md={8}>
                        {buttonList}
                    </Col>
                    <Col sm={4} md={4}>
                        <h5 style={{ textAlign: 'right', marginTop: 8, marginBottom: 10.5 }}>
                            Message Id: {this.props.message.id}
                        </h5>
                    </Col>
                    </Row>
                </Col>
            </Row>
            </div>
        );
    }
}
