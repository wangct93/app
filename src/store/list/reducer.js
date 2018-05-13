/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import Home from '../../views/home';
import City from '../../views/city';
let defaultState = {
    // data:[
    //     {
    //         id:1,
    //         src:'img/1.jpg',
    //         name:'参数2',
    //         distance:'120m',
    //         intro:'吃死你提示',
    //         price:'￥150',
    //         count:'300'
    //     },
    //     {
    //         id:1,
    //         src:'img/1.jpg',
    //         name:'参数2',
    //         distance:'120m',
    //         intro:'吃死你提示',
    //         price:'￥150',
    //         count:'300'
    //     },
    //     {
    //         id:1,
    //         src:'img/1.jpg',
    //         name:'参数2',
    //         distance:'120m',
    //         intro:'吃死你提示',
    //         price:'￥150',
    //         count:'300'
    //     },
    //     {
    //         id:1,
    //         src:'img/1.jpg',
    //         name:'参数2',
    //         distance:'120m',
    //         intro:'吃死你提示',
    //         price:'￥150',
    //         count:'300'
    //     },
    //     {
    //         id:1,
    //         src:'img/1.jpg',
    //         name:'参数2',
    //         distance:'120m',
    //         intro:'吃死你提示',
    //         price:'￥150',
    //         count:'300'
    //     },
    //     {
    //         id:1,
    //         src:'img/1.jpg',
    //         name:'参数2',
    //         distance:'120m',
    //         intro:'吃死你提示',
    //         price:'￥150',
    //         count:'300'
    //     },
    //     {
    //         id:1,
    //         src:'img/1.jpg',
    //         name:'参数2',
    //         distance:'120m',
    //         intro:'吃死你提示',
    //         price:'￥150',
    //         count:'300'
    //     }
    // ],
    shoppingCartData:{},
    currentData:{
        id:2,
        name:'天下第一',
        score:5,
        intro:'天下已第一文档',
        averPrice:55,
        foodData:[
            {
                type:'高度计算',
                price:12,
                name:'失误',
                intro:'dddsad',
                count:333,
                id:1
            },
            {
                type:'高度计算',
                price:32,
                name:'失误33',
                intro:'dddsad',
                count:333,
                id:31
            },
            {
                type:'高度计算',
                price:32,
                name:'33333',
                intro:'dddsad',
                count:333,
                id:21
            },
            {
                type:'高度计算',
                price:12,
                name:'失误1',
                intro:'dddsad',
                count:333,
                id:41
            },
            {
                type:'高度计算',
                price:122,
                name:'2失误3',
                intro:'dddsad',
                count:333,
                id:2
            },
            {
                type:'加成宽度',
                price:12,
                name:'失误',
                intro:'dddsad',
                count:333,
                id:1
            },
            {
                type:'加成宽度',
                price:32,
                name:'失误33',
                intro:'dddsad',
                count:333,
                id:31
            },
            {
                type:'加成宽度',
                price:32,
                name:'33333',
                intro:'dddsad',
                count:333,
                id:21
            },
            {
                type:'加成宽度',
                price:12,
                name:'失误1',
                intro:'dddsad',
                count:333,
                id:41
            },
            {
                type:'加成宽度',
                price:122,
                name:'2失误3',
                intro:'dddsad',
                count:333,
                id:2
            }
        ]
    }
};

export let listData = (state = defaultState,action = {}) => {
    state = wt.clone(state);
    wt.execFunc(reducer[action.type],state,action);
    return state;
};

let reducer = {
    loadMoreList(state,action){
        let {start,limit,allData = [],moreLoading} = state;
        let data = [];
        if(!moreLoading){
            if(start + limit < allData.length){
                state.start = start += limit;
                data = allData.slice(start,start + limit);
                state.moreLoading = true;
                setTimeout(() => {
                    dispatch({
                        type:'loadShopListEnd',
                        data
                    });
                },500);
            }else{
                state.hasMore = false;
            }
        }
    },
    loadShopListEnd(state,action){
        state.data = state.data.concat(action.data);
        state.moreLoading = false;
    },
    shoppingCart(state,action){
        let {data,isPlus = true} = action;
        let {shoppingCartData = {},currentData = {}} = state;
        let {id} = currentData;
        let list = shoppingCartData[id];
        if(!list){
            shoppingCartData[id] = list = [];
        }
        let filterData = list.toFieldObject('id');
        let target = filterData[data.id];
        if(!target){
            target = wt.clone(data);
            list.push(target);
            target.num = 0;
        }
        if(isPlus){
            target.num++;
        }else{
            target.num = Math.max(target.num - 1,0);
            if(target.num === 0){
                list.remove(target);
            }
        }
    },
    updateShopViewData(state,action){
        let {data} = action;
        let {currentData} = state;
        if(!currentData){
            state.currentData = currentData = {};
        }
        wt.extend(currentData,data);
        state.foodLoading = true;
        $.ajax({
            url:'json/food.json',
            success(data){
                dispatch({
                    type:'getFoodDataEnd',
                    data
                });
            }
        })
    },
    getFoodDataEnd(state,action){
        state.foodLoading = false;
        state.currentData.foodData = action.data;
    },
    saveShopListScrollTop(state,action){
        state.scrollTop = action.scrollTop;
    },
    getShopList(state,action){
        state.isLoading = true;
        let start = 0;
        let limit = 10;
        wt.extend(state,{
            start,
            limit
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
        state.isLoading = false;
        let {start,limit} = state;
        let {data = []} = action;
        state.allData = data;
        state.data = data.slice(start,start + limit);
    }
};
