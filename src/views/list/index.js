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

class List extends Component{
    render(){
        let {data = []} = this.props;
        return <div className="page-flex list-container">
            <Header>
                <SearchBox />
            </Header>
            <div className="body fit">
                <div className="fit overflow-auto" ref="scrollBox">
                    <ul className="shop-list" ref="list">
                        {
                            data.map((item,i) => {
                                let {id,src,distance,price,count,name,intro} = item;
                                return <li key={i}>
                                    <Link className="block" to={`/shop/${id}`}>
                                        <div className="img-box">
                                            <img src={src}/>
                                        </div>
                                        <div className="info-box">
                                            <p>
                                                <span className="shop-title">{name}</span>
                                                <span className="fr">{distance}</span>
                                            </p>
                                            <p>{intro}</p>
                                            <p>
                                                <span className="shop-price">{price}</span>
                                                <span className="fr">已售{count}</span>
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                    <div className="footer-btn-box" ref="footer">
                        <Button loading={true}>加载更多</Button>
                    </div>
                </div>
            </div>
        </div>
    }
    componentDidMount(){
        let {scrollBox,footer} = this.refs;
        $(scrollBox).bind('scroll',e => {
            let boxBottom = $(e.target).getRect().bottom;
            let footerTop = $(footer).getRect().top;
            if(footerTop < boxBottom){
                this.props.loadMoreList();
            }
        });
    }
}


export default connect(state => state.listData,actions)(List);