/**
 * Created by Administrator on 2018/3/7.
 */



export let loadMoreList = (params) => {
    return {
        type:'loadMoreList'
    }
};


export let shopping = (isPlus,data) => {
    return {
        type:'shoppingCart',
        data,
        isPlus
    }
};