import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Dashboard from "./Dashboard";
import MessageForm from "./MessageForm";
import TriggerForm from "./TriggerForm";
import Layout from "./Layout";

import io from 'socket.io-client/socket.io'

const socket = io.connect("ws://" + window.location.hostname + (location.port ? ':' + location.port : ''));

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Dashboard} socket={socket}></IndexRoute>
      <Route path="create-message" name="create-message" component={MessageForm} socket={socket}></Route>
      <Route path="create-trigger" name="create-trigger" component={TriggerForm} socket={socket}></Route>
    </Route>
  </Router>,
app);
