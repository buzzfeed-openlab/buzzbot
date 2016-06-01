import React from "react";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';
import update from 'react-addons-update';

import ResponseList from './ResponseList';

export default class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            responses: {},
            messages: {}
        }

        this.handleResponses = this.handleResponses.bind(this);
        this.handleNewResponse = this.handleNewResponse.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
    }

    componentWillMount() {
        const socket = this.props.route.socket;

        socket.on('responses', this.handleResponses);
        socket.on('new-response', this.handleNewResponse);
        socket.on('messages', this.handleMessages);

        socket.emit('get-responses', { limit: 1000 });
    }

    componentWillUnmount() {
        const socket = this.props.route.socket;

        socket.removeListener('responses', this.handleResponses);
        socket.removeListener('new-response', this.handleNewResponse);
        socket.removeListener('messages', this.handleMessages);
    }

    render() {
        const responseLists = Object.keys(this.state.responses).map((listKey) => {
            return (
                <Col sm={12} md={6} key={listKey}>
                    <ResponseList
                        responses={this.state.responses[listKey]}
                        message={this.state.messages[listKey]}
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
        const mesageIds = [];

        for (var i = 0; i < responses.length; ++i) {
            const response = responses[i];
            const messageId = response.messageId || 'none';

            if (!responseState[messageId]) {
                responseState[messageId] = [];
            }

            if (messageId != 'none') {
                mesageIds.push(messageId);
            }

            responseState[messageId].push(response);
        }

        if (mesageIds.length) {
            this.props.route.socket.emit('get-messages', {
                messageIds: [...new Set(mesageIds)]
            });
        }

        const newState = update(this.state, {
            responses: {
                $set: responseState
            }
        });

        this.setState(newState);
    }

    handleNewResponse(response) {
        const messageId = response.messageId || 'none';
        const responseList = this.state.responses[messageId] || [];

        const newState = update(this.state, {
            responses: {
                [messageId]: {
                    $set: [ response ].concat(responseList)
                }
            }
        });

        this.setState(newState);
    }

    handleMessages(messages) {
        const messageState = {};

        for (var i = 0; i < messages.length; ++i) {
            const message = messages[i];

            messageState[message.id] = {
                $set: message
            }
        }

        const newState = update(this.state, {
            messages: messageState
        });

        this.setState(newState);
    }
}
