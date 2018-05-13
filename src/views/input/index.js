/**
 * Created by Administrator on 2018/5/11.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import Header from "../header/index";
import {Form,Input,Icon,Button,Checkbox,Select} from 'antd';

const FormItem = Form.Item;




class InputPage extends Component{
    render(){
        return <div className="page-flex input-container">
            <Header>商铺录入</Header>
            <div className="body">
                <FormView />
            </div>
        </div>
    }
}


class Box extends Component{
    render(){
        let FormItemOpt = {
            labelCol:{
                span:4,
                offset:2
            },
            wrapperCol:{
                span:16
            }
        };
        let {onlyNum} = this;
        let {getFieldDecorator} = this.props.form;
        return <Form onSubmit={this.click.bind(this)}>
            <FormItem required={true} label="商铺名称" {...FormItemOpt}>
                {
                    getFieldDecorator('name',{
                        rules:[
                            {
                                required:true,
                                message:'请输入名称'
                            }
                        ]
                    })(<Input placeholder="输入名称" />)
                }
            </FormItem>
            <FormItem required={true} label="类型" {...FormItemOpt}>
                {
                    getFieldDecorator('addr',{
                        rules:[
                            {
                                required:true
                            }
                        ]
                    })(<Input placeholder="输入地址" />)
                }
            </FormItem>
            <FormItem required={true} label="地址" {...FormItemOpt}>
                {
                    getFieldDecorator('addr',{
                        rules:[
                            {
                                required:true
                            }
                        ]
                    })(<Input placeholder="输入地址" />)
                }
            </FormItem>
            <FormItem required={true} label="起送价格" {...FormItemOpt}>
                {
                    getFieldDecorator('qsPrice',{
                        rules:[
                            {
                                required:true
                            }
                        ]
                    })(<Input onKeyDown={onlyNum} />)
                }
            </FormItem>
            <FormItem label="配送费" {...FormItemOpt}>
                {
                    getFieldDecorator('psPrice')(<Input onKeyDown={onlyNum} />)
                }
            </FormItem>
            <Button type="primary" htmlType="submit">登录</Button>
        </Form>
    }
    click(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    onlyNum(e){
        let keyCode = e.keyCode;
        let filters = [8,13,37,39];
        if(keyCode > 47 && keyCode < 58 || keyCode > 95 && keyCode < 106 || filters.indexOf(keyCode) !== -1){

        }else{
            e.preventDefault();
        }
    }
}

const FormView = Form.create()(Box);

export default connect((state) => state.inputData)(InputPage)