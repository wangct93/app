/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Button} from 'antd';

import * as actions from '@/store/list/action';

import Header from '../header';
import SearchBox from '../home/lib/search';
import LoadingBox from '@/components/loadingBox';


import {getDistance,getPrice} from '@/computes/compute';

class List extends Component{
    render(){
        let {data = [],loadingShopList = true,hasMoreData = true} = this.props;
        return <div className="page-flex list-container">
            <Header>
                <SearchBox />
            </Header>
            <div className="body fit">
                <LoadingBox show={loadingShopList}/>
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
                    <div className="footer-btn-box" ref="footer">
                        <Button loading={hasMoreData}>{hasMoreData ? '加载更多' : '没有更多'}</Button>
                    </div>
                </div>
            </div>
        </div>
    }
    componentDidMount(){
        let {scrollBox,footer} = this.refs;
        let {loadMoreList,scrollTop = 0,loadingMoreData,hasMoreData = true} = this.props;
        let canLoad = true;
        $(scrollBox).bind('scroll',e => {
            if(loadingMoreData){
                canLoad = true;
            }
            if(canLoad && !loadingMoreData && hasMoreData){
                let boxBottom = $(e.target).getRect().bottom;
                let footerTop = $(footer).getRect().top;
                if(footerTop < boxBottom){
                    canLoad = false;
                    loadMoreList();
                }
            }
        });
        scrollBox.scrollTop = scrollTop;
        this.getData();
    }
    getData(){
        let {data = [],match = {},getShopList} = this.props;
        let type = match.params.type;
        if(data.length === 0){
            getShopList(type);
        }
    }
    toShopDetail(data){
        this.props.saveScrollTop(this.refs.scrollBox.scrollTop);
        location.hash = `/shop/${data.id}`;
    }
}


export default connect(state => state.listData,actions)(List);