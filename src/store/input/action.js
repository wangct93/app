/**
 * Created by Administrator on 2018/3/7.
 */


export const submitShop = data => {
    return {
        type:'submitInputShop',
        data
    }
};

export const deleteFood = index => {
    return {
        type:'deleteInputFood',
        index
    }
};

export const initState = () => {
    return {
        type:'initInputState'
    }
};



export const getData = id => {
    return {
        type:'getInputShopData',
        id
    }
};

export const editFood = data => {
    return {
        type:'editInputFood',
        data
    }
};