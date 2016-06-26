
import React from "react";
import ReactList from 'react-list';
import update from 'react-addons-update';
import ReactBootstrap, {
    Row,
    Col,
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap';

import Message from './Message';

export default class PollView extends React.Component {
    constructor() {
        super();

        this.state = {
            pollResults: []
        }

        this.renderPollResults = this.renderPollResults.bind(this);
    }

    componentWillMount() {
        const pollData = JSON.parse(this.props.message.poll);
        this.updatePollResults(pollData);
    }

    componentWillReceiveProps(props) {
        const pollData = JSON.parse(props.message.poll);
        this.updatePollResults(pollData);
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
                        itemRenderer={this.renderPollResults}
                        length={this.state.pollResults.length}
                        type='variable'
                    />
                </ListGroup>
            </div>
        );
    }

    updatePollResults(pollData) {
        const pollResults = [];

        for (var result in pollData) {
            pollResults.push({ result: result, count: pollData[result] });
        }

        pollResults.sort((result1, result2) => {
            return result2.count - result1.count;
        });

        const newState = update(this.state, {
            pollResults: {
                $set: pollResults
            }
        });

        this.setState(newState);
    }

    renderPollResults(i, key) {
        const result = this.state.pollResults[i];

        return (
            <ListGroupItem key={key}>
                {result.result} {result.count}
            </ListGroupItem>
        );
    }
}
