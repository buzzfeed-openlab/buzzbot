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
                    <p>This is an Open Lab project -- email <a href="mailto:WestleyArgentum@gmail.com" target="_top">WestleyArgentum@gmail.com</a> with any questions / feedback</p>
                </Col>
            </Row>
        );
    }
}
