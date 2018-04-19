import React,{Component} from "react";
import { connect } from 'react-redux';
import { Modal, message } from "../../../base/components/AntdComp";
import MaterialAct from '../../actions/MaterialModule/MaterialAct';
import AddMaterialComp from '../../components/MaterialModule/AddMaterialComp';
import TabsAct from '../../actions/TabsAct';

class AddMaterialCont extends Component{
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        const { dispatch,loading, handleSubmit, tablePaging, getEditData, Record, getBusinessPartnerData, getCurrencyList, showComponentMsg, supplierloading,GetMaterialList} = this.props;
        // if (loading) {
        //     return;
        // }
        handleSubmit(data).then(json => {
            if (json.status == "2000") {
                this.props.getDetailData(json.data);
                dispatch(TabsAct.TabInsert("materialView"));
                dispatch(TabsAct.TabRemove("materialAdd","materialView"));
                //  getEditData(Record.materialCode);
                //  getBusinessPartnerData({
                //      "page": "1",
                //      "pageSize": "10"
                //  });
                 getCurrencyList({
                     "page": "1",
                     "pageSize": "10"
                 });
                 GetMaterialList({
                    "page": "1",
                    "pageSize": "10"
                });

                 showComponentMsg(false);
                 supplierloading(false);
                message.success("新建物料成功");
            } else {
                //message.error('新增物料失败!');
            };
        });
    }
   
    render() {
        const { add_supplier_visiable, supplierLoading } = this.props;
      
        return (
            <AddMaterialComp
                {...this.props}
                loading={supplierLoading}
                onOk={this.handleSubmit}
            />
        );
    }
}


AddMaterialCont.defaultProps = {
    title: "新建物料",
    width: 800,
}
const mapStateToProps = (state) => {
    return state.MaterialRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    supplierloading: (pm)=>{dispatch(MaterialAct.supplierLoading(pm))},
    showComponentMsg: (pm)=>{dispatch(MaterialAct.showCompMsg(pm))},
    getEditData:(pm)=>dispatch(MaterialAct.getSupplierData({pm})),
    getDetailData:(materialCode)=>dispatch(MaterialAct.getSupplierData({materialCode},"detail")),
    //getEmployeesList:(pm)=>dispatch(SupplierAct.getEmpList({pm})),
    //getBusinessPartnerData:(pm)=>dispatch(SupplierAct.getBusinessPartnerData(pm)),
    getCurrencyList:(pm,type)=>dispatch(MaterialAct.getCurList(pm,type)),
    GetMaterialList:(pm)=>dispatch(MaterialAct.MaterialList(pm)),
    handleSubmit: (data) => { return dispatch(MaterialAct.AddMaterial(data)) },
    // tabAdd: () => {
    //     dispatch(TabsAct.TabAdd({
    //         title:"物料编辑",
    //         key:"EditMaterial"
    //     }));
    // },
    // tabRemove: () =>{
    //     dispatch(TabsAct.TabRemove("AddMaterial","EditMaterial"));
    // }
   tabAdd: () => {
        dispatch(TabsAct.TabAdd({
            title:"物料详情",
            key:"materialView"
        }));
    },
    dispatch,

})


export default connect(mapStateToProps,mapDispatchToProps)(AddMaterialCont);
