/**
 * Created by Administrator on 2018/5/11.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import Header from "../header/index";
import {Form,Input,Icon,Button,Checkbox} from 'antd';

const FormItem = Form.Item;




class LoginBox extends Component{
    render(){
        return <div className="page-flex login-container">
            <Header>登录</Header>
            <div className="body">
                <FormView />
            </div>
        </div>
    }
}


class Box extends Component{
    render(){
        let {getFieldDecorator} = this.props.form;
        return <Form onSubmit={this.click.bind(this)}>
            <FormItem required={true}>
                {getFieldDecorator('tel',{
                    rules:[
                        {
                            required:true,
                            message:'请输入手机号'
                        }
                    ]
                })(
                    <Input prefix={<Icon type="user" />} placeholder="输入手机号" />
                )}
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
}

const FormView = Form.create()(Box);

export default connect((state) => state)(LoginBox)