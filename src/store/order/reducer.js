/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';
let defaultState = {
    list:[
        {"id":1,"shopName":"合宿人家","shopId":1,"list":[{"id":1,"shopId":1,"name":"拿铁","price":180,"intro":"坐下来聊聊天","monthSold":6010,"keywords":"热销","count":2}],"time":"2018-05-25 16:06:21","userId":1,"userName":"admin"}
    ]
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
        let {userInfo,shopData,list:foodList} = action;
        let {list = []} = state;
        let id = list.length ? +list[0].id + 1 : 1;
        list.unshift({
            id,
            shopName:shopData.name,
            shopId:shopData.id,
            list:foodList,
            time:new Date().toFormatString(),
            userId:userInfo.id,
            userName:userInfo.name
        });
        state.createSuccess = true;
    },
    submitComment(state,action){
        state.list.forEach(item => {
            if(item.id === action.data.orderId){
                item.comment = true;
            }
        });
    },
    initOrderState(state,action){
        state.createSuccess = false;
    }
};
