import React, { Component } from 'react'
import { connect } from 'react-redux'
import SalesReturnStoreEidtTopAct from '../../actions/InventoryModule/SalesReturnStoreEidtTopAct'
import SalesReturnOrderInfoTableComp from '../../components/InventoryModule/SalesReturnOrderInfoTableComp'   // 订单信息表格
import SalesReturnReceiveGoodsTableComp from '../../components/InventoryModule/SalesReturnReceiveGoodsTableComp'  // 预收货信息表格
import { Tabs } from '../../../base/components/AntdComp';

const TabPane = Tabs.TabPane;

class SalesReturnStoreTableTabCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback} animated={false}>
                <TabPane tab="订单信息" key="1">
                    <SalesReturnOrderInfoTableComp {...this.props} />
                </TabPane>
                <TabPane tab="预收货信息" key="2">
                    <SalesReturnReceiveGoodsTableComp {...this.props} />
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.SalesReturnStoreTableTabRedu.toJS()
})

const mapDispatchToProps = (dispatch, getState) => ({
    onDelete: (index, id) => dispatch(SalesReturnStoreEidtTopAct.onDelete(index, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SalesReturnStoreTableTabCont)