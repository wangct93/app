/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';

export default class Header extends Component{
    render(){
        let {children = [],back = true} = this.props;
        if(!wt.isArray(children)){
            children = [children];
        }
        if(back){
            children.push(<Icon key={children.length} onClick={this.back.bind(this)} type="left"/>);
        }
        return <div className="header">{children}</div>
    }
    back(){
        history.back();
    }
}