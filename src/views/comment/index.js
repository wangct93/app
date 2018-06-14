/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Button,Rate,Modal} from 'antd';
import wt from 'wt-butil';
import * as actions from '@/store/list/action';

import Header from '../header';

import {getAllPrice} from '@/computes/compute';

class Comment extends Component{
    render(){
        let {score = 0,message} = this.state || {};
        let {shopName} = this.getOrderInfo();
        return <div className="page-flex comment-container">
            <Header>评论</Header>
            <div className="body">
                <Modal title="提示" visible={!!message} footer={<Button onClick={() => {
                    this.setState({
                        message:false
                    })
                }}>确定</Button>}>{message}</Modal>
                <div className="shop-info">
                    <div className="img-box-fit">
                        <img src="img/1.jpg" />
                    </div>
                    <div className="text-name">{shopName}</div>
                </div>
                <div className="score-box">
                    <h2>这次用餐体验满意吗？</h2>
                    <Rate allowHalf value={score} onChange={this.setScore.bind(this)}/>
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
        let {score} = this.state || {};
        if(wt.isUndefined(score)){
            this.setState({
                message:'请为本次用餐体验打分！'
            });
        }else{
            let {history} = this.props;
            let data = this.getOrderInfo();
            let content = this.refs.textarea.value;
            let {userId,userName,shopId,id} = data;
            this.props.submitComment({
                userId,
                userName,
                shopId,
                content,
                score,
                orderId:id
            });
            history.goBack();
        }
    }
    setScore(v){
        this.setState({
            score:v
        });
    }
    getOrderInfo(){
        let {match,list = []} = this.props;
        return list.filter(item => +item.id === +match.params.orderId)[0] || {};
    }
}
export default connect(state => state.orderData,actions)(Comment);