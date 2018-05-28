/**
 * Created by Administrator on 2018/3/7.
 */




export let login = data => {
    return {
        type:'login',
        data
    }
};

export const clearAlerInfo = () => {
    return {
        type:'clearLoginAlertInfo'
    }
};


export const createOrder = (userInfo,shopData,list) => {
    return {
        type:'createOrder',
        userInfo,
        shopData,
        list
    }
};


export const initState = () => {
    return {
        type:'initOrderState'
    }
};


export const againOrder = data => {
    return {
        type:'againOrder',
        data
    }
};