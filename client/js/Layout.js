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

    return (
      <div>

        <Nav location={location} />

        <div class="container" style={containerStyle}>
          <Row>
            <Col lg={12}>
              {this.props.children}

            </Col>
          </Row>
          <Footer style={containerStyle}/>
        </div>
      </div>

    );
  }
}
