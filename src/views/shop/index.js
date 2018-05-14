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

import {getPrice} from '@/computes/compute';


class Shop extends Component{
    render(){
        let {shopData = {},shopping,shoppingCartData = {}} = this.props;
        let {name,score,intro,averPrice,foodData = []} = shopData;
        let foodList = this.formatFoodData(foodData);
        let shoppingCart = shoppingCartData[shopData.id] || [];
        let {foodActiveIndex = 0} = this.state || {};
        return <div className="page-flex shop-container">
            <Header>商户信息</Header>
            <div className="body">
                <div className="shop-header">
                    <div className="img-box-full">
                        <img src="img/1.jpg"/>
                    </div>
                    <div className="info-box">
                        <h2>{name}</h2>
                        <div className="score-line">
                            <Rate disabled={true} value={score}/>
                            <span className="shop-aver-price">￥{averPrice}</span>
                        </div>
                        <p>{intro}</p>
                    </div>
                </div>
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
                <ShoppingFooter shoppingCart={shoppingCart}  shopping={shopping}/>
            </div>
        </div>
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
        foodContent.scrollTop += $target.getRect().top - $box.getRect().top - 20;
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
                        let {name,intro,id,price} = item;
                        let num = filterData[id] ? filterData[id].num : 0;
                        return <li key={i}>
                            <div className="img-box-full">
                                <img src="img/1.jpg"/>
                            </div>
                            <div className="info-box">
                                <h2>{name}</h2>
                                <p>{intro}</p>
                                <p>{getPrice(price)}</p>
                            </div>
                            <div className="tv-op-box">
                                {
                                    num ? <React.Fragment>
                                        <Button shape="circle" onClick={shopping.bind(this,false,item)} icon="minus" size="small"/>
                                        <span className="tv-count">{num}</span>
                                    </React.Fragment> : ''
                                }

                                <Button shape="circle" onClick={shopping.bind(this,true,item)} icon="plus" size="small"/>
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
        let {listHeight = 0} = this;
        let {show} = this.state || {};
        let {shoppingCart = [],shopping} = this.props;
        return ReactDOM.createPortal(<div onClick={this.click.bind(this)} className={`shopping-cart-container ${show ? 'mask-wrap' : ''}`}>
            <div className="shop-footer">
                <div className="icon-box" onClick={this.showOrHide.bind(this)}>
                    <Icon type="shop"/>
                </div>
                <div className="shop-footer-text">另需配送费￥4.5|支持到店自取</div>
                <div className="shop-price">￥20起送</div>
            </div>
            <div className="shopping-cart-view" style={{
                height:show ? listHeight + 'px' : 0
            }}>
                <ul className="shoppping-list" ref="list">
                    {
                        shoppingCart.map((item,i) => {
                            let {name,num} = item;
                            return <li key={i}>
                                <div className="food-name">{name}</div>
                                <div className="shop-num-op">
                                    <Button shape="circle" onClick={shopping.bind(this,false,item)} icon="minus" size="small"/>
                                    <span className="tv-count">{num}</span>
                                    <Button shape="circle" onClick={shopping.bind(this,true,item)} icon="plus" size="small"/>
                                </div>
                            </li>;
                        })
                    }
                </ul>
            </div>
        </div>,this.elem)
    }
    componentWillMount(){
        let div = document.createElement('div');
        $('body').append(div);
        this.elem = div;
    }
    componentDidMount(){
        this.setListHeight();
    }
    componentDidUpdate(){
        this.setListHeight();
    }
    componentWillUnmount(){
        $(this.elem).remove();
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
        // HashRouter.push('/dd');
    }
    setListHeight(){
        this.listHeight = this.refs.list.offsetHeight;
    }
}

export default connect(state => state.listData,actions)(Shop);