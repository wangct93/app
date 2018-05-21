/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
    data:{}
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
