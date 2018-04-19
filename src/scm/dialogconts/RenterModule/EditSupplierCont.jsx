import React,{Component} from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import SupplierAct from '../../actions/RenterModule/SupplierAct';
import EditSupplierComp from '../../components/RenterModule/EditSupplierComp';
import TabsAct from '../../actions/TabsAct';

class EditSupplierCont extends Component{
    constructor(props, context) {
        super(props, context);
        this.param={mgrPm:{"empName":"","pageSize":"10"},deptNamePm:{"conditions":[]},addPm:{"isReg": "0","isMag": "1","isRep": "1","isSog": "1","isBil": "1","isOfe": "0","isVisible": "1"}}
        
    }
    initData = () =>{
        const { geteditdata, getSelectData, departmentId, handleCancel } = this.props;
        if (departmentId) {
            geteditdata(departmentId).then(json=>{
                if(json.status === "2000"){
                    this.param={
                        ...this.param,
                        mgrPm:{
                            ...this.param.mgrPm,
                            empName:this.props.Record.deptMgr
                        },
                    }
                    getSelectData(this.param);
                }
            });
        }
    }
    
    handleSubmit = (data) => {
        const { loading, handleSubmit, handleCancel, getEditData, Record,supplierloading,showComponentMsg,tabRemove,SupplierList } = this.props;
        // if (loading) {
        //     return
        // }
        handleSubmit(data).then(json => {
            if (json.status == "2000") {
                tabRemove(this.props.Ppage);
                if(this.props.Ppage=='supplier'){
                    SupplierList({"page":1,"pageSize":10});
                } else {
                    SupplierList({"page":1,"pageSize":10});
                    getEditData({"supplierCode":Record.supplierCode,"langCode":Record.scmBp.langCode},'detail');
                }
                showComponentMsg(false);
                supplierloading(false);
                
            } else {
                // console.log('修改职务失败!');
            };
        });
    }

    render() {
        const { visible, supplierLoading } = this.props;
        return (
                <EditSupplierComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    loading={supplierLoading}
                    initData={this.initData}
                />
        );
    }
}

EditSupplierCont.defaultProps = {
    title: "编辑供应商",
    width: 800,
    type:'edit'
}

const mapStateToProps = (state) => {
    return state.SupplierRedu.toJS();
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    SupplierList: (pm) => dispatch(SupplierAct.SupplierList(pm)),
    supplierloading: (pm)=>{dispatch(SupplierAct.supplierLoading(pm))},
    showComponentMsg: (pm)=>{dispatch(SupplierAct.showCompMsg(pm))},
    getEditData:(pm,type)=>dispatch(SupplierAct.getSupplierData(pm,type)),
    getEmployeesList:(pm)=>dispatch(SupplierAct.getEmpList(pm)),
    handleSubmit: (data) => { return dispatch(SupplierAct.EditSupplier(data)) },
    getSubjectList:(pm)=>{dispatch(SupplierAct.getSearchInitData(pm))},
    getBusinessPartnerData:(pm)=>dispatch(SupplierAct.getBusinessPartnerData(pm)),
    getCurrencyList:(pm)=>dispatch(SupplierAct.getCurList(pm)),
    getBusinessPartnerDetail:(pm)=>{return dispatch(SupplierAct.getBusinessPartnerDetail(pm))},
    tabRemove: (Pgage) =>{
        dispatch(TabsAct.TabRemove("EditSupplier",Pgage));
    },
    bpSearchData: (data) => { dispatch(SupplierAct.bpSearchData(data)) },
    getDeptList: (pm) => { dispatch(SupplierAct.getDeptData(pm)) },
})


export default connect(mapStateToProps,mapDispatchToProps)(EditSupplierCont);
