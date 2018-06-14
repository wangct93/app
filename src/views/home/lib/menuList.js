/**
 * Created by Administrator on 2018/5/4.
 */
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';
import wt from 'wt-butil';
export default ({data,click}) => {
    return <ul className="menu-list">
        {
            data.map((item,i) => {
                return <Item click={click} key={i} data={item} />
            })
        }
    </ul>
}

const Item = props => {
    let {click,data = {}} = props;
    let {iconCls,path,text} = data;
    return <li onClick={click.bind(this,path)}>
        <Icon type={iconCls}/>
        <p>{text}</p>
    </li>
};