/**
 * Created by MW on 2017/5/3.
 */

import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button,Form,message} from "antd";


import StorageAddDialogComp from "../../components/InventoryModule/StorageAddDialogComp";
import * as StorageAddDialogAct from "../../actions/InventoryModule/StorageAddDialogAct";


class StorageAddDialogCont extends StorageAddDialogComp {
    handleCancel=(e)=>{
        e.preventDefault();
        if (!this.props.loading) {
            this.props.actions.hide && this.props.actions.hide();
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.actions.setLoading(true);
                this.props.actions.submit && this.props.actions.submit(values).then((json)=>{
                    if(json.data && json.status === 2000){
                        message.success('新建成功!');
                    }

                    this.props.actions.hide();
                    this.props.actions.setLoading(false);

                    this.props.submitCallback && this.props.submitCallback(json);
                });

            }
        });
    }

    handleSubmitNext=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.actions.setLoading(true);
                this.props.actions.submit && this.props.actions.submit(values).then((json)=>{
                    if(json.data && json.status === 2000){
                        message.success('新建成功请继续新建!');
                    }

                    this.props.form.resetFields();

                    this.props.actions.setLoading(true);
                    this.props.actions.fetchEnumSiteCode().then(()=>{
                        this.props.actions.setLoading(false);
                    });
                    this.props.submitCallback && this.props.submitCallback(json);
                });
            }
        });
    }
    getFooter = () => ([
        <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
        <Button key="submit" type="primary" size="large" loading={this.props.loading} onClick={this.handleSubmit}>保存并关闭</Button>,
        <Button key="submitNext" type="primary" size="large" loading={this.props.loading} onClick={this.handleSubmitNext}>保存并录入下一条</Button>
    ])
}

StorageAddDialogCont.defaultProps = {
    title:"新建仓位",
    submitCallback:()=>{},
    dataSource: {},
    actions: {},
}


let  mapStateToProps = (state)=>{
    return state.StorageAddDialogRedu.toJS();
};
let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(StorageAddDialogAct,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(StorageAddDialogCont));
