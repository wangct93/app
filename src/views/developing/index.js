/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';

import Header from '../header';

import * as actions from '@/store/city/action';



export default props => {
    return <div className="dev-container">该功能模块正在火速开发......</div>
}