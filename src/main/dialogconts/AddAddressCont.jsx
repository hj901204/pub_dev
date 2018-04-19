import React, { Component } from "react";
import { Modal, message } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import AddressAct from '../actions/AddressAct';
import AddAddressComp from '../components/AddAddressComp';

class AddAddressCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging, isFetch, onOK, handleNewAddress,onAddress } = this.props;
        if (isFetch != false) {
            handleSubmit(data).then(json => {
                if (json.status === 2000) {
                    handleCancel();
                    handleNewAddress(json.data.addressCode);
                }
            });
        } else {
            onOK(data);
            handleCancel();
        }
    }
    render() {
        return (
            this.props.visible ?
                <AddAddressComp
                    {...this.props}
                    onOk={this.handleSubmit}
                />
                : null
        );
    }
}

AddAddressCont.defaultProps = {
    title: "新增地址",
    width: 766,
}

const mapStateToProps = (state) => ({
    visible: state.AddressRedu.get('add_address_visiable'),
    loading: state.AddressRedu.get('addressLoading'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(AddressAct.AddAddressVisiable(false)) },
    handleSubmit: (data) => { return dispatch(AddressAct.AddAddress(data)) },
})


export default connect(mapStateToProps, mapDispatchToProps)(AddAddressCont);
