
import React from "react";
import ReactList from 'react-list';
import ReactBootstrap, {
    Row,
    Col,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';

import Response from './Response';
import Message from './Message';

export default class ResponseList extends React.Component {
    constructor() {
        super();

        this.renderResponse = this.renderResponse.bind(this);
    }

    render() {
        const messageBoxStyle = {
            minHeight: 100,
        };

        const listBoxStyle = {
            overflow: 'auto',
            maxHeight: 512,
        };

        return (
            <div>
                <Message message={this.props.message} style={messageBoxStyle}/>
                <ListGroup style={listBoxStyle}>
                    <ReactList
                        itemRenderer={this.renderResponse}
                        length={this.props.responses.length}
                        type='variable'
                        updateWhenThisChanges={this.props.users}
                    />
                </ListGroup>
            </div>
        );
    }

    renderResponse(i, key) {
        const response = this.props.responses[i];

        return (
            <ListGroupItem key={key}>
                <Response
                    response={response}
                    user={this.props.users[response.userId]}
                />
            </ListGroupItem>
        );
    }
}
