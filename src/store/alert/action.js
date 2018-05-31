/**
 * Created by Administrator on 2018/3/7.
 */





export const clearAlertInfo = () => {
    return {
        type:'clearAlertInfo'
    }
};

export const alert = message => {
    return {
        type:'alert',
        message
    }
};