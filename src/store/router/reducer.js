/**
 * Created by Administrator on 2018/3/7.
 */
import wt from 'wt-butil';
import {dispatch} from '../store';
import Home from '../../views/home';
import City from '../../views/city';
import List from '../../views/list';
import Shop from '../../views/shop';
import Login from '../../views/login';
import Input from '../../views/input';
import Order,{MyOrder,OrderDetail} from '../../views/order';
import User from '../../views/user';
import Comment from '../../views/comment';
import Dev from '../../views/developing';
let defaultState = {
    defaultPath:'/home',
    list:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/city',
            component:City
        },
        {
            path:'/list/:type/:keyword?',
            component:List
        },
        {
            path:'/shop/:id/:show?',
            component:Shop
        },
        // {
        //     path:'/login',
        //     component:Login
        // },
        {
            path:'/input/:id?',
            component:Input
        },
        {
            path:'/order/:id',
            component:Order
        },
        {
            path:'/myOrder',
            component:MyOrder
        },
        {
            path:'/user',
            component:User
        },
        {
            path:'/orderDetail/:id',
            component:OrderDetail
        },
        {
            path:'/comment/:orderId',
            component:Comment
        },
        {
            path:'/dev',
            component:Dev
        }
    ],
    footerList:[
        {
            path:'/home',
            text:'首页'
        },
        {
            path:'/myOrder',
            text:'订单'
        },
        {
            path:'/user',
            text:'我的'
        }
    ]
};

export let routerData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {

};
