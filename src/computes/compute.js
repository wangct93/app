/**
 * Created by Administrator on 2018/5/14.
 */

export const getPrice = price => {
    return '￥' + price;
};


export const getDistance = (num,sep = ' ') => {
    let result;
    if(num < 1000){
        result = num + sep +  'm';
    }else{
        result = num / 1000 + sep + 'km';
    }
    return result;
};

export const getAllPrice = (list) => {
    return list.reduce((ov,item) => {
        let {count = 1,price} = item;
        return ov + count * price;
    },0);
};


export const setDefaultPath = (list,path) => {
    list = list.slice(0);
    let index = list.indexOfFunc(item => item.path === path);
    if(index !== -1){
        list.unshift(list.splice(index,1)[0]);
    }
    return list;
};


export const onlyNumKeydown = e => {
    let keyCode = e.keyCode;
    let filters = [8,13,37,39];
    if(keyCode > 47 && keyCode < 58 || keyCode > 95 && keyCode < 106 || filters.indexOf(keyCode) !== -1){

    }else{
        e.preventDefault();
    }
};