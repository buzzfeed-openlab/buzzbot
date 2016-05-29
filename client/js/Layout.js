import React from "react";
import { Link } from "react-router";
import ReactBootstrap, { Row, Col } from 'react-bootstrap';

import Footer from "./Footer";
import Nav from "./Nav";

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    console.log("layout");
    return (
      <div>

        <Nav location={location} />

        <div class="container" style={containerStyle}>
          <Row>
            <Col lg={12}>
              <h1>Convention Bot Admin</h1>

              {this.props.children}

            </Col>
          </Row>
          <Footer style={containerStyle}/>
        </div>
      </div>

    );
  }
}
