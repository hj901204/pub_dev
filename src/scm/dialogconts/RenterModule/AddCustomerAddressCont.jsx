import React,{Component} from "react";
import { Modal, message, Tabs } from "../../../base/components/AntdComp";
import ModalComp from '../../../base/components/ModalComp';
import CreateAddressComp from '../../components/RenterModule/CreateAddressComp';
import ChooseAddressComp from '../../components/RenterModule/ChooseAddressComp';
import CustomerAct from '../../actions/RenterModule/CustomerAct';
import { connect } from 'react-redux';

const TabPane = Tabs.TabPane;

class AddCustomerAddressCont extends ModalComp {
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
        let { refAddressLoading, ChooseAddressList, companyUscc } = this.props;
        if (!refAddressLoading){
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

AddCustomerAddressCont.defaultProps={
    title: '新建地址',
    okText: '确定',
    width: 800,
    className: 'chooseaddress',
    maskClosable: true,
}
const mapStateToProps = (state) => ({
    visible: state.CustomerAddressRedu.get('add_address_visiable'),
    loading: state.CustomerAddressRedu.get('addressLoading'),
    refAddressLoading: state.CustomerAddressRedu.get('refAddressLoading'),
    refAddressDataSource: state.CustomerAddressRedu.get('refAddressDataSource'),
})

const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(CustomerAct.AddAddressVisiable(false)) },
    handleSubmit: (data) => { return dispatch(CustomerAct.CreateAddressAdd(data)) },
    ChooseAddressList: (companyUscc) => dispatch(CustomerAct.ChooseAddressList({ companyUscc })),
    handleSave: (data) => dispatch(CustomerAct.ChooseAddressAdd(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(AddCustomerAddressCont);