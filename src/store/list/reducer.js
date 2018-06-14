/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';
import {ShopData,FoodData} from '@/data';
let defaultState = {
    shoppingCartData:{
        1:[{"id":1,"shopId":1,"name":"拿铁","price":180,"intro":"坐下来聊聊天","monthSold":6010,"keywords":"热销","count":2}]
    },
    comment:[{"userId":1,"userName":"admin","shopId":1,"content":"","score":3.5,"orderId":1,"id":1},
        {"userId":1,"userName":"admin","shopId":1,"content":"","score":3.5,"orderId":1,"id":2},
        {"userId":1,"userName":"admin","shopId":1,"content":"","score":3.5,"orderId":1,"id":3},
        {"userId":1,"userName":"admin","shopId":1,"content":"","score":3.5,"orderId":1,"id":4},
        {"userId":1,"userName":"admin","shopId":1,"content":"","score":3.5,"orderId":1,"id":5},
        {"userId":1,"userName":"admin","shopId":1,"content":"","score":3.5,"orderId":1,"id":6},
        {"userId":1,"userName":"admin","shopId":1,"content":"","score":3.5,"orderId":1,"id":7}]
};

export let listData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    loadMoreList,
    loadShopListEnd,
    shoppingCart,
    getShopData,
    getShopDataEnd,
    getShopDataError,
    saveShopListScrollTop,
    getShopList,
    getShopListEnd,
    submitComment,
    createOrder,
    clearShopList,
    againOrder,
    clearShopData(state,action){
        delete state.shopData;
    },
    submitInputShop(state,action){
        let {id,foodList} = action.data;
        let cartData = wt.getValue(state,'shoppingCartData',{});
        let list = wt.getValue(cartData,id,[]);
        for(let i = 0;i < list.length;i++){
            let item = list[i];
            let index = foodList.indexOfFunc(food => food.id === item.id);
            if(index === -1){
                list.splice(i--,1);
            }else{
                wt.extend(item,foodList[index]);
            }
        }
    }
};

function againOrder(state,action){
    let {data} = action;
    let target = wt.getValue(state,'shoppingCartData',{});
    target[data.shopId] = data.list;
}

function clearShopList(state,action){
    state.data = [];
}

function loadMoreList(state,action){
    let {params = {}} = state;
    params.start += params.limit;
    state.loadingMoreData = true;
    requestShopData(params,({rows}) => {
        dispatch({
            type:'loadShopListEnd',
            data:rows
        });
    });
}

function loadShopListEnd(state,action){
    let {data} = action;
    wt.extend(state,{
        loadingMoreData:false,
        data:state.data.concat(data)
    });
}


function shoppingCart(state,action){
    let {data,isPlus = true} = action;
    let datas = wt.getValue(state,'shoppingCartData',{});
    let {shopData = {}} = state;
    let {id} = shopData;
    let list = wt.getValue(datas,id,[]);
    let filterData = list.toFieldObject('id');
    let target = filterData[data.id];
    if(!target){
        target = wt.clone(data);
        list.push(target);
        target.count = 0;
    }
    if(isPlus){
        target.count++;
    }else{
        target.count = Math.max(target.count - 1,0);
        if(target.count === 0){
            list.remove(target);
        }
    }
}

function getShopData(state,action){
    state.loadingShopData = true;
    let {shopId} = action;
    let p1 = new Promise((cb,eb) => {
        requestShopData({},({rows}) => {
            let target = rows.filter(item => +item.id === +shopId)[0] || {};
            cb(target);
        });
    });
    let p2 = new Promise((cb,eb) => {
        requestFoodData({shopId},cb);
    });
    Promise.all([p1,p2]).then(result => {
        let data = result[0];
        data.foodData = result[1];
        dispatch({
            type:'getShopDataEnd',
            data
        });
    },e => {
        dispatch({
            type:'getShopDataError',
            message:e
        });
    });
}

function getShopDataEnd(state,action){
    state.loadingShopData = false;
    state.shopData = action.data;
}

function getShopDataError(state,action){
    state.loadingShopData = false;
    state.getShopDataError = action.message;
}

function saveShopListScrollTop(state,action){
    state.scrollTop = action.scrollTop;
}

function getShopList(state,action){
    let {shopType:type,keyword} = action;
    let params = {
        start:0,
        limit:10,
        type,
        keyword
    };
    wt.extend(state,{
        loadingShopList:true,
        params
    });
    requestShopData(params,({rows,total}) => {
        dispatch({
            type:'getShopListEnd',
            data:rows,
            total
        });
    });
}

function getShopListEnd(state,action){
    let {data = [],total} = action;
    wt.extend(state, {
        data,
        loadingShopList: false,
        total
    });
}

function submitComment(state,action){
    let {data} = action;
    let list = wt.getValue(state,'comment',[]);
    data.id = list.length ? +list[list.length - 1].id + 1 : 1;
    list.unshift(data);
}

function createOrder(state,action){
    let {shopData} = action;
    delete state.shoppingCartData[shopData.id];
}

function requestShopData(params = {},cb,eb){
    setTimeout(() => {
        let {start,limit = 10,type,keyword} = params;
        let data = ShopData.filter(item => {
            if((!type || type === 'all' || item.type === type) && (!keyword || item.name.indexOf(keyword) !== -1)){
                return true;
            }
        });
        let total = data.length;
        if(!wt.isUndefined(start)){
            data = data.slice(start,start + limit)
        }
        cb({
            rows:data,
            total
        });
    },500);
}

function requestFoodData(params = {},cb,eb){
    setTimeout(() => {
        let {shopId} = params;
        cb(FoodData.filter(item => +item.shopId === +shopId));
    },500);
}
