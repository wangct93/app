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
import Loading from '@util/components/loading';
import Img from '@util/components/img';


const {Search} = Input;


import {getDistance,getPrice} from '@/computes/compute';

class List extends Component{
    render(){
        let {data = [],loadingShopList = true,total = 0,match} = this.props;
        let {keyword = match.params.keyword} = this.state || {};
        let hasMoreData = data.length < total;
        return <div className="page-flex list-container">
            <Header>
                <div className="search-box">
                    <Search onChange={this.inputChange.bind(this)} value={keyword} onSearch={this.search.bind(this)}/>
                </div>
            </Header>
            <div className="body fit">
                <Loading show={loadingShopList}/>
                <div className="fit overflow-auto" ref="scrollBox">
                    {
                        data.length === 0 && loadingShopList === false ? <div className="alt-text">暂无数据</div>: <ul className="shop-list">
                            {
                                data.map((item,i) => {
                                    let {id,imgSrc,distance = 120,averPrice = 20,soldCount,name,intro} = item;
                                    return <li key={i} onClick={this.toShopDetail.bind(this,item)}>
                                        <Img src={imgSrc} />
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
                    }

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
            let {loadingMoreData,data = [],total = 0} = this.props;
            let {footer} = this.refs;
            let disabledStatus = scrollBox.disabledStatus;
            if(loadingMoreData){
                scrollBox.disabledStatus = false;
            }
            if(!disabledStatus && !loadingMoreData && data.length < total){
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
    getData(keyword){
        let {match = {},getShopList} = this.props;
        let {params = {}} = match;
        keyword = wt.isUndefined(keyword) ? params.keyword : keyword;
        getShopList(params.type,keyword);
    }
    toShopDetail(data){
        let {saveScrollTop,history} = this.props;
        saveScrollTop(this.refs.scrollBox.scrollTop);
        this.props.clearShopData();
        history.push(`/shop/${data.id}`);
    }
    inputChange(e){
        let value = e.target.value;
        this.setState({
            keyword:value
        });
    }
    search(value){
        this.getData(value);
    }
}


export default connect(state => state.listData,actions)(List);