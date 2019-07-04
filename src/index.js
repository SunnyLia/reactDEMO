import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Route,Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import history from './history';

import store from './store';
import Home from './containers/Home';
import Mime from './containers/Mime';
import Profile from './containers/Profile';
import Layout from "./containers/Layout";
import Detail from './containers/Detail';
import Login from './containers/Login';
import Reg from './containers/Reg';

import PrivateRoute from './components/PrivateRoute';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Layout>
                <Switch>
                    <Route exact path="/login" component={Login} />

                </Switch>
            </Layout>
        </ConnectedRouter>
    </Provider>,document.querySelector('#root')
);