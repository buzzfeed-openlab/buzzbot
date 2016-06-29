import React from "react";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';
import update from 'react-addons-update';

import ResponseList from './ResponseList';
import PollView from './PollView';

export default class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            responses: {},
            messages: {},
            users: {}
        }

        this.handleResponses = this.handleResponses.bind(this);
        this.handleNewResponse = this.handleNewResponse.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
        this.handleUsers = this.handleUsers.bind(this);
    }

    componentWillMount() {
        const socket = this.props.route.socket;

        socket.on('responses', this.handleResponses);
        socket.on('new-response', this.handleNewResponse);
        socket.on('messages', this.handleMessages);
        socket.on('users', this.handleUsers);

        socket.emit('get-responses', { limit: 1000 });
    }

    componentWillUnmount() {
        const socket = this.props.route.socket;

        socket.removeListener('responses', this.handleResponses);
        socket.removeListener('new-response', this.handleNewResponse);
        socket.removeListener('messages', this.handleMessages);
        socket.removeListener('users', this.handleUsers);
    }

    render() {
        const responseLists = Object.keys(this.state.responses).map((listKey) => {
            const message = this.state.messages[listKey];

            if (message && message.poll) {
                return (
                    <Col sm={12} md={6} key={listKey}>
                        <PollView message={message} />
                    </Col>
                );
            }

            return (
                <Col sm={12} md={6} key={listKey}>
                    <ResponseList
                        responses={this.state.responses[listKey]}
                        message={message}
                        users={this.state.users}
                    />
                </Col>
            );
        });

        // bump the unassociated column up to the top
        for (var i = 0; i < responseLists.length; ++i) {
            if (responseLists[i].key == 'none') {
                const noneList = responseLists.splice(i, 1);
                responseLists.splice(0, 0, ...noneList);
                break;
            }
        }

        return (
           <div>
                <Row>
                    {responseLists}
                </Row>
            </div>
        );
    }

    handleResponses(responses) {
        const responseState = {},
            mesageIds = [],
            userIds = [];

        for (var i = 0; i < responses.length; ++i) {
            const response = responses[i];
            const messageId = response.messageId || 'none';

            if (!responseState[messageId]) {
                responseState[messageId] = [];
            }

            if (messageId != 'none') {
                mesageIds.push(messageId);
            }

            userIds.push(response.userId);

            responseState[messageId].push(response);
        }

        // fetch the message data relevant to these responses
        if (mesageIds.length) {
            this.props.route.socket.emit('get-messages', {
                messageIds: [ ...new Set(mesageIds) ]
            });
        }

        // fetch the user data relevant to these responses
        if (userIds.length) {
            this.props.route.socket.emit('get-users', {
                userIds: [ ...new Set(userIds) ]
            })
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

    handleUsers(users) {
        const userState = {};

        for (var i = 0; i < users.length; ++i) {
            const user = users[i];

            userState[user.id] = {
                $set: user
            }
        }

        const newState = update(this.state, {
            users: userState
        });

        this.setState(newState);
    }
}
