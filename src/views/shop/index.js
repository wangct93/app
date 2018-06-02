/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Button,Rate,Tabs,Spin} from 'antd';


import * as actions from '@/store/list/action';

import Header from '../header';
import Loading from '@util/components/loading';
import Img from '@util/components/img';

import {getPrice} from '@/computes/compute';

const {TabPane} = Tabs;

class Shop extends Component{
    render(){
        let {shopData = {},loadingShopData,shopping,shoppingCartData = {},comment = [],match,power} = this.props;
        let {name,score,intro = '&nbsp;',averPrice,foodData = [],id,imgSrc} = shopData;
        let foodList = this.formatFoodData(foodData);
        let shoppingCart = shoppingCartData[id] || [];
        let {foodActiveIndex = 0} = this.state || {};
        comment = comment.filter(item => item.shopId === id);
        return <div className="page-flex shop-container">
            <Header>
                <span>商户信息</span>
                {
                    power === 0 ? <Link className="hand-text" to={`/input/${id}`}>修改</Link> : ''
                }
            </Header>
            <div className="body">
                <Loading show={loadingShopData} />
                <div className="shop-header">
                    <Img src={imgSrc} />
                    <div className="info-box">
                        <h2>{name}</h2>
                        <div className="score-line">
                            <Rate allowHalf disabled={true} value={score}/>
                            <span className="shop-aver-price">￥{averPrice}</span>
                        </div>
                        <p>{intro}</p>
                    </div>
                </div>
                <div className="shop-body">
                    <Tabs>
                        <TabPane tab="商品" key="1">
                            <div className="thing-view">
                                <ul className="tv-nav">
                                    {
                                        foodList.map(({title},i) => {
                                            return <li onClick={this.scrollFood.bind(this,i)} key={i} className={foodActiveIndex === i ? 'active' : ''}>{title}</li>
                                        })
                                    }
                                </ul>
                                <div className="tv-content" ref="foodContent">
                                    {
                                        foodList.map((item,i) => {
                                            return <TvBox shoppingCart={shoppingCart} shopping={shopping} key={i} data={item} />
                                        })
                                    }
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="评论" key="2">
                            {
                                comment.length ? <ul className="comment-list">
                                    {
                                        comment.map((item,i) => {
                                            let {userName,score,content} = item;
                                            return <li key={i}>
                                                <p>
                                                    <Icon type="user" />
                                                    <span>{userName}</span>
                                                </p>
                                                <div>
                                                    <Rate allowHalf disabled={true} value={score} />
                                                </div>
                                                <p>{content}</p>
                                            </li>
                                        })
                                    }
                                </ul> : <div className="alt-text">暂无评论</div>
                            }
                        </TabPane>
                    </Tabs>
                </div>
                <ShoppingFooter defaultExpand={!!match.params.show} shoppingCart={shoppingCart}  shopping={shopping} data={shopData}/>
            </div>
        </div>
    }
    componentWillUpdate(props,state){
        let {match = {},getShopData} = props;
        let {id} = match.params;
        let oldId =this.props.match.params.id;
        if(id !== oldId){
            getShopData(id);
        }
    }
    componentDidMount(){
        let {getShopData,match} = this.props;
        getShopData(match.params.id);

        let {foodContent} = this.refs;
        $(foodContent).bind('scroll',e => {
            let $box = $(e.target);
            let t = $box.getRect().top;
            $box.find('.tv-box').forEach((item,i) => {
                let $item = $(item);
                if($item.getRect().bottom > t){
                    this.setState({
                        foodActiveIndex:i
                    });
                    return false;
                }
            })
        });
    }
    formatFoodData(data = []){
        let formatData = {};
        data.forEach((item,i) => {
            let {keywords} = item;
            let list = formatData[keywords];
            if(!list){
                formatData[keywords] = list = [];
            }
            list.push(item);
        });
        let result = [];
        for(let keywords in formatData){
            if(formatData.hasOwnProperty(keywords)){
                result.push({
                    title:keywords,
                    list:formatData[keywords]
                });
            }
        }
        return result;
    }
    scrollFood(index){
        let {foodContent} = this.refs;
        let $box = $(foodContent);
        let $target = $box.find('.tv-box').eq(index);
        foodContent.scrollTop += $target.getRect().top - $box.getRect().top - 10;
    }
}

class TvBox extends Component{
    render(){
        let {data = {},shopping,shoppingCart = []} = this.props;
        let {title,list} = data;
        let filterData = shoppingCart.toFieldObject('id');
        return <div className="tv-box">
            <div className="tv-header">{title}</div>
            <ul className="tv-list">
                {
                    list.map((item,i) => {
                        let {name,intro,id,price,imgSrc} = item;
                        let count = filterData[id] ? filterData[id].count : 0;
                        return <li key={i}>
                            <Img src={imgSrc} />
                            <div className="info-box">
                                <h2>{name}</h2>
                                <p className="text-intro">{intro}</p>
                                <div className="op-box">
                                    <span className="text-price">{getPrice(price)}</span>
                                    {
                                        count ? <React.Fragment>
                                            <Button shape="circle" onClick={shopping.bind(this,false,item)} icon="minus" size="small"/>
                                            <span className="tv-count">{count}</span>
                                        </React.Fragment> : ''
                                    }

                                    <Button shape="circle" onClick={shopping.bind(this,true,item)} icon="plus" size="small"/>
                                </div>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    }
}

class ShoppingFooter extends Component{
    render(){
        let {shoppingCart = [],shopping,data,pay,defaultExpand} = this.props;
        let {show = defaultExpand,elem,listHeight:defaultListHeight} = this.state || {};
        let {listHeight = defaultListHeight} = this;
        let {qsPrice = 20,psPrice = 2.5} = data;
        let price = shoppingCart.reduce((v,item) => {
            return v + item.price * item.count;
        },0);
        return ReactDOM.createPortal(<div onClick={this.click.bind(this)} className={`shopping-cart-container ${show ? 'mask-wrap' : ''}`}>
            <div className="shop-footer">
                <div className="icon-box" onClick={this.showOrHide.bind(this)}>
                    <Icon type="shop"/>
                </div>
                <div className="shop-footer-text">另需配送费￥{psPrice}|支持到店自取</div>
                <div className="shop-price">
                    {
                        price ? price >= qsPrice ? '￥' + price : '还差￥' + (qsPrice - price) + '起送' : '￥' + qsPrice + '起送'
                    }
                </div>
                {
                    price >= qsPrice ? <Link className="pay-btn" to={`/order/${data.id}`}>下单</Link> : ''
                }
            </div>
            <div className="shopping-cart-view" style={{
                height:show ? listHeight + 'px' : 0
            }}>
                <ul className="shoppping-list" ref="list">
                    {
                        shoppingCart.map((item,i) => {
                            let {name,count} = item;
                            return <li key={i}>
                                <div className="food-name">{name}</div>
                                <div className="shop-num-op">
                                    <Button shape="circle" onClick={shopping.bind(this,false,item)} icon="minus" size="small"/>
                                    <span className="tv-count">{count}</span>
                                    <Button shape="circle" onClick={shopping.bind(this,true,item)} icon="plus" size="small"/>
                                </div>
                            </li>;
                        })
                    }
                </ul>
            </div>
        </div>,elem)
    }
    componentWillMount(){
        let div = document.createElement('div');
        $('body').append(div);
        this.setState({
            elem:div,
            show:this.props.defaultExpand
        });
    }
    componentDidUpdate(){
        let {show} = this.state || {};
        let listElem = this.refs.list;
        listElem.parentNode.style.height = show ? listElem.offsetHeight + 'px' : 0;
    }
    componentWillUnmount(){
        $(this.state.elem).remove();
    }
    showOrHide(){
        let {show} = this.state || {};
        this.setState({
            show:!show
        });
    }
    click(e){
        if($(e.target).hasClass('shopping-cart-container')){
            this.showOrHide();
        }
    }
}

export default connect(state => wt.extend({power:state.userData.info ? state.userData.info.power : 0},state.listData),actions)(Shop);