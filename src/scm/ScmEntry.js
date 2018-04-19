import {render} from "react-dom";
import React,{Component} from "react";
import {Router, Route,browserHistory,IndexRoute} from "react-router";
import {Provider} from "react-redux";
import { store } from "./data/StoreConfig";
import AppCont from './containers/AppCont';

import "antd/dist/antd.css";
import './../base/styles/base.scss';
import "./styles/index.scss";

import fn from '../base/services/InitData';

import { prefix_route } from '../base/consts/UrlsConfig'

fn().then(() => render(
    <Provider store={store}>
        <Router history={browserHistory} ignoreScrollBehavior>
            <Route path={`${prefix_route}/scm.html`} >
                <IndexRoute component={AppCont} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('bodycontext')
))
