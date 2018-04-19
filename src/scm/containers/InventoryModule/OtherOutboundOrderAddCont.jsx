/**
 * Created by MW on 2017/7/20.
 * 其它出库单container
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import OtherOutboundOrderAddEditFormComp from '../../components/InventoryModule/OtherOutboundOrderAddEditFormComp';
import * as  OtherOutboundOrderAddAct from '../../actions/InventoryModule/OtherOutboundOrderAddAct';
import * as OtherOutAddRowDialogAct from "../../actions/InventoryModule/OtherOutAddRowDialogAct";
import OtherOutSearchMaterialDialogAct from '../../actions/InventoryModule/OtherOutAddSearchMaterialDialogAct';

import OtherOutAddSearchMaterialDialogCon from "../../dialogconts/InventoryModule/OtherOutAddSearchMaterialDialogCon";
import OtherOutboundOrderAddEditableTableComp from "../../components/InventoryModule/OtherOutboundOrderAddEditableTableComp";

import TabsAct from "../../actions/TabsAct";
import OtherOutboundOrderAct from '../../actions/InventoryModule/OtherOutboundOrderAct';
import {Spin,message,Form} from '../../../base/components/AntdComp';



import OtherOutAddRowDialogCont from "../../dialogconts/InventoryModule/OtherOutAddRowDialogCont";


const OtherOutboundOrderEditFormComp = Form.create()(OtherOutboundOrderAddEditFormComp);

class OtherOutboundOrderAddCont extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsType:null,
            currentSelect:{},
        }
    }


    handlerSubmit=(values)=>{
        this.props.actions.setLoading(true);
        this.props.actions.addSubmit(values).then((json)=>{
            if(json.status === 2000){
                message.success("新建成功");
                this.props.dispatch(TabsAct.TabRemove("inventoryOtherOutboundAdd","inventoryOtherOutbound"));
                this.props.dispatch(OtherOutboundOrderAct.getList());
            }
            this.props.actions.setLoading(false);
        });
    }
    handlerBackClick=()=>{
        this.props.dispatch(TabsAct.TabRemove("inventoryOtherOutboundAdd","inventoryOtherOutbound"));
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
        this.props.dispatch(OtherOutAddRowDialogAct.show(newRow));
    }
    handlerEditRow = (record,index)=>{
        this.setState({
            actionsType:"edit",
        });
        record._index =  index;
        this.props.dispatch(OtherOutAddRowDialogAct.show(record));
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19},
        };
        return (
            <div>
                <OtherOutAddSearchMaterialDialogCon   actions={this.props.actions} currentSelect={this.state.currentSelect} />
                <Spin spinning={this.props.loading}>
                    <div className="other-out">
                        <OtherOutboundOrderEditFormComp {...this.props} title="新建其他出库单据" onSubmit={this.handlerSubmit} onBackClick={this.handlerBackClick}/>


                        <OtherOutboundOrderAddEditableTableComp {...this.props}   addRow={this.handlerAddRow}  editRow={this.handlerEditRow}/>

                    </div>
                </Spin>
                <OtherOutAddRowDialogCont title="新增行" actionsType={this.state.actionsType} handleAddSubmitCallBack={this.handleAddSubmitCallBack}  handleEditSubmitCallBack ={this.handleEditSubmitCallBack}/>
            </div>
        )
    }
}



let mapStateToProps = (state) => {
    return state.OtherOutboundOrderAddRedu.toJS()
};
let mapDispatchToProps = (dispatch) => ({
    dispatch,
    actions: bindActionCreators(OtherOutboundOrderAddAct, dispatch)
});

//OtherOutAddRowDialogAct
export default connect(mapStateToProps, mapDispatchToProps)(OtherOutboundOrderAddCont);

