import React from "react";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';
import update from 'react-addons-update';

import ResponseList from './ResponseList';

export default class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            responses: {},
            other: 234
        }

        this.handleNewResponse = this.handleNewResponse.bind(this);
    }

    componentWillMount() {
        this.props.route.socket.on('new-response', this.handleNewResponse);
    }

    render() {
        const responseLists = Object.keys(this.state.responses).map((listKey, i) => {
            const list = this.state.responses[listKey];
            return (
                <Col sm={12} md={6} key={i}>
                    <ResponseList
                        responses={list}
                        messageId={listKey}
                    />
                </Col>
            );
        });

        return (
           <div>
                <Row>
                    {responseLists}
                </Row>
            </div>
        );
    }

    handleNewResponse(response) {
        console.log('HANDLE NEW RESPONSE', response);

        const messageId = response.messageId || 'none';
        const responseList = this.state.responses[messageId] || [];

        const newState = update(this.state, {
            responses: {
                [messageId]: {
                    $set: responseList.concat([ response ])
                }
            }
        });

        this.setState(newState);
    }
}
