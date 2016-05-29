import React from "react";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';


export default class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Row style={this.props.style}>
                <Col lg={12}>
                    <p>Footer Footer Footer</p>
                </Col>
            </Row>
        );
    }
}
