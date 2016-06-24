import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Dashboard from "./Dashboard";
import CreateForm from "./CreateForm";
import SendForm from "./SendForm";
import Layout from "./Layout";

import './../../node_modules/react-html5video/dist/ReactHtml5Video.css';
import 'react-select/dist/react-select.css';

import io from 'socket.io-client/socket.io';

const socket = io.connect("wss://" + window.location.hostname + (location.port ? ':' + location.port : ''));

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Dashboard} socket={socket}></IndexRoute>
      <Route path="create-messages" name="create-messages" component={CreateForm} socket={socket}></Route>
      <Route path="send-messages" name="send-messages" component={SendForm} socket={socket}></Route>
    </Route>
  </Router>,
app);
