import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from '../../../base/components/AntdComp';
import SupplierAct from '../../actions/RenterModule/SupplierAct';
import SupplierAddressComp from '../../components/RenterModule/SupplierAddressComp';
import AddSupplierAddressCont from '../../dialogconts/RenterModule/AddSupplierAddressCont';
import EditSupplierAddressCont from '../../dialogconts/RenterModule/EditSupplierAddressCont';

class SupplierAddressCont extends Component {
    constructor(props) {
        super(props);
        this.searchPm = { bpCode: props.supplierBaseSource.supplierCode, page: 1, pageSize: 10 };
    }
    
    tablePaging = (page) => {
        let { addressTabLoading, AddressList } = this.props;
        if (!addressTabLoading){
            if (typeof page === "number") {
                this.searchPm.page = page;
            } else {
                this.searchPm = { ...this.searchPm, ...page};
            } 
            AddressList(this.searchPm)
                
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.supplierBaseSource.supplierCode != this.props.supplierBaseSource.supplierCode) {
            this.searchPm = { bpCode: nextProps.supplierBaseSource.supplierCode, page: 1, pageSize: 10 };
            this.tablePaging();
        }
    }
    
    onClear = () => {
        this.searchPm = { ...this.searchPm, page: 1, pageSize: 10 };
        this.tablePaging();
    }
    render() {
        let bpCode = this.props.supplierBaseSource.supplierCode,
            companyUscc = this.props.supplierBaseSource.scmBp.uscc,
            langCode = this.props.supplierBaseSource.scmBp.langCode;
        return(
            <div className="supplierAddress-content" style={{marginTop:10}}>
                <SupplierAddressComp {...this.props}
                    tablePaging={this.tablePaging}
                    onClear={this.onClear}
                />   
                <AddSupplierAddressCont
                    tablePaging={this.onClear}
                    bpCode={bpCode}
                    companyUscc={companyUscc}
                    langCode={langCode}
                />
                <EditSupplierAddressCont
                    tablePaging={this.onClear}
                    bpCode={bpCode}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => state.SupplierAddressRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    AddAddressVisiable: () => { dispatch(SupplierAct.AddAddressVisiable(true)); },
    EditAddressVisiable: (id,langCode) => { dispatch(SupplierAct.EditAddressVisiable(true, id, langCode)); },
    AddressList: (pm) => dispatch(SupplierAct.AddressList(pm)),
    AddressDisable: (addressCode, bpCode, langCode, status) => dispatch(SupplierAct.AddressDisable({ addressCode, bpCode, langCode, status }))
})

export default connect(mapStateToProps, mapDispatchToProps)(SupplierAddressCont);