import React, { Component, PropTypes } from "react";
import {Form, Spin, Button,Col,Row,Upload } from '../../base/components/AntdComp.js';
import FormModalComp from '../../base/components/FormModalComp';
import { Urls } from '../../base/consts/Urls';
const FormItem = Form.Item;

class ImportViewComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state={
            importFile:{
                fileKey:"",
                page:1,
                pageSize:10
            }
        }
        this.files = {  
            name: 'file',
            action: "http://10.99.2.70:9097/employees/importview",//Urls.IMPORT_VIEW,
            headers: {
                authorization: 'authorization-text',
            },
            onChange:this.handleChange,
        }
    }
    handleChange = (info) => {
       if(info.file.status=="done"){
            this.setState({
                importFile:{
                    ...this.state.importFile,
                    fileKey: info.file.response.data.fileKey,
                }
            })
       }
        
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onOk && this.props.onOk(this.state.importFile);
    }
    getComp = () => {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div className="upload-dialog" >
                <div className="dialog-inner">
                    <Row className="upload-form">
                            <Col span={3} className="upload-label">
                                <label>选择文件</label>
                            </Col>
                            <Col span={10} className="upload-btn">
                                <Upload {...this.files}>
                                    <Button type="upload" className="upload-through">浏 览</Button>
                                </Upload>
                            </Col>
                            <Col span={9} className="upload-text upload-text-width">
                                <div className="text-box"><span className="ant-form-text">(仅支持xis格式，文件最大10M)</span></div>
                            </Col>
                            <Col span={3} className="upload-text"><a href="#">下载模板</a></Col>
                        </Row>
                    <div className="upload-tip">
                        <h3 className="tip-title">温馨提示：为了不耽误您的时间，请先查看以下注意事项</h3>
                        <div className="tip-item">1.姓名,手机必填项</div>
                        <div className="tip-item-two">2.导入部门必须填写完整的路径，用"/"隔开：例如“市场部/市场一部”</div>
                    </div>
                </div>
            </div>
        )
        
    }
}

ImportViewComp.defaultProps={
    title: '导入员工',
    okText: '导入',
    width: 739,
    maskClosable: true,
    
}
export default Form.create()(ImportViewComp);
