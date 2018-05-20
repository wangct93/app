/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
    data:{
        1234:[
            {
                id:1,
                shopName:'ll',
                shopId:1,
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
                ]
            },
            {
                id:2,
                shopName:'ll',
                shopId:1,
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
                ]
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
    createOrder(state,action){
        let {userInfo,data} = action;
        let {name:userId} = userInfo;
        let {data:orderData} = state;
        let list = orderData[userId];
        if(!list){
            orderData[userId] = list = [];
        }
        let {name:shopName,id:shopId,list:foodList} = data;
        list.unshift({
            id:+list[list.length - 1].id + 1,
            shopName,
            shopId,
            list:foodList,
            time:new Date().toFormatString()
        });
    },
    submitComment(state,action){
        let {data} = action;
        let {orderId,userName} = data;
        let orderData = state.data[userName].filter(item => +item.id === +orderId)[0];
        orderData.comment = true;
    }
};
