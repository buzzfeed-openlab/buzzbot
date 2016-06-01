
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

        var messageBodyDiv;
        if (messageData.attachment && messageData.attachment.payload) {
            const data = messageData.attachment.payload;

            var buttonList;
            if (data.buttons) {
                buttonList = (
                    <p key={'buttonList'} style={{ textAlign: 'center', marginTop: 8, marginBottom: 10.5 }}>
                        {data.buttons.map((b) => b.title).join('  |  ')}
                    </p>
                );
            }

            messageBodyDiv = [
                <p key={'messageText'}>
                    {data.text}
                </p>,
                buttonList
            ];
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
                    {messageBodyDiv}
                </Col>
            </Row>
            </div>
        );
    }
}
