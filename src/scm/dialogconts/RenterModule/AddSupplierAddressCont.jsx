import React,{Component} from "react";
import { Modal, message, Tabs } from "../../../base/components/AntdComp";
import ModalComp from '../../../base/components/ModalComp';
import CreateAddressComp from '../../components/RenterModule/CreateAddressComp';
import ChooseAddressComp from '../../components/RenterModule/ChooseAddressComp';
import SupplierAct from '../../actions/RenterModule/SupplierAct';
import { connect } from 'react-redux';

const TabPane = Tabs.TabPane;

class AddSupplierAddressCont extends ModalComp {
    constructor(props, context) {
        super(props, context);
        
    }
    handleSubmit = (data) => {
        const { handleCancel, handleSubmit,tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                tablePaging();
            }
        });
    }
    tablePaging = () => {
        let { tabLoading, ChooseAddressList, companyUscc } = this.props;
        if (!tabLoading){
            ChooseAddressList(companyUscc);  
        }
    }
    handleSave = (data) => {
        const { handleSave, handleCancel, tablePaging } = this.props;
        handleSave(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                tablePaging();
            }
        })
    }
    getFooter = () => { };
    getComp = () => {
        
        const { visible,bpCode } = this.props;
        return (
            visible ?
                <Tabs defaultActiveKey="createaddress">
                    <TabPane tab="自建" key="createaddress">
                        <div className="supplierAddress-content">
                            <CreateAddressComp
                                {...this.props}
                                onOK={this.handleSubmit}
                            />
                        </div>    
                    </TabPane>
                    <TabPane tab="选择" key="chooseaddress">
                        <div className="supplierAddress-content">
                            <ChooseAddressComp
                                {...this.props}
                                tablePaging={this.tablePaging}
                                handleSave={this.handleSave}
                            />
                        </div>    
                    </TabPane>
                </Tabs>  : null 
        )
    }  
    
}

AddSupplierAddressCont.defaultProps={
    title: '新建地址',
    width:800,
    className:'chooseaddress',
    maskClosable: true,
}
const mapStateToProps = (state) => ({
    visible: state.SupplierAddressRedu.get('add_address_visiable'),
    loading: state.SupplierAddressRedu.get('addressLoading'),
    refAddressLoading: state.SupplierAddressRedu.get('refAddressLoading'),
    refAddressDataSource: state.SupplierAddressRedu.get('refAddressDataSource'),
})

const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(SupplierAct.AddAddressVisiable(false)) },
    handleSubmit: (data) => { return dispatch(SupplierAct.CreateAddressAdd(data)) },
    ChooseAddressList: (companyUscc) => dispatch(SupplierAct.ChooseAddressList({ companyUscc })),
    handleSave: (data) => dispatch(SupplierAct.ChooseAddressAdd(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(AddSupplierAddressCont);