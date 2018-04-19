import React,{Component} from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import CustomerAct from '../../actions/RenterModule/CustomerAct';
import TabsAct from '../../actions/TabsAct';
import EditCustomerComp from '../../components/RenterModule/EditCustomerComp';

class EditCustomerCont extends Component{
    constructor(props, context) {
        super(props, context);
        this.param={mgrPm:{"empName":"","pageSize":"10"},deptNamePm:{"conditions":[]},addPm:{"isReg": "0","isMag": "1","isRep": "1","isSog": "1","isBil": "1","isOfe": "0","isVisible": "1"}}
        
    }
    initData = () =>{
        const { geteditdata, getSelectData, departmentId, handleCancel } = this.props;
        if (departmentId) {
            geteditdata(departmentId).then(json=>{
                if(json.status == "2000"){
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
        const { loading, handleSubmit, handleCancel, getEditData, Record,customerloading,showComponentMsg,tabRemove,CustomerList } = this.props;
        // if (loading) {
        //     return
        // }
        handleSubmit(data).then(json => {
            if (json.status == "2000") {
                tabRemove(this.props.Ppage);
                if(this.props.Ppage=='customer'){
                    CustomerList({"page":1,"pageSize":10});
                } else {
                    CustomerList({"page":1,"pageSize":10});
                    getEditData({"customerCode":data.customerCode,"langCode":data.scmBp.langCode},'detail');
                }
                showComponentMsg(false);
                customerloading(false);
                
            } else {
                customerloading(false);
            };
        });
    }

    render() {
        const { visible, customerLoading } = this.props;
        return (
                <EditCustomerComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    loading={customerLoading}
                    initData={this.initData}
                />
        );
    }
}

EditCustomerCont.defaultProps = {
    title: "编辑客户",
    width: 800,
    type:"edit"
}

const mapStateToProps = (state) => {
    return state.CustomerRedu.toJS();
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    CustomerList: (pm) => dispatch(CustomerAct.CustomerList(pm)),
    customerloading: (pm)=>{dispatch(CustomerAct.customerLoading(pm))},
    showComponentMsg: (pm)=>{dispatch(CustomerAct.showCompMsg(pm))},
    getEditData:(pm,type)=>dispatch(CustomerAct.getCustomerData(pm,type)),
    getEmployeesList:(pm)=>dispatch(CustomerAct.getEmpList(pm)),
    handleSubmit: (data) => { return dispatch(CustomerAct.EditCustomer(data)) },
    getSubjectList:(pm)=>{dispatch(CustomerAct.getSearchInitData(pm))},
    getBusinessPartnerData:(pm)=>dispatch(CustomerAct.getBusinessPartnerData(pm)),
    getCurrencyList:(pm)=>dispatch(CustomerAct.getCurList(pm)),
    getSubjectList:(pm)=>{dispatch(CustomerAct.getSearchInitData(pm))},
    getBusinessPartnerDetail:(pm)=>{dispatch(CustomerAct.getBusinessPartnerDetail(pm))},
    tabRemove: (Pgage) =>{
        dispatch(TabsAct.TabRemove("EditCustomer",Pgage));
    },
    bpSearchData:(data)=>{dispatch(CustomerAct.bpSearchData(data))},
    getDept:(pm)=>dispatch(CustomerAct.getDeptData(pm)),
})


export default connect(mapStateToProps,mapDispatchToProps)(EditCustomerCont);
