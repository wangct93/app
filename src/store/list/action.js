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


export const getShopList = shopType => {
    return {
        type:'getShopList',
        shopType
    }
};

export const submitComment = data => {
    return {
        type:'submitComment',
        data
    }
};