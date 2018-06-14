/**
 * Created by Administrator on 2018/5/11.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import Header from "../header/index";
import {Form,Input,Icon,Button,Checkbox,Select,Table,Modal} from 'antd';
import wt from 'wt-butil';
import {onlyNumKeydown} from '@/computes/compute';
import {Img,Loading} from 'wt-reacts';
import FoodForm,{FileUpload} from './inputFood';

import * as actions from '@/store/input/action';

const FormItem = Form.Item;
const {Option} = Select;



class InputPage extends Component{
    render(){
        let {typeData,loading,data = {},editFood,submitShop,deleteFood,success,match} = this.props;
        let isAdd = wt.isUndefined(match.params.id);
        typeData = typeData.reduce((pv,item) => {
            return pv.concat(item);
        },[]);
        return <div className="page-flex input-container">
            <Header>
                {
                    isAdd ? '店铺录入' : '店铺信息修改'
                }
            </Header>
            <div className="body">
                {
                    success ? <div className="alert-text-box">
                        {
                            isAdd ? '添加成功' : '修改成功'
                        }
                        <Link to={`/shop/${data.id}`} >
                            <Button type="primary">查看店铺</Button>
                        </Link>
                    </div> : <FormView deleteFood={deleteFood} submitShop={submitShop} data={data} editFood={editFood} typeData={typeData}/>
                }
                <Loading show={loading} />

            </div>
        </div>
    }
    componentWillUpdate(props,state){
        let {id} = props.match.params;
        if(this.props.match.params.id !== id){
            this.props.getData(id);
        }
    }
    componentDidMount(){
        this.props.getData(this.props.match.params.id);
    }
    componentWillUnmount(){
        this.props.initState();
    }
}


class Box extends Component{
    state = {
        // foodInputOpen:true
    };
    render(){
        let {form,typeData = [],data = {},editFood,deleteFood} = this.props;
        let {getFieldDecorator} = form;
        let {foodInputOpen} = this.state || {};
        let {foodList = [],imgSrc,name = '',addr = '',qsPrice = '',psPrice = '',type,intro = ''} = data;
        return <Form onSubmit={this.click.bind(this)} className="form-horizontal">
            <Modal cancelText="取消" okText="添加" title="添加商品" destroyOnClose visible={foodInputOpen} onOk={this.addFood.bind(this)} onCancel={this.closeFoodDialog.bind(this)}>
                <FoodForm foodList={foodList} ref="foodForm"/>
            </Modal>
            <FormItem required={true} label="图片">
                {
                    getFieldDecorator('imgSrc',{
                        rules:[
                            {
                                required:true,
                                message:'请上传图片'
                            }
                        ],
                        initialValue:imgSrc
                    })(<FileUpload/>)
                }
            </FormItem>
            <FormItem required={true} label="商铺名称">
                {
                    getFieldDecorator('name',{
                        rules:[
                            {
                                required:true,
                                message:'请输入名称'
                            }
                        ],
                        initialValue:name
                    })(<Input placeholder="输入名称" />)
                }
            </FormItem>
            <FormItem label="描述">
                {
                    getFieldDecorator('intro',{
                        initialValue:intro
                    })(<Input placeholder="输入描述说明" />)
                }
            </FormItem>
            <FormItem required={true} label="类型">
                {
                    getFieldDecorator('type',{
                        rules:[
                            {
                                required:true,
                                message:'请输入类型'
                            }
                        ],
                        initialValue:type
                    })(<Select>
                        {
                            typeData.map((item,i) => {
                                let {path,text} = item;
                                return <Option key={i} value={path.substr(1)}>{text}</Option>
                            })
                        }
                    </Select>)
                }
            </FormItem>
            <FormItem required={true} label="地址">
                {
                    getFieldDecorator('addr',{
                        rules:[
                            {
                                required:true,
                                message:'请输入地址'
                            }
                        ],
                        initialValue:addr
                    })(<Input placeholder="输入地址" />)
                }
            </FormItem>
            <FormItem required={true} label="起送价格">
                {
                    getFieldDecorator('qsPrice',{
                        rules:[
                            {
                                required:true,
                                message:'请输入起送价格'
                            }
                        ],
                        initialValue:qsPrice
                    })(<Input onKeyDown={onlyNumKeydown} />)
                }
            </FormItem>
            <FormItem label="配送费" required="true">
                {
                    getFieldDecorator('psPrice',{
                        required:true,
                        message:'请输入配送费',
                        initialValue:psPrice
                    })(<Input onKeyDown={onlyNumKeydown} />)
                }
            </FormItem>
            <div className="list-header">
                <span className="list-title">商品列表</span>
                <Button size="small" shape="circle" icon="plus" onClick={this.openFoodDialog.bind(this)}/>
            </div>
            <FoodTableView deleteFood={deleteFood} editFood={editFood} data={foodList} />
            <Button type="primary" htmlType="submit" size="large">提交</Button>
        </Form>
    }
    click(){
        let {data,form,submitShop} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                submitShop(wt.extend(data,values));
            }
        });
    }
    openFoodDialog(){
        this.setState({
            foodInputOpen:true
        });
    }
    closeFoodDialog(){
        this.setState({
            foodInputOpen:false
        });
    }
    addFood(){
        this.refs.foodForm.getForm().validateFields((err, values) => {
            if (!err) {
                this.props.editFood(values);
                this.closeFoodDialog();
            }
        });
    }
}

class FoodTableView extends Component{
    state = {
        // editIndex:0,
        columns:[
            {
                title: '',
                dataIndex: 'order',
                width: 40,
                render(value,row,index){
                    return index + 1;
                },
                align:'center'
            },
            {
                title: '图片',
                dataIndex: 'imgSrc',
                width: 60,
                render(value,row,index){
                    return <Img src={value}/>
                },
                align:'center'
            },
            {
                title: '名称',
                dataIndex: 'name',
                width: 100,
                align:'center',
                render:(value,row,index) => {
                    let isEditing = this.isEditing(index);
                    let {editData = {}} = this.state || {};
                    return isEditing ? <Input value={editData.name} onChange={this.inputChange.bind(this,'name')} defaultValue={value} /> : value;
                }
            },
            {
                title: '价格',
                dataIndex: 'price',
                width: 64,
                align:'center',
                render:(value,row,index) => {
                    let isEditing = this.isEditing(index);
                    let {editData = {}} = this.state || {};
                    return isEditing ? <Input onKeyDown={onlyNumKeydown} value={editData.price} onChange={this.inputChange.bind(this,'price')} defaultValue={value} /> : value;
                }
            },
            {
                title: '操作',
                dataIndex: 'op',
                render:(value,row,index) => {
                    let isEditing = this.isEditing(index);
                    return isEditing ?
                        <React.Fragment>
                            <Icon type="save" className="mgr5" title="保存" onClick={this.save.bind(this,row)} />
                            <Icon type="close" title="取消" onClick={this.cancel.bind(this)} />
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Icon type="form" className="mgr5" title="编辑" onClick={this.edit.bind(this,row,index)} />
                            <Icon type="delete" title="删除" onClick={this.deleteFood.bind(this,index)} />
                        </React.Fragment>
                        ;
                },
                align:'center'
            }
        ]
    };
    render(){
        let {columns} = this.state;
        let {data} = this.props;
        return <Table rowKey={data => data.id} bordered columns={columns} pagination={false} dataSource={data} />
    }
    isEditing(index){
        return this.state.editIndex === index;
    }
    edit(item,index){
        this.setState({
            editIndex:index,
            editData:wt.clone(item)
        });
    }
    save(){
        this.props.editFood(this.state.editData);
        this.cancel();
    }
    cancel(){
        this.setState({
            editIndex:null
        });
    }
    deleteFood(index){
        this.props.deleteFood(index);
    }
    inputChange(field,e){
        let value = e.target.value;
        this.setState({
            editData:{
                ...this.state.editData,
                [field]:value
            }
        });
    }
}

const FormView = Form.create()(Box);

export default connect((state) => wt.extend({
    typeData:state.homeData.menuData
},state.inputData),actions)(InputPage)

