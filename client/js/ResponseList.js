
import React from "react";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';
import ReactList from 'react-list';

import Response from './Response';
import Message from './Message';

export default class ResponseList extends React.Component {
    constructor() {
        super();

        this.renderResponse = this.renderResponse.bind(this);
    }

    render() {
        const listBoxStyle = {
            overflow: 'auto',
            maxHeight: 400
        }

        return (
            <div>
                <Message message={this.props.message}/>
                <div style={listBoxStyle}>
                    <ReactList
                        itemRenderer={this.renderResponse}
                        length={this.props.responses.length}
                        type='variable'
                    />
                </div>
            </div>
        );
    }

    renderResponse(i, key) {
        return (
            <div key={key}>
                <Response response={this.props.responses[i]} />
            </div>
        );
    }
}
