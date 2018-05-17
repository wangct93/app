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
class HistoryOrderList extends Component{
    render(){
        let {data,user,history} = this.props;
        let {info:userInfo} = user;
        if(!userInfo){
            history.push('/login');
            return '';
        }
        data = data[userInfo.name] || [];
        return <div className="page-flex my-order-container">
            <Header>我的订单</Header>
            <div className="body">
                <ul className="order-list">
                    {
                        data.map((item,i) => {
                            return <OrderItem key={i} data={item}/>
                        })
                    }
                </ul>

            </div>
        </div>
    }
}

const OrderItem = props => {
    let {shopName,list} = props.data || {};
    return <li className="order-item">
        <div className="order-header">
            <span>{shopName}</span>
            <Icon type="right"/>
        </div>
        <div className="order-b">

        </div>
    </li>
};

export const MyOrder = connect(state => wt.extend(state.orderData,{
    user:state.userData
}))(HistoryOrderList);

export default connect(state => state.listData,actions)(Order);