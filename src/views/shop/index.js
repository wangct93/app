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


class Shop extends Component{
    render(){
        let {currentData = {}} = this.props;
        let {name,score,intro,averPrice,foodData = {}} = currentData;
        let foodList = this.formatFoodData(foodData);
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
                                return <li key={i}>{title}</li>
                            })
                        }
                    </ul>
                    <div className="tv-content">
                        {
                            foodList.map((item,i) => {
                                return <TvBox key={i} data={item} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    }
    formatFoodData(data){
        let formatData = {};
        data.forEach((item,i) => {
            let {type} = item;
            let list = formatData[type];
            if(!list){
                formatData[type] = list = [];
            }
            list.push(item);
        });
        let result = [];
        for(let type in formatData){
            if(formatData.hasOwnProperty(type)){
                result.push({
                    title:type,
                    list:formatData[type]
                });
            }
        }
        return result;
    }
    componentDidUpdate(){
        console.log('update');
    }
}

class TvBox extends Component{
    render(){
        let {data = {}} = this.props;
        let {title,list} = data;
        return <div className="tv-box">
            <div className="tv-header">{title}</div>
            <ul className="tv-list">
                {
                    list.map((item,i) => {
                        let {name,intro} = item;
                        return <li key={i}>
                            <div className="img-box-full">
                                <img src="img/1.jpg"/>
                            </div>
                            <div className="info-box">
                                <h2>{name}</h2>
                                <p>{intro}</p>
                            </div>
                            <div className="tv-op-box">
                                <Button shape="circle" icon="minus" size="small"/>
                                <span className="tv-count">0</span>
                                <Button shape="circle" icon="plus" size="small"/>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    }
}

export default connect(state => state.listData,actions)(Shop);