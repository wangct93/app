/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Icon} from 'antd';


import Header from '../header';
import SearchBox from './lib/search';
import MenuList from './lib/menuList';
import Box from './lib/box';

class Home extends Component{
    render(){
        let {city = '请选择',menuData = [],czyhData = []} = this.props;

        return <div className="page-flex home-container">
            <Header back={false}>
                <Link to="/city" className="i-btn i-btn-right">
                    <span>{city}</span>
                    <Icon type="down"/>
                </Link>
                <SearchBox />
                <Icon type="user"/>
            </Header>
            <div className="body">
                <MenuBox data={menuData}/>
                <div className="mgb25" />
                <Box title="测试标题" data={czyhData} />
            </div>
        </div>
    }
}

class MenuBox extends Component{
    render(){
        let {data} = this.props;
        let contentList = [];
        let roungList = [];
        let {index = 0} = this.state || {};

        data.forEach((item,i) => {
            contentList.push(<MenuList data={item} key={i}/>);
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

export default connect(state => wt.extend({
    city:state.cityData.city,
    cityId:state.cityData.cityId,
},state.homeData))(Home);