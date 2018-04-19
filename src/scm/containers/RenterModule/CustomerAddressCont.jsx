import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import CustomerAct from '../../actions/RenterModule/CustomerAct';
import SupplierAddressComp from '../../components/RenterModule/SupplierAddressComp';
import AddCustomerAddressCont from '../../dialogconts/RenterModule/AddCustomerAddressCont';
import EditCustomerAddressCont from '../../dialogconts/RenterModule/EditCustomerAddressCont';

class CustomerAddressCont extends Component {
    constructor(props) {
        super(props);
        this.searchPm = { bpCode: props.customerBaseSource.customerCode, page: 1, pageSize: 10 };
    }
    
    tablePaging = (page) => {
        let { addressTabLoading, AddressList } = this.props;
        if (!addressTabLoading){
            if (typeof page === "number") {
                this.searchPm.page = page;
            } else {
                this.searchPm = { ...this.searchPm, ...page};
            } 
            // console.log(this.searchPm)
            AddressList(this.searchPm)
                
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.customerBaseSource.customerCode != this.props.customerBaseSource.customerCode) {
            this.searchPm = { bpCode: nextProps.customerBaseSource.customerCode, page: 1, pageSize: 10 };
            this.tablePaging();
        }
    }
    onClear = () => {
        this.searchPm = { ...this.searchPm, page: 1, pageSize: 10 };
        this.tablePaging();
    }
    render() {
        let bpCode = this.props.customerBaseSource.customerCode,
            companyUscc = this.props.customerBaseSource.scmBp.uscc,
            langCode = this.props.customerBaseSource.scmBp.langCode;
        return(
            <div className="supplierAddress-content" style={{marginTop:10}}>
                <SupplierAddressComp {...this.props}
                    tablePaging={this.tablePaging}
                    onClear={this.onClear}
                />   
                <AddCustomerAddressCont
                    tablePaging={this.onClear}
                    bpCode={bpCode}
                    companyUscc={companyUscc}
                    langCode={langCode}
                />
                <EditCustomerAddressCont
                    tablePaging={this.onClear}
                    bpCode={bpCode}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => state.CustomerAddressRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    AddAddressVisiable: () => { dispatch(CustomerAct.AddAddressVisiable(true)); },
    EditAddressVisiable: (id,langCode) => { dispatch(CustomerAct.EditAddressVisiable(true, id, langCode)); },
    AddressList: (pm) => dispatch(CustomerAct.AddressList(pm)),
    AddressDisable: (addressCode, bpCode, langCode, status) => dispatch(CustomerAct.AddressDisable({ addressCode, bpCode, langCode, status }))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddressCont);