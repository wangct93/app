/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
    commentData:{
        1:[
            {
                userName:'13765465',
                score:4,
                content:'不好'
            },
            {
                userName:'132765465',
                score:5,
                content:'非常好'
            }
        ]
    },
    shoppingCartData:{
        1:[
            {
                count:2,
                id:1,
                intro: "坐下来聊聊天",
                keywords: "热销",
                monthSold: 6010,
                name: "拿铁",
                price: 180,
                shopId: 1
            },
            {
                count:4,
                id:3,
                intro: "坐下来2聊聊天",
                keywords: "热销333",
                monthSold: 6010,
                name: "拿铁2222",
                price: 18,
                shopId: 1
            }
        ]
    }
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
    loadMoreList(state,action){
        let {allData = [],params = {},loadingMoreData} = state;
        let {start,limit} = params;
        let newStart = start + limit;
        if(loadingMoreData){
            return;
        }
        if(newStart >= allData.length){
            state.hasMoreData = false;
        }else{
            params.start = newStart;
            state.loadingMoreData = true;
            setTimeout(() => {
                dispatch({
                    type:'loadShopListEnd',
                    data:allData.slice(newStart,newStart + limit)
                });
            },500);
        }

    },
    loadShopListEnd(state,action){
        wt.extend(state,{
            loadingMoreData:false,
            data:state.data.concat(action.data)
        });
    },
    shoppingCart(state,action){
        let {data,isPlus = true} = action;
        let {shoppingCartData,shopData = {}} = state;
        if(!shoppingCartData){
            state.shoppingCartData = shoppingCartData = {};
        }
        let {id} = shopData;
        let list = shoppingCartData[id];
        if(!list){
            shoppingCartData[id] = list = [];
        }
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
    },
    getShopData(state,action){
        state.loadingShopData = true;
        let {id} = action;
        let p1 = new Promise((cb,eb) => {
            $.ajax({
                url:'json/shop.json',
                data:{
                    id
                },
                success(data){
                    let target = data.filter(item => +item.id === +id)[0] || {};
                    cb(target);
                },
                error(e){
                    eb(e)
                }
            });
        });
        let p2 = new Promise((cb,eb) => {
            $.ajax({
                url:'json/food.json',
                data:{
                    id
                },
                success(data){
                    let foodList = data.filter(item => +item.shopId === +id);
                    cb(foodList);
                },
                error(e){
                    eb(e)
                }
            });
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
    },
    getShopDataEnd(state,action){
        state.loadingShopData = false;
        state.shopData = action.data;
    },
    getShopDataError(state,action){
        state.loadingShopData = false;
        state.getShopDataError = action.message;
    },
    saveShopListScrollTop(state,action){
        state.scrollTop = action.scrollTop;
    },
    getShopList(state,action){
        wt.extend(state,{
            loadingShopList:true,
            hasMoreData:true,
            params:{
                start:0,
                limit:10
            }
        });
        setTimeout(() => {
            $.ajax({
                url:'json/shop.json',
                success(data){
                    dispatch({
                        type:'getShopListEnd',
                        data
                    });
                }
            });
        },500);
    },
    getShopListEnd(state,action){
        let {start, limit} = state.params || {};
        let {data = []} = action;
        wt.extend(state, {
            allData: data,
            data: data.slice(start, start + limit),
            loadingShopList: false
        });
    },

    submitComment(state,action){
        let {data} = action;
        let {commentData} = state;
        if(!commentData){
            state.commentData = commentData = {};
        }
        let {shopId} = data;
        let list = commentData[shopId];
        if(!list){
            commentData[shopId] = list = [];
        }
        list.unshift(data);
    },
    createOrder(state,action){
        let {data:shopData} = action;
        delete state.shoppingCartData[shopData.id];
    }
};
