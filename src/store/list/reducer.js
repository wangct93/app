/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
import Home from '../../views/home';
import City from '../../views/city';
let defaultState = {
    data:[
        {
            id:1,
            src:'img/1.jpg',
            name:'参数2',
            distance:'120m',
            intro:'吃死你提示',
            price:'￥150',
            count:'300'
        },
        {
            id:1,
            src:'img/1.jpg',
            name:'参数2',
            distance:'120m',
            intro:'吃死你提示',
            price:'￥150',
            count:'300'
        },
        {
            id:1,
            src:'img/1.jpg',
            name:'参数2',
            distance:'120m',
            intro:'吃死你提示',
            price:'￥150',
            count:'300'
        },
        {
            id:1,
            src:'img/1.jpg',
            name:'参数2',
            distance:'120m',
            intro:'吃死你提示',
            price:'￥150',
            count:'300'
        },
        {
            id:1,
            src:'img/1.jpg',
            name:'参数2',
            distance:'120m',
            intro:'吃死你提示',
            price:'￥150',
            count:'300'
        },
        {
            id:1,
            src:'img/1.jpg',
            name:'参数2',
            distance:'120m',
            intro:'吃死你提示',
            price:'￥150',
            count:'300'
        },
        {
            id:1,
            src:'img/1.jpg',
            name:'参数2',
            distance:'120m',
            intro:'吃死你提示',
            price:'￥150',
            count:'300'
        }
    ]
};

export let listData = (state = defaultState,action = {}) => {
    state = wt.clone(state);
    wt.execFunc(reducer[action.type],state,action);
    return state;
};

let reducer = {
    loadMoreList(state,action){
        state.data = state.data.concat(state.data);
    }
};
