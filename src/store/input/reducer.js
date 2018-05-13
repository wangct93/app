/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {

};

export let inputData = (state = defaultState,action = {}) => {
    state = wt.clone(state);
    wt.execFunc(reducer[action.type],state,action);
    return state;
};

let reducer = {

};
