
import React from 'react';
import {
    default as Video,
    Controls,
    Play,
    Mute,
    Seek,
    Fullscreen,
    Time,
    Overlay
} from 'react-html5video';

import ReactBootstrap, { Row, Col } from 'react-bootstrap';


export default class Response extends React.Component {
    constructor() {
        super();
    }

    render() {
        var textRow, attachmentRow;

        if (this.props.response.text) {
            textRow = (
                <Row>
                    <Col md={12}>
                        <h4>{this.props.response.text}</h4>
                    </Col>
                </Row>
            );
        }

        if (this.props.response.attachments) {
            const attachmentViews = this.props.response.attachments.map((attachment) => {
                if (attachment.type == 'image') {
                    return (
                        <Col md={12} key={attachment.payload.url}>
                            <img
                                src={attachment.payload.url}
                                width={400}
                            />
                        </Col>
                    );
                } else if (attachment.type == 'video') {
                    return (
                        <Col md={12} key={attachment.payload.url}>
                            <Video controls autoPlay loop muted width={400}>
                                <source src={attachment.payload.url} type="video/webm" />
                                <Controls>
                                    <Play />
                                    <Seek />
                                    <Time />
                                    <Mute />
                                    <Fullscreen />
                                </Controls>
                            </Video>
                        </Col>
                    );
                }
            });
            attachmentRow = (
                <Row>
                    {attachmentViews}
                </Row>
            );
        }

        var userLabel = this.props.response.userId;
        if (this.props.user) {
            userLabel = this.props.user.firstName + ' ' + this.props.user.lastName;
        }

        return (
            <div>
                <Row>
                    <Col md={6}>
                        Response id: {this.props.response.id}
                    </Col>
                    <Col md={6}>
                        User: {userLabel}
                    </Col>
                </Row>
                {textRow}
                {attachmentRow}
                <Row>
                    <Col md={12}>
                        {this.props.response.createdAt}
                    </Col>
                </Row>
            </div>
        );
    }
}
