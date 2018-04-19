import React,{Component} from "react";
import { Modal, message, Tabs } from "../../../base/components/AntdComp";
import ModalComp from '../../../base/components/ModalComp';
import EditSupplierAddressComp from '../../components/RenterModule/EditSupplierAddressComp';
import SupplierAct from '../../actions/RenterModule/SupplierAct';
import { connect } from 'react-redux';

class EditSupplierAddressCont extends ModalComp {
    constructor(props, context) {
        super(props, context);
        
    }
    
    getFooter = () => { };
    initData = () =>{
        let {loading, AddressDetail, addressId, handleCancel, bpCode, langCode } = this.props;
        let pm = {bpCode:bpCode, langCode:langCode, addressCode:addressId};
        if (!loading && addressId) {
            AddressDetail(pm).then(json => {
                if (json.status === 2000) {
                    let data = json.data;
                } else if (json.status === 4352) {
                    message.warn('获取地址详情失败!');
                    handleCancel();
                };
            });
        }
    } 
    handleSubmit = (data) => {
        let { handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                tablePaging();
            };
        });
    }
    getComp = () => {
        
        let { visible } = this.props;
        return (
            visible ?
                <div className="supplierAddress-content">
                    <EditSupplierAddressComp
                        {...this.props}
                        onOK={this.handleSubmit}
                        initData={this.initData}  
                    />
                </div>
                 : null 
        )
    }  
    
}

EditSupplierAddressCont.defaultProps={
    title: '编辑地址',
    width: 800,
    className: 'chooseaddress',
    maskClosable: true,
}
const mapStateToProps = (state) => ({
    visible: state.SupplierAddressRedu.get('edit_address_visiable'),
    loading: state.SupplierAddressRedu.get('addressLoading'),
    detail: state.SupplierAddressRedu.get('detail'),
    addressId: state.SupplierAddressRedu.get('addressId'),
    langCode: state.SupplierAddressRedu.get('langCode'),
})

const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(SupplierAct.EditAddressVisiable(false)) },
    handleSubmit: (data) =>  dispatch(SupplierAct.EditAddress(data)) ,
    AddressDetail: (pm) =>  dispatch(SupplierAct.AddressDetail(pm)) ,
})

export default connect(mapStateToProps,mapDispatchToProps)(EditSupplierAddressCont);