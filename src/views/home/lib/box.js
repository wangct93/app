/**
 * Created by Administrator on 2018/5/8.
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';

export default class Box extends Component{
    render(){
        let {title,data} = this.props;
        return <div className="box">
            <div className="box-header">{title}</div>
            <div className="box-body">
                <ul className="box-ul">
                    {
                        data.map(({title,intro,src,path},i) => {
                            return <li key={i}>
                                <p className="box-item-title">{title}</p>
                                <p className="box-item-text">{intro}</p>
                                <div className="img-box">
                                    <img src={src}/>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}
