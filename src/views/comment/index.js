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

import {getAllPrice} from '@/computes/compute';

class Comment extends Component{
    render(){
        let {match} = this.props;
        let {shopName} = match.params;
        return <div className="page-flex comment-container">
            <Header>评论</Header>
            <div className="body">
                <div className="shop-info">
                    <div className="img-box-fit">
                        <img src="img/1.jpg" />
                    </div>
                    <div className="text-name">{shopName}</div>
                </div>
                <div className="score-box">
                    <h2>这次用餐体验满意吗？</h2>
                    <Rate/>
                </div>
                <div className="textarea-box">
                    <div className="text-title">评论信息</div>
                    <textarea ref="textarea" placeholder="请输入评论信息"/>
                </div>
                <Button type="primary" onClick={this.submit.bind(this)}>提交</Button>
            </div>
        </div>
    }
    submit(){
        let {match,userInfo = {},history} = this.props;
        let {shopId,orderId} = match.params;
        let content = this.refs.textarea.value;
        this.props.submitComment({
            userName:userInfo.name,
            shopId,
            content,
            score:4,
            orderId
        });
        history.goBack();
    }
}
export default connect(state => ({
    userInfo:state.userData.info
}),actions)(Comment);