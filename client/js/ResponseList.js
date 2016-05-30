
import React from "react";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';
import ReactList from 'react-list';

export default class ResponseList extends React.Component {
    constructor() {
        super();

        this.renderResponse = this.renderResponse.bind(this);
    }

    render() {
        return (
            <ReactList
                itemRenderer={this.renderResponse}
                length={this.props.responses.length}
                type='variable'
            />
        );
    }

    renderResponse(i, key) {
        return <div key={key}>{JSON.stringify(this.props.responses[i])}</div>;
    }
}
