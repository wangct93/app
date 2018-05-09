/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';

import Header from '../header';

import * as actions from '@/store/city/action';


class City extends Component{
    render(){
        let {hotList = [],city = '',cityId = '',selectCity} = this.props;
        return <div className="page-flex city-container">
            <Header>
                <span>选择城市</span>
            </Header>
            <div className="body">
                <h2 className="city-name">{city}</h2>
                <Box click={selectCity} title="热门城市" cityId={cityId} data={hotList}/>
            </div>
        </div>
    }
}


class Box extends Component{
    render(){
        let {title,data = [],cityId} = this.props;
        return <div className="city-box">
            <div className="city-header">{title}</div>
            <ul className="city-list">
                {
                    data.map((item,i) => {
                        let {text,id} = item;
                        return <li onClick={this.click.bind(this,item)} className={cityId === id ? 'active' : ''} key={i}>{text}</li>
                    })
                }
            </ul>
        </div>
    }
    click(data){
        wt.execFunc(this.props.click,data);
    }
}

export default connect(state => state.cityData,actions)(City);