import React, { Component } from "react";
import { Modal, message, Tabs, Button, Popconfirm } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import CustomerAct from '../../actions/RenterModule/CustomerAct';
import MTable from '../../../base/components/TableComp';
import CustomerContactCont from '../../containers/RenterModule/CustomerContactCont';
import CustomerAddressCont from '../../containers/RenterModule/CustomerAddressCont';
const { TabPane } = Tabs;

class CustomerTabsComp extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let { customerBaseSource, tabLoading, ...props } = this.props;
        return (
            <div>
                <Tabs className="supplierTabs" >
                    <TabPane tab="联系人" key="1">
                        <CustomerContactCont />
                    </TabPane>
                    <TabPane tab="地址" key="2">
                        <CustomerAddressCont customerBaseSource={customerBaseSource}/>
                    </TabPane>
                </Tabs>
            </div>

        );
    }

}

const mapStateToProps = (state) => {
    return state.CustomerRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({
   
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTabsComp);

