import React, { Component } from 'react'
import { connect } from 'react-redux'
import OtherWarehouseCarryOutAct from '../../actions/InventoryModule/OtherWarehouseCarryOutAct'
import OtherWarehouseCarryOutOrderinfoTableComp from '../../components/InventoryModule/OtherWarehouseCarryOutOrderinfoTableComp'
import OtherWarehouseCarryOutReceiveGoodsTableComp from '../../components/InventoryModule/OtherWarehouseCarryOutReceiveGoodsTableComp' 
import { Tabs } from '../../../base/components/AntdComp';

const TabPane = Tabs.TabPane;

class OtherWarehouseCarryOutTableCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback} animated={false}>
                <TabPane tab="订单信息" key="1">
                    <OtherWarehouseCarryOutOrderinfoTableComp {...this.props} />
                </TabPane>
                <TabPane tab="预收货信息" key="2">
                    <OtherWarehouseCarryOutReceiveGoodsTableComp {...this.props} />
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.OtherWarehouseCarryOutTableRedu.toJS()
})

const mapDispatchToProps = (dispatch, getState) => ({
    onDelete: (index, id) => dispatch(OtherWarehouseCarryOutAct.onDelete(index, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherWarehouseCarryOutTableCont)