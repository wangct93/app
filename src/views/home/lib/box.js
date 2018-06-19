/**
 * Created by Administrator on 2018/5/8.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import {Img,Loading} from 'wt-reacts';
import wt from 'wt-butil';
export default class Box extends Component{
    render(){
        let {title,data = []} = this.props;
        return <div className="box">
            <div className="box-header">{title}</div>
            <div className="box-body">
                <ul className="box-ul">
                    {
                        data.map((item,i) => {
                            let {title,intro,src,path} = item;
                            return <li key={i} onClick={this.toShop.bind(this,item)}>
                                <Img src={src} />
                                <p className="box-item-title">{title}</p>
                                <p className="box-item-text">{intro}</p>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
    toShop(data){
        location.hash = '/shop/' + data.id;
    }
}
