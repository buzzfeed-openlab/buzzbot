
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
                        <p>The responses below are unprompted. People may be reaching out with something to share, or just saying hi.</p>
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
                    <p key={'buttonList'} style={{ textAlign: 'center', marginTop: 8, marginBottom: 10.5 }}>
                        {data.buttons.map((b) => b.title).join('  |  ')}
                    </p>
                );
            }

        } else if (messageData.text) {
            messageText = messageData.text;
        } else {
            console.log('WARNING unknown message type: ', messageData);
        }

        return (
            <div style={this.props.style}>
            <Row>
                <Col md={12}>
                    <h3>Message id: {this.props.message.id}</h3>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <p key={'messageText'}>
                        {messageText}
                    </p>
                    {buttonList}
                </Col>
            </Row>
            </div>
        );
    }
}
