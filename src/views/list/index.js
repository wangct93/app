/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Button,Input} from 'antd';

import * as actions from '@/store/list/action';

import Header from '../header';
import Loading from '@/components/loading';


const {Search} = Input;


import {getDistance,getPrice} from '@/computes/compute';

class List extends Component{
    render(){
        let {data = [],loadingShopList = true,dataTotal = 0,getShopDataError,hasMoreData} = this.props;
        return <div className="page-flex list-container">
            <Header>
                <div className="search-box">
                    <Search />
                </div>
            </Header>
            <div className="body fit">
                <Loading show={loadingShopList}/>
                <div className="fit overflow-auto" ref="scrollBox">
                    <ul className="shop-list" ref="list">
                        {
                            data.map((item,i) => {
                                let {id,src = 'img/1.jpg',distance = 120,averPrice = 20,soldCount,name,intro} = item;
                                return <li key={i} onClick={this.toShopDetail.bind(this,item)}>
                                    <div className="img-box">
                                        <img src={src}/>
                                    </div>
                                    <div className="info-box">
                                        <p>
                                            <span className="shop-title">{name}</span>
                                            <span className="fr">{getDistance(distance)}</span>
                                        </p>
                                        <p>{intro}</p>
                                        <p>
                                            <span>人均 <span className="shop-price">{getPrice(averPrice)}</span></span>
                                            <span className="fr">已售{soldCount}</span>
                                        </p>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                    {
                        data.length ? <div className="footer-btn-box" ref="footer">
                            <Button loading={hasMoreData} disabled={true}>{hasMoreData ? '加载更多' : '没有更多'}</Button>
                        </div> : ''
                    }
                </div>
            </div>
        </div>
    }
    componentWillUpdate(props,state){
        if(props.match.url !== this.props.match.url){
            this.getData();
        }
    }
    componentDidMount(){
        let {scrollBox} = this.refs;
        let {loadMoreList,scrollTop = 0,data = []} = this.props;
        $(scrollBox).bind('scroll',e => {
            let {loadingMoreData,data = [],dataTotal = 0} = this.props;
            let {footer} = this.refs;
            let disabledStatus = scrollBox.disabledStatus;
            if(loadingMoreData){
                disabledStatus = false;
            }
            if(!disabledStatus && !loadingMoreData && data.length < dataTotal){
                let boxBottom = $(e.target).getRect().bottom;
                let footerTop = $(footer).getRect().top;
                if(footerTop < boxBottom){
                    scrollBox.disabledStatus = true;
                    loadMoreList();
                }
            }
        });
        scrollBox.scrollTop = scrollTop;
        if(data.length === 0){
            this.getData();
        }
    }
    getData(){
        let {match = {},getShopList} = this.props;
        let {params = {}} = match;
        getShopList(params.type);
    }
    toShopDetail(data){
        let {saveScrollTop,history} = this.props;
        saveScrollTop(this.refs.scrollBox.scrollTop);
        history.push(`/shop/${data.id}`);
    }
}


export default connect(state => state.listData,actions)(List);