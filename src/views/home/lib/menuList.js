/**
 * Created by Administrator on 2018/5/4.
 */
import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';

export default ({data}) => {
    return <ul className="menu-list">
        {
            data.map((item,i) => {
                return <Item key={i} data={item} />
            })
        }
    </ul>
}

const Item = props => {
    let {iconCls,path,text} = props.data || {};
    return <li>
        <Link className="block" to={`/list${path}`}>
            <Icon type={iconCls}/>
            <p>{text}</p>
        </Link>
    </li>
};