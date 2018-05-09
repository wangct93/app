/**
 * Created by Administrator on 2018/5/7.
 */
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import './index.less';

class Login extends Component{

}

export default connect((state) => state)(Login)