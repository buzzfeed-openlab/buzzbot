import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }

  render() {
    const { location } = this.props;
    const { collapsed } = this.state;
    const dashboardClass = location.pathname === "/" ? "active" : "";
    const messageFormClass = location.pathname.match(/^\/create-messages/) ? "active" : "";
    const sendFormClass = location.pathname.match(/^\/send-messages/) ? "active" : "";
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class={dashboardClass}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Convention Bot Dashboard</IndexLink>
              </li>
              <li class={messageFormClass}>
                <Link to="create-messages" onClick={this.toggleCollapse.bind(this)}>Create Messages</Link>
              </li>
              <li class={sendFormClass}>
                <Link to="send-messages" onClick={this.toggleCollapse.bind(this)}>Send Messages</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
