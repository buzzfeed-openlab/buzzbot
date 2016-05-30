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

        this.handleResponses = this.handleResponses.bind(this);
        this.handleNewResponse = this.handleNewResponse.bind(this);
    }

    componentWillMount() {
        const socket = this.props.route.socket;

        socket.on('responses', this.handleResponses);
        socket.on('new-response', this.handleNewResponse);

        socket.emit('get-responses', { limit: 100 });
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

    handleResponses(responses) {
        const responseState = {};

        for (var i = 0; i < responses.length; ++i) {
            const response = responses[i];
            const messageId = response.messageId || 'none';

            if (!responseState[messageId]) {
                responseState[messageId] = [];
            }

            responseState[messageId].push(response);
        }

        const newState = update(this.state, {
            responses: {
                $set: responseState
            }
        });

        this.setState(newState);
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
