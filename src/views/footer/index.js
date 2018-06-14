/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';
import wt from 'wt-butil';
export default props => {
    let {data = []} = props;
    return <div className="footer">
        <nav className="nav-box">
            {
                data.map((item,i) => {
                    let {text,path} = item;
                    return <NavLink key={i} to={path}>{text}</NavLink>;
                })
            }
        </nav>
    </div>
}