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
        let {match,list} = this.props;
        let data = list.filter(item => +item.id === +match.params.id)[0] || {};
        let {shopName,list:foodList = []} = data;
        return <div className="page-flex order-container">
            <Header>订单详情</Header>
            <div className="body">
                <div className="food-box">
                    <div className="order-header">{shopName}</div>
                    <FoodList data={foodList} />
                    <div className="text-price-box">
                        实付 ￥{getAllPrice(foodList)}
                    </div>
                </div>
            </div>
        </div>
    }
}

class Order extends Component{
    render(){
        let {shopData,shoppingCartData = {},match = {},success} = this.props;
        if(!shopData){
            return <Redirect to="/home"/>;
        }
        let id = match.params.id;
        let list = shoppingCartData[id] || [];
        let {name = '合适假的'} = shopData;
        let infoData = this.getInfoData();
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
    componentWillUnmount(){
        this.props.initState();
    }
    createOrder(){
        let {shoppingCartData = {},userInfo,shopData} = this.props;
        let list = shoppingCartData[shopData.id] || [];
        this.props.createOrder(userInfo,shopData,list);
    }
    getInfoData(){
        let temp = [
            {
                field:'addr',
                name:'配送地址',
                defaultValue:'北一区45号'
            },
            {
                field:'time',
                name:'送达时间',
                formatter(value,item){
                    let time = new Date().diffMinutes(30).toFormatString('hh:mm');
                    return '尽快送达（预计'+ time +'送达）';
                }
            },
            {
                field:'payType',
                name:'支付方式',
                defaultValue:'支付宝'
            }
        ];
        let {userInfo} = this.props;
        return temp.map(item => {
            let {field,name,formatter,defaultValue} = item;
            let value = userInfo[field];
            value = wt.isFunction(formatter) ? formatter(value,item) : wt.isUndefined(value) ? defaultValue : value;
            return {
                name,
                value
            }
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
        let {list,userInfo,history,againOrder} = this.props;
        list = list.filter(item => +item.userId === +userInfo.id);
        return <div className="page-flex orderlist-container">
            <Header>我的订单</Header>
            <div className="body">
                {
                    list.length ? <OrderListView againOrder={againOrder.bind(this)} history={history} data={list} userInfo={userInfo}/> : <div className="alert-text">没有历史订单</div>
                }
            </div>
        </div>
    }
}
class OrderListView extends Component{
    render(){
        let {data = [],userInfo,history} = this.props;
        return <ul className="order-list">
            {
                data.map((item,i) => {
                    let {shopName,list,time,id,shopId,comment} = item;
                    return <li key={i} onClick={() => {
                        location.hash = `/orderDetail/${id}`
                    }}>
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
                            <Button type="primary" onClick={this.againOrder.bind(this,item)}>再来一单</Button>
                            <Button type="primary" disabled={comment} onClick={this.comment.bind(this,id)}>{comment ? '已评价' : '评价'}</Button>
                        </div>
                    </li>
                })
            }
        </ul>
    }
    comment(id,e){
        let {history} = this.props;
        history.push(`/comment/${id}`);
        e.stopPropagation();
    }
    againOrder(item,e){
        let {history,againOrder} = this.props;
        e.stopPropagation();
        againOrder(item);
        history.push(`/shop/${item.shopId}/1`);
    }
}

export const MyOrder = connect(state => wt.extend({
    userInfo:state.userData.info
},state.orderData),actions)(OrderList);

export default connect(state => wt.extend({
    userInfo:state.userData.info,
    success:state.orderData.createSuccess
},state.listData),actions)(Order);

export const OrderDetail = connect(state => state.orderData)(OrderDetailView);