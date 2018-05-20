/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Button,Rate} from 'antd';

import * as actions from '@/store/order/action';

import Header from '../header';

import {getAllPrice} from '@/computes/compute';


export class OrderDetailView extends Component{
    render(){
        let {match,data} = this.props;
        let {userId,id} = match.params;
        data = data[userId].filter(item => +item.id === +id)[0];
        let {shopName,list} = data;
        return <div className="page-flex order-container">
            <Header>订单详情</Header>
            <div className="body">
                <div className="food-box">
                    <div className="order-header">{shopName}</div>
                    <FoodList data={list} />
                    <div className="text-price-box">
                        实付 ￥{getAllPrice(list)}
                    </div>
                </div>
            </div>
        </div>
    }
}

class Order extends Component{
    render(){
        let {shopData = {},shoppingCartData = {},match = {}} = this.props;
        let id = match.params.id;
        let list = shoppingCartData[id] || [];
        let {name = '合适假的'} = shopData;
        let infoData = [
            {
                name:'配送地址',
                value:'北一区45号'
            },
            {
                name:'送达时间',
                value:'尽快送达(21:22送达)'
            },
            {
                name:'支付方式',
                value:'支付宝'
            }
        ];
        let {success} = this.state || {};
        return <div className="page-flex order-container">
            <Header>下单</Header>
            {
                success ? <div className="alter-text">
                    下单成功
                    <Link to="/myOrder" >
                        <Button type="primary">订单列表</Button>
                    </Link>
                </div> : <React.Fragment>
                    <div className="body">
                        <InfoBox data={infoData}/>
                        <div className="food-box">
                            <div className="order-header">{name}</div>
                            <FoodList data={list} />
                        </div>
                    </div>
                    <div className="footer">
                        <div className="text-price">￥{getAllPrice(list)}</div>
                        <div className="pay-btn" onClick={this.createOrder.bind(this)}>确认支付</div>
                    </div>
                </React.Fragment>
            }
        </div>
    }
    createOrder(){
        let {shopData = {name:'dads',id:1},shoppingCartData = {},match = {},info} = this.props;
        let id = match.params.id;
        let list = shoppingCartData[id] || [];
        this.props.createOrder(info,wt.extend({list},shopData));
        this.setState({
            success:true
        });
    }
}

class InfoBox extends Component{
    render(){
        let {data} = this.props;
        return <ul className="info-list">
            {
                data.map((item,i) => {
                    let {name,value} = item;
                    return <li key={i}>
                        <span className="info-name">{name}</span>
                        <div className="info-value">
                            {value}
                            <Icon type="right" />
                        </div>
                    </li>
                })
            }
        </ul>
    }
}

class FoodList extends Component{
    render(){
        let {data = []} = this.props;
        return <ul className="food-list">
            {
                data.map((item,i) => {
                    let {name,count,price} = item;
                    return <li key={i}>
                        <div className="img-box-fit">
                            <img src="img/1.jpg" />
                        </div>
                        <div className="text-name">{name}</div>
                        <div className="text-count">x{count}</div>
                        <div className="text-price">￥{price}</div>
                    </li>
                })
            }
        </ul>
    }
}


class OrderList extends Component{
    render(){
        let {data,user,history} = this.props;
        let {info:userInfo} = user;
        if(!userInfo){
            history.push('/login');
            return '';
        }
        data = data[userInfo.name] || [];
        return <div className="page-flex orderlist-container">
            <Header>我的订单</Header>
            <div className="body">
                <OrderListView data={data} userInfo={userInfo}/>

            </div>
        </div>
    }
}

const OrderListView = props => {
    let {data = [],userInfo} = props;
    return <ul className="order-list">
        {
            data.map((item,i) => {
                let {shopName,list,time,id} = item;
                return <li key={i}>
                    <Link to={`orderDetail/${userInfo.name}/${id}`}>
                        <div className="order-header">
                            <div className="img-box-fit">
                                <img src="img/1.jpg" />
                            </div>
                            <div className="shop-info">
                                <p className="text-name">
                                    <span>{shopName}</span>
                                    <Icon type="right" />
                                </p>
                                <p className="text-time">{time}</p>
                            </div>
                            <p>订单已完成</p>
                        </div>
                        <div className="order-content">
                            <div className="food-explain">{list[0].name} 等{list.length}件商品</div>
                            <div className="price">￥{getAllPrice(list)}</div>
                        </div>
                        <div className="btn-box">
                            <Button type="primary">再来一单</Button>
                            <Button type="primary">评价</Button>
                        </div>
                    </Link>
                </li>
            })
        }
    </ul>
};

export const MyOrder = connect(state => wt.extend({},state.orderData,{
    user:state.userData
}))(OrderList);

export default connect(state => wt.extend({},state.listData,state.userData),actions)(Order);

export const OrderDetail = connect(state => wt.extend({},state.orderData,{
    user:state.userData
}))(OrderDetailView);