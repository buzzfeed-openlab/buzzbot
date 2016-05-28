import React from "react";



export default class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            responses: []
        }
    }

    render() {
        console.log("dashboard");
        console.log(this.props.route.socket);
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

    }
}
