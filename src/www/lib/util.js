/**
 * Created by Administrator on 2017/2/21.
 */






addMethods();

/**
 * 加载全局对象方法
 */
function addMethods(){
    let win;
    try{
        win = window;
    }catch(e){
        win = global;
    }
    let targets = {
        Array:require('./object/Array'),
        Date:require('./object/Date'),
        String:require('./object/String')
    };
    forEach(targets,(copyTarget,name) => {
        let globalTarget = win[name];
        if(globalTarget){
            try{
                for(let name in copyTarget){
                    let _prototype = globalTarget.prototype;
                    if(copyTarget.hasOwnProperty(name) && copyTarget[name] !== undefined && _prototype[name] === undefined){
                        try{
                            Object.defineProperty(_prototype,name,{
                                value:copyTarget[name],
                                enumerable:false
                            });
                        }catch(e){
                            _prototype[name] = copyTarget[name];
                        }
                    }
                }
            }catch(e){
                console.log(e);
            }
        }
    });
}

let pinyin;
// pinyin = require('./pinyin/pinyin');

//判断对象类型
function isArray(v){
    return Object.prototype.toString.call(v) === '[object Array]';
}
function isObject(v){
    return Object.prototype.toString.call(v) === '[object Object]';
}
function isNumber(v){
    return Object.prototype.toString.call(v) === '[object Number]';
}
function isBoolean(v){
    return Object.prototype.toString.call(v) === '[object Boolean]';
}
function isString(v){
    return Object.prototype.toString.call(v) === '[object String]';
}
function isNull(v){
    return Object.prototype.toString.call(v) === '[object Null]';
}
function isUndefined(v){
    return v === undefined;
}
function isFunction(v){
    return Object.prototype.toString.call(v) === '[object Function]';
}

function isPlainObj(obj) {
    return obj && (obj.constructor === Object || obj.constructor === undefined);
}

/**
 * 判断是否为空对象
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj){
    for (let name in obj) {
        if(obj.hasOwnProperty(name)){
            return false;
        }
    }
    return true;
}


/**
 * 继承属性
 * param 第一个参数如果是bol值，则判断是否深度继承
 * @returns {*|{}}
 */
function extend() {
    let deep = false;
    let target = arguments[0];
    let length = arguments.length;
    let i = 1;
    if(isBoolean(target)){
        deep = target;
        target = arguments[i++] || {};
    }
    if(isUndefined(target) || isNumber(target) || isString(target) || isBoolean(target)){
        target = {};
    }
    for(;i < length;i++){
        let pData = arguments[i];
        if(isPlainObj(pData) || isArray(pData)){
            for(let name in pData){
                if(pData.hasOwnProperty(name)){
                    let selfValue = target[name];
                    let pValue = pData[name];
                    if(deep && (isPlainObj(pValue) || isArray(pValue))){
                        let subTarget;
                        if(isPlainObj(pValue)){
                            subTarget = isPlainObj(selfValue) ? selfValue : {};
                        }else{
                            subTarget = isArray(selfValue) ? selfValue : [];
                        }
                        pValue = extend(true,subTarget,pValue);
                    }
                    if(pValue !== undefined){
                        target[name] = pValue;
                    }
                }
            }
        }
    }
    return target;
}

/**
 * 克隆
 * @param obj   初始对象
 * @param bol   是否深度克隆，默认为true
 */
function clone(obj,bol){
    let target;
    if(isPlainObj(obj) || isArray(obj)){
        bol = bol !== false;
        target = isArray(obj) ? [] : {};
        for(let name in obj){
            if(obj.hasOwnProperty(name)){
                let value = obj[name];
                if(bol && (isPlainObj(value) || isArray(value))){
                    value = clone(value,true);
                }
                target[name] = value;
            }
        }
    }
    return target;
}


/**
 * 比较对象值是否相等（必须是同一类型，不需要同一对象）
 * @param first
 * @param second
 * @returns {boolean}
 */
function equal(first,second){
    if(typeof first === typeof second){
        if(isPlainObj(first) || isArray(first)){
            let fieldData = {};
            for(let name in first){
                if(first.hasOwnProperty(name)){
                    if(!equal(first[name],second[name])){
                        return false;
                    }
                    fieldData[name] = 1;
                }
            }
            for(let name in second){
                if(second.hasOwnProperty(name)){
                    if(!fieldData[name] && !equal(first[name],second[name])){
                        return false;
                    }
                }
            }
            return true;
        }else{
            return first === second;
        }
    }
    return false;
}


