/**
 * Created by Administrator on 2018/5/11.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';
import Header from "../header/index";
import {Form,Input,Icon,Button,Checkbox,Modal} from 'antd';

const FormItem = Form.Item;

import * as actions from '@/store/user/action';
import LoadingBox from '@/components/loadingBox';


class LoginBox extends Component{
    render(){
        let {loadingLogin,alertInfo,login,clearAlerInfo} = this.props;
        return <div className="page-flex login-container">
            <Header>登录</Header>
            <div className="body">
                <LoadingBox show={loadingLogin} message="登录中......"/>
                <FormView login={login} />
                <Modal title="提示" visible={!!alertInfo} footer={<Button onClick={() => {
                    clearAlerInfo();
                }}>确定</Button>}>{alertInfo}</Modal>
            </div>
        </div>
    }
}

class Box extends Component{
    render(){
        let {getFieldDecorator} = this.props.form;
        let {yzmTimeout = 0} = this.state || {};
        return <Form onSubmit={this.click.bind(this)}>
            <FormItem>
                {getFieldDecorator('tel',{
                    rules:[
                        {
                            required:true,
                            message:'请输入手机号'
                        }
                    ]
                })(
                    <Input size="large" prefix={<Icon type="user" />} placeholder="输入手机号" />
                )}
            </FormItem>
            <FormItem required={true}>
                {getFieldDecorator('yzm',{
                    rules:[
                        {
                            required:true,
                            message:'请输入验证码'
                        }
                    ]
                })(
                    <Input size="large" addonAfter={<Button onClick={this.sendYzm.bind(this)} disabled={yzmTimeout} size="large">{yzmTimeout ? `已发送（${yzmTimeout}）` : '发送验证码'}</Button>} prefix={<Icon type="key" />} placeholder="输入验证码" />
                )}
            </FormItem>
            <Button size="large" type="primary" htmlType="submit">登录</Button>
        </Form>
    }
    click(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values);
            }
        });
    }
    sendYzm(){
        this.setState({
            yzmTimeout:60
        });
        let timer = setInterval(() => {
            let {yzmTimeout} = this.state || {};
            yzmTimeout--;
            this.setState({
                yzmTimeout
            });
            if(yzmTimeout === 0){
                clearInterval(timer);
            }
        },1000);
    }
}

const FormView = Form.create()(Box);

export default connect((state) => state.userData,actions)(LoginBox)