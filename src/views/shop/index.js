/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Button} from 'antd';

import * as actions from '@/store/list/action';

import Header from '../header';
import SearchBox from '../home/lib/search';


class Shop extends Component{
    render(){
        return <div>

        </div>
    }
}



export default connect(state => state.listData,actions)(List);