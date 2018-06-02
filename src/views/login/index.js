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

import {alert} from '@/store/alert/action';
import * as actions from '@/store/user/action';
import Loading from '@util/components/loading';


class LoginBox extends Component{
    render(){
        let {loadingLogin,alert,login} = this.props;
        return <div className="page-flex login-container">
            <Header back={false}>登录</Header>
            <div className="body">
                <Loading show={loadingLogin} message="登录中......"/>
                <FormView alert={alert} login={login} />
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
                {getFieldDecorator('name',{
                    rules:[
                        {
                            required:true,
                            message:'请输入用户名'
                        }
                    ]
                })(
                    <Input size="large" prefix={<Icon type="user" />} placeholder="输入用户名（admin）" />
                )}
            </FormItem>
            <FormItem required={true}>
                {getFieldDecorator('pwd',{
                    rules:[
                        {
                            required:true,
                            message:'请输入验证码'
                        }
                    ]
                })(
                    <Input size="large" addonAfter={<Button onClick={this.sendYzm.bind(this)} disabled={yzmTimeout} size="large">{yzmTimeout ? `已发送（${yzmTimeout}）` : '发送验证码'}</Button>} prefix={<Icon type="key" />} placeholder="输入验证码（1234）" />
                )}
            </FormItem>
            <Button size="large" type="primary" htmlType="submit">登录</Button>
        </Form>
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    click(e){
        e.preventDefault();
        let {yzmTimeout = 1} = this.state || {};
        if(yzmTimeout){
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    this.props.login(values);
                }
            });
        }else{
            Modal.warning({
                title:'提示',
                content:'请发送验证码！'
            });
        }
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

        this.timer = timer;
    }
    componentDidMount(){
        // this.props.login({
        //     name:'user001',
        //     pwd:'1234'
        // });
    }
}

const FormView = Form.create()(Box);

export default connect((state) => state.userData,actions)(LoginBox)