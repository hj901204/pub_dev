import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import CustomerAct from '../../actions/RenterModule/CustomerAct';
import SupplierContactComp from '../../components/RenterModule/SupplierContactComp';


class CustomerContactCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            searchPm: {
                bpCode:props.supplierId,page: 1, pageSize: 10
            }
        };
    }
    tablePaging = (page) => {
        const { contactTabLoading, ContactList } = this.props;
        if (!contactTabLoading) {
            if (typeof page === "number") {
                this.state.searchPm.page = page;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...page };
            };
            ContactList(this.state.searchPm);
        }
    }
    render() {
        return (
            <div className="address-content">
                <SupplierContactComp
                    {...this.props}
                    tablePaging={this.tablePaging}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => state.CustomerRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    ContactList: (pm) => dispatch(CustomerAct.ContactList(pm)),
    ContactAddEdit: (pm) => dispatch(CustomerAct.ContactAddEdit(pm)),
    ContactStatus: (pm) => dispatch(CustomerAct.ContactStatus(pm)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerContactCont);
