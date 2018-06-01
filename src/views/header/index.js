/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';

export default props => {
    let {children = [],back = true,home = true} = props;
    if(!wt.isArray(children)){
        children = [children];
    }
    children = children.slice(0);
    if(back){
        children.push(<Icon key={children.length} onClick={() => {history.back();}} type="left"/>);
    }
    return <div className="header">{children}</div>
}