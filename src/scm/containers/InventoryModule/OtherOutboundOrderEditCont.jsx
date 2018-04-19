/**
 * Created by MW on 2017/7/20.
 * 其它出库单container
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import OtherOutboundOrderAddEditFormComp from '../../components/InventoryModule/OtherOutboundOrderAddEditFormComp';
import * as  OtherOutboundOrderEditAct from '../../actions/InventoryModule/OtherOutboundOrderEditAct';
import * as OtherOutEditRowDialogAct from "../../actions/InventoryModule/OtherOutEditRowDialogAct";
import OtherOutEditSearchMaterialDialogAct from '../../actions/InventoryModule/OtherOutEditSearchMaterialDialogAct';

import OtherOutEditSearchMaterialDialogCon from "../../dialogconts/InventoryModule/OtherOutEditSearchMaterialDialogCon";
import OtherOutboundOrderAddEditableTableComp from "../../components/InventoryModule/OtherOutboundOrderAddEditableTableComp";
import TabsAct from "../../actions/TabsAct";
import OtherOutboundOrderAct from '../../actions/InventoryModule/OtherOutboundOrderAct';

import {Spin, Form,message } from '../../../base/components/AntdComp';

import OtherOutEditRowDialogCont from "../../dialogconts/InventoryModule/OtherOutEditRowDialogCont";

const OtherOutboundOrderEditAbleTableComp = Form.create()(OtherOutboundOrderAddEditableTableComp);

const OtherOutboundOrderEditFormComp = Form.create()(OtherOutboundOrderAddEditFormComp);



class OtherOutboundOrderEditCont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsType:null,
            currentSelect:{},
        }
    }
    componentWillMount() {

    }
    handlerMaterialCodeRowClick=(e,text, record, index)=>{
        this.props.dispatch(OtherOutEditSearchMaterialDialogAct.show());
        this.setState({
            currentSelect:{
                text, record, index
            }
        })

    }

    handlerSubmit=(values)=>{
        this.props.actions.setLoading(true);
        this.props.actions.editSubmit(values).then((json)=>{
            if(json.status === 2000){
                message.success("编辑成功");
                this.props.dispatch(TabsAct.TabRemove("inventoryOtherOutboundEdit","inventoryOtherOutbound"));
                this.props.dispatch(OtherOutboundOrderAct.getList());
            }
            this.props.actions.setLoading(false);
        });
    }
    handlerBackClick=()=>{
        this.props.dispatch(TabsAct.TabRemove("inventoryOtherOutboundEdit","inventoryOtherOutbound"));
    }


    handleAddSubmitCallBack = (rowData)=>{
        this.props.actions.addRow(rowData);
    }

    handleEditSubmitCallBack=(rowData)=>{
        this.props.actions.editRow(rowData,rowData._index);

    }

    handlerAddRow = (newRow)=>{
        this.setState({
            actionsType:"add",
        });
        this.props.dispatch(OtherOutEditRowDialogAct.show(newRow));
    }
    handlerEditRow = (record,index)=>{
        this.setState({
            actionsType:"edit",
        });
        record._index =  index;
        this.props.dispatch(OtherOutEditRowDialogAct.show(record));
    }



    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        return (
            <div>
                <OtherOutEditSearchMaterialDialogCon   actions={this.props.actions} currentSelect={this.state.currentSelect}  />
                <Spin spinning={this.props.loading}>
                    <div className="other-out">
                        <OtherOutboundOrderEditFormComp {...this.props} title="其他出库单据编辑" onSubmit={this.handlerSubmit} onBackClick={this.handlerBackClick}/>
                        <OtherOutboundOrderAddEditableTableComp {...this.props}   addRow={this.handlerAddRow}  editRow={this.handlerEditRow}/>
                    </div>
                </Spin>
                <OtherOutEditRowDialogCont title="新增行" actionsType={this.state.actionsType} handleAddSubmitCallBack={this.handleAddSubmitCallBack}  handleEditSubmitCallBack ={this.handleEditSubmitCallBack}/>
            </div>
        )
    }
}


let OtherOutboundOrderEditFromCont = Form.create()(OtherOutboundOrderEditCont);


let mapStateToProps = (state) => {
    return state.OtherOutboundOrderEditRedu.toJS()
};
let mapDispatchToProps = (dispatch) => ({
    dispatch,
    actions: bindActionCreators(OtherOutboundOrderEditAct, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(OtherOutboundOrderEditFromCont);

