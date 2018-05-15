/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Button,Rate} from 'antd';

import * as actions from '@/store/list/action';

import Header from '../header';



class Order extends Component{
    render(){
        let {shopData = {},shoppingCartData = {},match = {}} = this.props;
        let id = match.params.id;
        let list = shoppingCartData[id] || [];
        return <div className="page-flex shop-container">
            <Header>订单详情</Header>
            <div className="body">
                {
                    JSON.stringify(list)
                }
            </div>
        </div>
    }
}

export default connect(state => state.listData,actions)(Order);