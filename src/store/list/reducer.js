/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import ShopData from '@/json/shop.json';
import FoodData from '@/json/food.json'
let defaultState = {

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
    createOrder
};



function loadMoreList(state,action){
    let {params = {}} = state;
    params.start += params.limit;
    state.loadingMoreData = true;
    getShopListData(params,data => {
        dispatch({
            type:'loadShopListEnd',
            data
        });
    });
}

function loadShopListEnd(state,action){
    let {data} = action;
    wt.extend(state,{
        loadingMoreData:false,
        data:state.data.concat(data),
        hasMoreData:!!data.length
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
        requestShopData({},data => {
            let target = data.filter(item => +item.id === +shopId)[0] || {};
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
    let {shopType:type} = action;
    let params = {
        start:0,
        limit:10,
        type
    };
    wt.extend(state,{
        loadingShopList:true,
        params
    });
    requestShopData(params,data => {
        dispatch({
            type:'getShopListEnd',
            data
        });
    });
}

function getShopListEnd(state,action){
    let {data = []} = action;
    wt.extend(state, {
        data,
        loadingShopList: false
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
        let {start,limit,type,keyword} = params;
        let data = ShopData.filter(item => {
            if((!type || item.type === type) && (!keyword || item.name.indexOf(keyword) !== -1)){
                return true;
            }
        });
        if(start && limit){
            data = data.slice(start,start + limit);
        }
        cb(data);
    },500);
}

function requestFoodData(params = {},cb,eb){
    setTimeout(() => {
        let {shopId} = params;
        cb(FoodData.filter(item => +item.shopId === +shopId));
    },500);
}
