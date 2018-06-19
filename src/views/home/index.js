/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon,Input} from 'antd';

import Header from '../header';
import MenuList from './lib/menuList';
import Box from './lib/box';

import * as actions from '@/store/home/action';
import wt from 'wt-butil';
const {Search} = Input;

class Home extends Component{
    render(){
        let {homeData,cityData} = this.props;
        let {cityName} = cityData;
        let {menuData = [],zanData = []} = homeData;
        if(!cityName){
            return <Redirect to="/city"/>
        }
        return <div className="page-flex home-container">
            <Header back={false}>
                <Link to="/city" className="i-btn i-btn-right">
                    <span>{cityName}</span>
                    <Icon type="down"/>
                </Link>
                <div className="search-box">
                    <Search placeholder="输入关键词查询" onSearch={this.search.bind(this)}/>
                </div>
                <Link to="/login" className="user-box">
                    <Icon type="user"/>
                </Link>
            </Header>
            <div className="body">
                <MenuBox click={this.click.bind(this)} data={menuData}/>
                <div className="mgb25" />
                <Box title="测试标题" data={zanData} />
            </div>
        </div>
    }
    search(value){
        let {history} = this.props;
        history.push('/list/all/' + value);
    }
    click(path){
        let {history,clearShopList} = this.props;
        clearShopList();
        history.push('/list' + path);
    }
}

class MenuBox extends Component{
    render(){
        let {data,click} = this.props;
        let contentList = [];
        let roungList = [];
        let {index = 0} = this.state || {};

        data.forEach((item,i) => {
            contentList.push(<MenuList click={click} data={item} key={i}/>);
            roungList.push(<i className={index === i ? 'active' : ''} key={i} onClick={this.change.bind(this,i)}/>);
        });
        return <div className="menu-wrap" ref="box">
            <div className="menu-content">
                <div className="menu-move-box" style={{
                    left: -index * this.width + 'px'
                }}>
                    {contentList}
                </div>
                </div>
            <div className="menu-roung-box">{roungList}</div>
        </div>
    }
    change(index){
        this.setState({
            index
        });
    }
    componentDidMount(){
        this.width = this.refs.box.offsetWidth;
    }
}

export default connect(state => ({
    cityData:state.cityData,
    homeData:state.homeData
}),actions)(Home);