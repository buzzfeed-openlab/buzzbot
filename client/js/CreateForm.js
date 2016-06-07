import React from "react";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';

import MessageForm from './MessageForm';
import TriggerForm from './TriggerForm';

export default class CreateForm extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <MessageForm />
                <TriggerForm />      
            </div>
        );
    }
}
