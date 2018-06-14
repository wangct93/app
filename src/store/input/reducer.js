/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import wt from 'wt-butil';
import {ShopData,FoodData} from '@/data';
let defaultState = {

};

export let inputData = (state = defaultState,action = {}) => {
    let func = reducer[action.type];
    if(typeof func === 'function'){
        state = wt.clone(state);
        func(state,action);
    }
    return state;
};

let reducer = {
    getInputShopData(state,action){
        let {id} = action;
        if(!id){
            let id = ShopData.length ? +ShopData[ShopData.length - 1].id + 1 : 1;
            state.data = {
                id
            };
        }else{
            state.loading = true;
            let p1 = new Promise((cb,eb) => {
                requestShopData({},({rows}) => {
                    let target = rows.filter(item => +item.id === +id)[0] || {};
                    cb(target);
                });
            });
            let p2 = new Promise((cb,eb) => {
                requestFoodData({shopId:id},cb);
            });
            Promise.all([p1,p2]).then(result => {
                let data = result[0];
                data.foodList = result[1];
                dispatch({
                    type:'getInputShopDataEnd',
                    data
                });
            });
        }
    },
    getInputShopDataEnd(state,action){
        state.loading = false;
        state.data = action.data;
    },
    editInputFood(state,action){
        let {data} = action;
        let list = wt.getValue(state.data,'foodList',[]);
        if(data.id){
            list.forEach(item => {
                if(item.id === data.id){
                    wt.extend(item,data);
                }
            });
        }else{
            data.id = +new Date();
            list.push(data);
        }
    },
    submitInputShop(state,action){
        let {data} = action;
        let {foodList = [],id} = data;
        let index = ShopData.indexOfFunc(item => item.id === id);
        if(index === -1){
            ShopData.push(data);
        }else{
            wt.extend(ShopData[index],data);
        }
        FoodData.remove(item => item.shopId === id);
        foodList.forEach(item => {
            item.shopId = id;
            FoodData.push(item);
        });
        state.success = true;
    },
    deleteInputFood(state,action){
        let {index} = action;
        let list = wt.getValue(state.data,'foodList',[]);
        list.splice(index,1);
    },
    initInputState(state,action){
        state.success = false;
    }
};

function requestShopData(params = {},cb,eb){
    setTimeout(() => {
        let {start,limit = 10,type,keyword} = params;
        let data = ShopData.filter(item => {
            if((!type || type === 'all' || item.type === type) && (!keyword || item.name.indexOf(keyword) !== -1)){
                return true;
            }
        });
        if(!wt.isUndefined(start)){
            data = data.slice(start,start + limit);
        }
        cb({
            rows:data,
            total:data.length
        });
    },500);
}

function requestFoodData(params = {},cb,eb){
    setTimeout(() => {
        let {shopId} = params;
        cb(FoodData.filter(item => +item.shopId === +shopId));
    },500);
}