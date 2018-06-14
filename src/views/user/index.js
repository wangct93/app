/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Button,Rate,Tabs} from 'antd';

import * as actions from '@/store/list/action';

import Header from '../header';

import {getPrice} from '@/computes/compute';
import wt from 'wt-butil';
const {TabPane} = Tabs;

class UserBox extends Component{
    render(){
        let {info,viewData} = this.props;
        let {name,imgSrc} = info;
        return <div className="page-flex user-container">
            <Header>我的</Header>
            <div className="body">
                <div className="user-box">
                    <div className="img-box-fit">
                        <img src={imgSrc}/>
                    </div>
                    <div className="info-box">
                        <p className="text-name">{name}</p>
                    </div>
                    <Icon type="right" />
                </div>
                <ViewBox data={viewData}/>
            </div>
        </div>
    }
}

class ViewBox extends Component{
    render(){
        let {data} = this.props;
        return <React.Fragment>
            {
                data.map((item,i) => {
                    return <ViewList key={i} data={item} />
                })
            }
        </React.Fragment>
    }
}

class ViewList extends Component{
    render(){
        let {data = []} = this.props;
        return <ul className="item-list">
            {
                data.map((item,i) => {
                    let {iconCls,text,path = '/'} = item;
                    return <li key={i}>
                        <Link to={path}>
                            <Icon type={iconCls} />
                            <span className="text-name">{text}</span>
                            <Icon type="right" />
                        </Link>
                    </li>
                })
            }
        </ul>
    }
}

export default connect(state => state.userData,actions)(UserBox);