/**
 * 队列执行，根据数组按顺序执行
 * @param opt       配置项有：       list execFunc limit check success
 * @constructor
 */


class Queue{
    constructor(option){
        this.init(option);
    }
    init(option){
        let defaultOption = {
            limit:1,
            interval:10,
            _runCount:0,
            list:[],
            result:[],
            getItem(){
                let {list} = this;
                return list.shift();
            },
            check(item){
                return item !== undefined;
            }
        };
        extend(this,defaultOption,option);
    }
    start(){
        let {_runCount,limit} = this;
        for(let i = _runCount;i < limit;i++){
            this._runCount++;
            this._exec();
        }
    }
    _exec(){
        let item = this.getItem();
        execFunc.call(this,this.next);
        if(item === undefined){
            this._runCount--;
            if(this._runCount === 0){
                execFunc.call(this,this.success,this.result);
            }
        }else if(this.check(item)){
            this.execFunc(item,(data) => {
                this.result.push(data);
                setTimeout(() => {
                    this._exec();
                },this.interval);
            });
        }else{
            this._exec();
        }
    }
    addItem(items){
        if(!isArray(items)){
            items = [items];
        }
        this.list.push(...items);
    }
}





/**
 * 异步处理方法
 * @param fn    有两个参数，一个成功回调，一个失败回调
 * @constructor
 */
function Promise(fn){
    this.state = 'pending';
    this.resolveList = [];
    this.rejectList = [];
    this.value = null;
    fn(this.getFunc('resolve'),this.getFunc('reject'));
}

/**
 * 等所有promise异步执行后调用回调
 * @returns {Promise}
 */
Promise.all = function(ary){
    // let ary = [];
    // for(let i = 0,len = arguments.length;i < len;i++){
    //     ary.push(arguments[i]);
    // }
    let len = ary.length;
    return new Promise(function(cb){
        let result = [];
        let getFunc = function(promise,index){
            return function(value){
                result[index] = value;
                --len;
                if(len === 0){
                    cb(result);
                }
            }
        };
        ary.forEach(function(item,index){
            item.then(getFunc(item,index),getFunc(item,index));
        });
    })
};
Promise.prototype = {
    then:function(resolve,reject){
        let handler = {
            resolve:resolve,
            reject:reject
        };
        let state = this.state;
        if(!this.isPending()){
            handler[state](this.value);
        }else{
            this.resolveList.push(resolve);
            this.rejectList.push(reject);
        }
        return this;
    },
    getState:function(){
        return this.state;
    },
    isPending:function(){
        return this.state === 'pending';
    },
    getFunc:function(type){
        let promise = this;
        return function(value){
            promise.value = value;
            promise.state = type;
            promise.emit(type,value);
        }
    },
    emit:function(type,value){
        let list = this[type + 'List'];
        let func;
        while(func = list.shift()){
            execFunc(func,value);
        }
    }
};

/**
 * 执行函数
 * @returns {*}
 */
function execFunc(){
    let fn = arguments[0];
    if(isFunction(fn)){
        let ary = [];
        for(let i = 1,len = arguments.length;i < len;i++){
            ary.push(arguments[i]);
        }
        return fn.apply(this,ary);
    }
}

//将类数组对象转化为数组
function toArray(nodeList){
    if(nodeList instanceof Array){
        return nodeList;
    }
    let l = nodeList.length;
    let ary = [];
    for (let i = 0; i < l; i++) {
        ary[i] = nodeList[i];
    }
    return ary;
}

/**
 * 遍历数组（包括类数组对象）或者对象执行回调函数
 * @param ary
 * @param fn
 * @param _this
 */
function forEach(ary,fn,_this){
    _this = _this || this;
    if(ary){
        if(isArray(ary)){
            for(let i = 0,len = ary.length;i < len;i++){
                if(fn.call(_this,ary[i],i) === false){
                    break;
                }
            }
        }else{
            for(let name in ary){
                if(ary.hasOwnProperty(name)){
                    if(fn.call(_this,ary[name],name) === false){
                        break;
                    }
                }
            }
        }
    }
    return ary;
}




let util = {
    isFunction,
    isArray,
    isObject,
    isNumber,
    isString,
    isBoolean,
    isUndefined,
    isEmpty,
    isPlainObj,
    equal,
    Queue,
    execFunc,
    toArray,
    Promise,
    extend,
    pinyin,
    forEach,
    clone
};

module.exports = util;


