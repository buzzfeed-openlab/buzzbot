
import React from "react";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';

export default class Message extends React.Component {
    constructor() {
        super();
    }

    render() {
        if (!this.props.message) {
            return <div></div>;
        }

        const messageData = JSON.parse(this.props.message.data);

        var messageBodyDiv;
        if (messageData.attachment && messageData.attachment.payload) {
            const data = messageData.attachment.payload;

            var buttons;
            if (data.buttons) {
                buttons = data.buttons.map((buttonData) => {
                    return (
                        <Row>
                            <Col md={12}>
                                {buttonData.title}
                            </Col>
                        </Row>
                    );
                });
            }

            messageBodyDiv = (
                <div>
                <Row>
                    <Col md={12}>
                        {data.text}
                    </Col>
                </Row>
                {buttons}
                </div>
            );
        } else {
            console.log('WARNING unknown message type: ', messageData);
        }

        return (
            <div>
            <Row>
                <Col md={12}>
                    Message id: {this.props.message.id}
                </Col>
            </Row>
            {messageBodyDiv}
            </div>
        );
    }
}
