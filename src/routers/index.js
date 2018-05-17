/**
 * Created by Administrator on 2018/3/27.
 */
import './index.less';
import React from 'react';
import {Provider,connect} from 'react-redux';
import {HashRouter,withRouter,Route} from 'react-router-dom';


import RouterSwitch from '../components/routerSwitch';

import Footer from '../views/footer';

const FooterView = withRouter(props => {
    let {location,data} = props;
    let {pathname} = location;
    let hasFooter = data.some(item => item.path === pathname);
    return hasFooter ? <Footer data={data}/> : '';
});
export default connect(state => {
    return state.routerData;
})(({list,footerList}) => {
    return <HashRouter>
        <React.Fragment>
            <RouterSwitch data={list} />
            <FooterView data={footerList}/>
        </React.Fragment>
    </HashRouter>
})