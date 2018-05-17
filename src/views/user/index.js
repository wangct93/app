/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Button,Rate,Tabs} from 'antd';

import * as actions from '@/store/list/action';

import Header from '../header';

import {getPrice} from '@/computes/compute';

const {TabPane} = Tabs;

class UserBox extends Component{
    render(){
        return <div className="page-flex user-container">
            <Header>我的</Header>
            <div className="body">
                wangct
            </div>
        </div>
    }
}

export default connect(state => state.listData,actions)(UserBox);