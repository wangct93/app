/**
 * Created by Administrator on 2018/5/7.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';
import wt from 'wt-butil';
export default class Search extends Component{
    render(){
        return <div className="search-box">
            <input className="search-input" ref="input" type="text"/>
            <Icon type="search"  onClick={this.search.bind(this)}/>
        </div>
    }
    search(){
        let value = this.refs.input.value;
        wt.execFunc(this.props.search,value);
    }
}