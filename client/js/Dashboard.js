import React from "react";

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
        console.log("dashboard");
        console.log(this.state);
        return (
            <div>
                <div class="row">
                    <div class="col-lg-12">
                        beep boop bop
                    </div>
                </div>
            </div>
        );
    }

    handleNewResponse(response) {
        console.log('HANDLE NEW RESPONSE', response);
        console.log('from: ', this.props.route.socket);
        this.setState({
            responses: this.state.responses.push(response)
        });
    }
}
