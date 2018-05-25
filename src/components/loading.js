/**
 * Created by wangct on 2018/5/13.
 */
import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';
import {Provider, connect} from 'react-redux';


export default props => {
    let {message = '数据加载中......',show} = props;
    return <div className="loading-box" style={{
        display:show ? 'flex' : 'none'
    }}>
        <div className="loading-message">{message}</div>
    </div>;
}