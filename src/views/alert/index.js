/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Modal,Button} from 'antd';
import wt from 'wt-butil';
import * as actions from '@/store/alert/action';


export default connect(state => state.alertData,actions)(props => {
    let {message,clearAlertInfo} = props;
    return <Modal title="提示" visible={!!message} footer={<Button onClick={clearAlertInfo}>确定</Button>}>{message}</Modal>;
});