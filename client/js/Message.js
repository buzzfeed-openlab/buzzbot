
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

        return <div>message: {JSON.stringify(this.props.message)}</div>;
    }
}
