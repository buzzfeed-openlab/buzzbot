
import React from "react";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';

export default class Message extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>message id: {this.props.id}</div>;
    }
}
