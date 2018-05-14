/**
 * Created by Administrator on 2018/3/7.
 */



export let loadMoreList = params => {
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

export const getShopData = id => {
    return {
        type:'getShopData',
        id
    }
};

export const saveScrollTop = scrollTop => {
    return {
        type:'saveShopListScrollTop',
        scrollTop
    }
};


export const getShopList = shopType => {
    return {
        type:'getShopList',
        shopType
    }
};