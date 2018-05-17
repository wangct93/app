/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
    data:{
        1234:[
            {
                shopName:'ll',
                shopId:'wdd',
                time:'2018-04-04 12:22:33',
                list:[
                    {
                        name:'咖啡',
                        price:'18',
                        count:3
                    },
                    {
                        name:'咖啡',
                        price:'18',
                        count:3
                    }
                ],
                comment:{
                    userName:'1234',
                    score:4,
                    content:'ddd好'
                }
            },
            {
                shopName:'ll',
                shopId:'wdd',
                time:'2018-04-04 12:22:33',
                list:[
                    {
                        name:'咖啡',
                        price:'18',
                        count:3
                    },
                    {
                        name:'咖啡',
                        price:'18',
                        count:3
                    }
                ],
                comment:{
                    userName:'1234',
                    score:4,
                    content:'ddd好'
                }
            }
        ]
    }
};

export let orderData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {

};
