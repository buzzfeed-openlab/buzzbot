
import React from "react";
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
            attachmentRow = (
                <Row>
                    <Col md={12}>
                        {JSON.stringify(this.props.response.attachments)}
                    </Col>
                </Row>
            );
        }

        return (
            <div>
                <Row>
                    <Col md={6}>
                        Response id: {this.props.response.id}
                    </Col>
                    <Col md={6}>
                        user: {this.props.response.userId}
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
