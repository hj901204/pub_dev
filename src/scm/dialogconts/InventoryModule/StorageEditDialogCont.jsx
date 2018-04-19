/**
 * Created by MW on 2017/5/3.
 */
import React,{Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Button,Form,message} from "antd";

import StorageAddDialogComp from "../../components/InventoryModule/StorageAddDialogComp";
import * as StorageEditDialogAct from "../../actions/InventoryModule/StorageEditDialogAct";


class StorageEditDialogCont extends StorageAddDialogComp {
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
                        message.success('编辑成功!');
                        this.props.submitCallback && this.props.submitCallback(json);
                    }
                    this.props.actions.hide();
                    this.props.actions.setLoading(false);
                });
            }
        });
    }
}

StorageEditDialogCont.defaultProps = {
    dataSource: {},
    actions: {},
    submitCallback:()=>{},
    title:"编辑仓位",
}


let  mapStateToProps = (state)=>{
    return state.StorageEditDialogRedu.toJS()
};
let mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(StorageEditDialogAct,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(StorageEditDialogCont));
