/**
 * Created by Administrator on 2018/4/25.
 */
import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

export default ({data = [],basename = ''}) => {
    return data.length ? <Switch>
        {
            data.map(({path = '/',component,exact},i) => {
                return <Route exact={exact} key={i} path={basename + path} component={component} />
            })
        }
        {
            <Redirect to={basename + (data[0].path || '/')}/>
        }
    </Switch> : <div/>;
}