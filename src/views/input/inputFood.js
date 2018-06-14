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

import {onlyNumKeydown} from '@/computes/compute';
import {Img,Loading} from 'wt-reacts';
import wt from 'wt-butil';

import DefaultImg from '@/img/add_img.png';

const FormItem = Form.Item;
const {Option} = Select;


export class FileUpload extends Component{
    render(){
        let {value,defaultValue = DefaultImg} = this.props;
        let {value:selfValue = defaultValue} = this.state || {};
        value = wt.isUndefined(value) ? selfValue : value;
        return <div className="upload-box" onClick={this.click.bind(this)}>
            <input type="file" onChange={this.change.bind(this)} ref="file"  accept="image/jpeg,image/png" className="hide-i"/>
            <Img src={value}/>
        </div>
    }
    click(){
        this.refs.file.click();
    }
    change(e){
        let {files = []} = e.target;
        wt.forEach(files,file => {
            let reader = new FileReader;
            reader.onload = e => {
                let src = e.target.result;
                this.setState({
                    value:src
                });
                wt.execFunc(this.props.onChange,src);
            };
            reader.readAsDataURL(file);
        });
    }
}

class FormBase extends Component{
    render(){
        let {form,foodList = []} = this.props;
        let {getFieldDecorator} = form;
        let typeData = foodList.map(item => item.keywords).noRepeat();

        return <Form className="form-horizontal">
            <FormItem required={true} label="图片">
                {
                    getFieldDecorator('imgSrc',{
                        rules:[
                            {
                                required:true,
                                message:'请上传图片'
                            }
                        ]
                    })(<FileUpload />)
                }
            </FormItem>
            <FormItem required={true} label="名称">
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
            <FormItem label="描述">
                {
                    getFieldDecorator('intro',{
                    })(<Input placeholder="输入描述说明" />)
                }
            </FormItem>
            <FormItem required={true} label="关键词">
                {
                    getFieldDecorator('keywords',{
                        rules:[
                            {
                                required:true,
                                message:'输入关键词'
                            }
                        ]
                    })(<Select mode="combobox">
                        {
                            typeData.map((item,i) => {
                                return <Option key={i} value={item}>{item}</Option>
                            })
                        }
                    </Select>)
                }
            </FormItem>
            <FormItem required={true} label="售价">
                {
                    getFieldDecorator('price',{
                        rules:[
                            {
                                required:true,
                                message:'请输入售价'
                            }
                        ]
                    })(<Input onKeyDown={onlyNumKeydown} />)
                }
            </FormItem>
        </Form>
    }
}

export default Form.create()(FormBase);

