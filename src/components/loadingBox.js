/**
 * Created by wangct on 2018/5/13.
 */
import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import {Provider, connect} from 'react-redux';


export default props => {
    let {message = '数据加载中......',show} = props;
    return show ? <div className="loading-box">
        <div className="loading-message">{message}</div>
    </div> : '';
}