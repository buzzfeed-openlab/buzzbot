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
            responsesQueue: [],
            messages: {},
            users: {},
            usersQueue: [],
            renderCounter: 1
        }

        this.handleResponses = this.handleResponses.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
        this.queueResponse = this.queueResponse.bind(this);
        this.queueUsers = this.queueUsers.bind(this);
    }

    componentWillMount() {
        const socket = this.props.route.socket;

        socket.on('responses', this.handleResponses);
        socket.on('new-response', this.queueResponse);
        socket.on('messages', this.handleMessages);
        socket.on('users', this.queueUsers);

        socket.emit('get-responses', { limit: 1000 });

        this.intervals = [
            setInterval(this.processResponseAndUserQueues.bind(this), 10000)
        ];
    }

    componentWillUnmount() {
        const socket = this.props.route.socket;

        socket.removeListener('responses', this.handleResponses);
        socket.removeListener('new-response', this.queueResponse);
        socket.removeListener('messages', this.handleMessages);
        socket.removeListener('users', this.queueUsers);

        this.intervals.forEach(clearInterval);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.renderCounter == nextState.renderCounter) {
            return false;
        }

        return true;
    }

    render() {
        console.log('RENDER DASHBOARD');

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
            });
        }

        this.setState(update(this.state, {
            responses: {
                $set: responseState
            },
            renderCounter: {
                $set: this.state.renderCounter + 1
            }
        }));
    }

    handleMessages(messages) {
        const messageState = {};

        for (var i = 0; i < messages.length; ++i) {
            const message = messages[i];

            messageState[message.id] = {
                $set: message
            }
        }

        this.setState(update(this.state, {
            messages: messageState,
            renderCounter: {
                $set: this.state.renderCounter + 1
            }
        }));
    }

    queueUsers(users) {
        const newState = update(this.state, {
            usersQueue: {
                $push: users
            }
        });

        this.setState(newState);
    }

    queueResponse(response) {
        // if we don't have the data for this message, request it
        if (response.messageId && !this.state.messages[response.messageId]) {
            this.props.route.socket.emit('get-messages', {
                messageIds: [ response.messageId ]
            });
        }

        // queue the response
        const newState = update(this.state, {
            responsesQueue: {
                $push: [response]
            }
        });

        this.setState(newState);
    }

    processResponseAndUserQueues() {
        const responseState = {},
            userState = {},
            messagesToUpdate = [];

        console.log(this.state.responsesQueue.length, 'NEW RESPONSES');
        console.log(this.state.usersQueue.length, 'NEW USERS');

        for (var i = 0; i < this.state.responsesQueue.length; ++i) {
            const response = this.state.responsesQueue[i];
            const messageId = response.messageId || 'none';

            var updateKey = this.state.responses[messageId] ? '$unshift' : '$set';
            if (!responseState[messageId]) {
                responseState[messageId] = {
                    [updateKey]: []
                };
            }

            responseState[messageId][updateKey].unshift(response);

            // If this response was to a poll message, our message data is
            // out of date. Re request it! Done while processing to avoid
            // constant re-rendering.
            if (this.state.messages[messageId] &&
                this.state.messages[messageId].poll) {

                messagesToUpdate.push(messageId);
            }
        }

        for (var i = 0; i < this.state.usersQueue.length; ++i) {
            const user = this.state.usersQueue[i];

            userState[user.id] = {
                $set: user
            }
        }

        // update messages
        if (messagesToUpdate.length) {
            this.props.route.socket.emit('get-messages', {
                messageIds: [ ...new Set(messagesToUpdate) ]
            });
        }

        this.setState(update(this.state, {
            responses: responseState,
            users: userState,
            responsesQueue: { $set: [] },
            usersQueue: { $set: [] },
            renderCounter: {
                $set: this.state.renderCounter + 1
            }
        }));
    }
}
