import React,{Component} from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import MaterialAct from '../../actions/MaterialModule/MaterialAct';
import EditMaterialComp from '../../components/MaterialModule/EditMaterialComp';
import TabsAct from '../../actions/TabsAct';

class EditMaterialCont extends Component{
    constructor(props, context) {
        super(props, context);
        //this.param={mgrPm:{"empName":"","pageSize":"10"},deptNamePm:{"conditions":[]},addPm:{"isReg": "0","isMag": "1","isRep": "1","isSog": "1","isBil": "1","isOfe": "0","isVisible": "1"}}
        
    }
    // initData = () =>{
    //     const { geteditdata, getSelectData, departmentId, handleCancel } = this.props;
    //     if (departmentId) {
    //         geteditdata(departmentId).then(json=>{
    //             if(json.status === "2000"){
    //                 this.param={
    //                     ...this.param,
    //                     mgrPm:{
    //                         ...this.param.mgrPm,
    //                         empName:this.props.Record.deptMgr
    //                     },
    //                 }
    //                 getSelectData(this.param);
    //             }
    //         });
    //     }
    // }
    
    handleSubmit = (data) => {
        const { loading, handleSubmit, handleCancel, getEditData, Record,tabAdd, tabRemove,materialLoading,showComponentMsg } = this.props;
        
        // if (loading) {
        //     return
        // }
        handleSubmit(data).then(json => {
            if (json.status == "2000") {
                getEditData(Record.materialCode);
                this.props.tabAdd();
                this.props.tabRemove();
                showComponentMsg(false);
                materialLoading(false);
                message.success("编辑物料成功");
            }
        }); 
    }

    render() {
         const { visible, materialLoading } = this.props;
        return (
                <EditMaterialComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    loading={materialLoading}
                   // initData={this.initData}
                />
        );
    }
}

EditMaterialCont.defaultProps = {
    title: "编辑物料",
    width: 800,
}

const mapStateToProps = (state) => {
    return state.MaterialRedu.toJS();
}
const mapDispatchToProps = (dispatch, ownProps) => ({
     materialLoading: (pm)=>{dispatch(MaterialAct.materialLoading(pm))},
     showComponentMsg: (pm)=>{dispatch(MaterialAct.showCompMsg(pm))},
     getEditData:(materialCode)=>dispatch(MaterialAct.getSupplierData({materialCode},"detail")),
     //getEmployeesList:(pm)=>dispatch(SupplierAct.getEmpList({pm})),
     handleSubmit: (data) => { return dispatch(MaterialAct.EditMaterial(data)) },
     tabAdd: () => {
        dispatch(TabsAct.TabAdd({
            title:"物料详情",
            key:"materialView"
        }));
    },
    tabRemove: () =>{
        dispatch(TabsAct.TabRemove("materialEdit","materialView"));
    }
})


export default connect(mapStateToProps,mapDispatchToProps)(EditMaterialCont);