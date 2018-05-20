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