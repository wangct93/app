/**
 * Created by Administrator on 2018/3/27.
 */
import './index.less';
import React from 'react';
import {Provider,connect} from 'react-redux';
import {HashRouter,withRouter,Route} from 'react-router-dom';

import {SwitchRouter} from 'wt-reacts';

import Footer from '../views/footer';
import Login from '../views/login';
import Alert from '../views/alert';

import {setDefaultPath} from '../computes/compute';


export default connect(state => ({
    routerData:state.routerData,
    userData:state.userData
}))(props => {
    let {routerData,userData} = props;
    let {list,footerList,defaultPath} = routerData;
    let {info} = userData;
    list = info ? list : [
        {
            path:'/login',
            component:Login
        }
    ];
    list = setDefaultPath(list,defaultPath);
    return <HashRouter>
        <React.Fragment>
            <SwitchRouter data={list} />
            <FooterView data={footerList}/>
            <Alert />
        </React.Fragment>
    </HashRouter>
})



const FooterView = withRouter(props => {
    let {location,data} = props;
    let {pathname} = location;
    let hasFooter = data.some(item => item.path === pathname);
    return hasFooter ? <Footer data={data}/> : '';
});