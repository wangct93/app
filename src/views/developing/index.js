/**
 * Created by Administrator on 2018/5/7.
 */
import './index.less';
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {HashRouter, NavLink, Switch, Route, Redirect, Link} from 'react-router-dom';

import Header from '../header';
import {Form,Input,Icon,Button} from 'antd';

import wt from 'wt-butil';

const {TextArea} = Input;
const {Item:FormItem} = Form;


class View extends Component{
    render(){
        let {editAddr,addr} = this.props;
        return <div className="page-flex dev-container">
            <Header>地址</Header>
            <div className="body">
                <FormView addr={addr} editAddr={editAddr} />
            </div>
        </div>
    }
}


export default connect(state => ({
    addr:state.userData.info.addr
}),{
    editAddr(addr){
        return {
            type:'editUserInfo',
            data:{
                addr
            }
        }
    }
})(View);


class FormBase extends Component{
    render(){
        let {editAddr,addr,form} = this.props;
        let {getFieldDecorator} = form;
        return <Form onSubmit={this.submit.bind(this)}>
            <FormItem>
                {getFieldDecorator('addr',{
                    rules:[
                        {
                            required:true,
                            message:'请输入地址'
                        }
                    ],
                    initialValue:addr
                })(
                    <TextArea size="large" prefix={<Icon type="user" />} placeholder="请输入地址" />
                )}
            </FormItem>
            <Button size="large" type="primary" htmlType="submit">修改</Button>
        </Form>
    }
    submit(e){
        e.preventDefault();
        let {editAddr,form} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                editAddr(values.addr);
            }
        });
    }
}

const FormView = Form.create()(FormBase);