/**
 * Created by Administrator on 2018/3/7.
 */



export let loadMoreList = () => {
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

export const getShopData = shopId => {
    return {
        type:'getShopData',
        shopId
    }
};

export const saveScrollTop = scrollTop => {
    return {
        type:'saveShopListScrollTop',
        scrollTop
    }
};


export const getShopList = (shopType,keyword) => {
    return {
        type:'getShopList',
        shopType,
        keyword
    }
};

export const submitComment = data => {
    return {
        type:'submitComment',
        data
    }
};

export const clearShopData = () => {
    return {
        type:'clearShopData'
    }
};