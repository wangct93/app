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


export const createOrder = (userInfo,data) => {
    return {
        type:'createOrder',
        userInfo,
        data
    }
};