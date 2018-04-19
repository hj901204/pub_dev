import React, { Component } from "react";
import { connect } from 'react-redux';
import AddressAct from '../actions/AddressAct';

import AddAddressComp from '../components/AddAddressComp';

class EditAddressComp extends AddAddressComp {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }

}

class EditAddressCont extends Component {
    constructor(props, context) {
        super(props, context);

    }
    initData = () => {
        const { addressLoading, AddressDetail,AddressCompanyDetail, addressId,tenantCode, handleCancel } = this.props;
        if (!addressLoading && addressId&&!tenantCode) {
            AddressDetail(addressId).then(json => {
                if (json.status === 4352) {
                    handleCancel(null);
                };
            });
        }else if(!addressLoading && addressId &&tenantCode ){
            AddressCompanyDetail(addressId,tenantCode).then(json => {
                if (json.status === 4352) {
                    handleCancel(null);
                };
            });
        }
    }
    handleSubmit = (data) => {
        const { handleSubmit, tablePaging,isFetch,handleCancel,editAddress } = this.props;
        if (isFetch != false) {
            handleSubmit(data).then(json => {
                if (json.status === 2000) {
                    handleCancel(null);
                    tablePaging();
                };
            });
        }else{
            editAddress(data);
            handleCancel();
        }
    }
    render() {
        const { edit_address_visiable, addressLoading } = this.props;
        return (
            edit_address_visiable ?
                <EditAddressComp
                    {...this.props}
                    visible={edit_address_visiable}
                    loading={addressLoading}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                />
                : null
        );
    }
}

EditAddressCont.defaultProps = {
    title: "编辑地址",
    width: 766,
}

const mapStateToProps = (state) => state.AddressRedu.toJS();
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: (id) => { dispatch(AddressAct.EditAddressVisiable(false, id)) },
    handleSubmit: (data) => dispatch(AddressAct.EditAddress(data)),
    AddressDetail: (addressCode) => dispatch(AddressAct.AddressDetail({ addressCode })),
    AddressCompanyDetail: (addressCode,tenantCode) => dispatch(AddressAct.AddressCompanyDetail({ addressCode,tenantCode })),
})


export default connect(mapStateToProps, mapDispatchToProps)(EditAddressCont);
