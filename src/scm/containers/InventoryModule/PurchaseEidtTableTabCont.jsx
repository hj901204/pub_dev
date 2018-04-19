import React, { Component } from 'react'
import { connect } from 'react-redux'
import PurchaseEidtTopAct from '../../actions/InventoryModule/PurchaseEidtTopAct'
import OrderInfoTableComp from '../../components/InventoryModule/OrderInfoTableComp'   // 订单信息表格
import ReceiveGoodsTableComp from '../../components/InventoryModule/ReceiveGoodsTableComp'  // 预收货信息表格
import { Tabs } from '../../../base/components/AntdComp';

const TabPane = Tabs.TabPane;

class PurchaseEidtTableTabCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback} animated={false}>
                <TabPane tab="订单信息" key="1">
                    <OrderInfoTableComp {...this.props} />
                </TabPane>
                <TabPane tab="预收货信息" key="2">
                    <ReceiveGoodsTableComp {...this.props} />
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.PurchaseEidtTableTabRedu.toJS()
})

const mapDispatchToProps = (dispatch, getState) => ({
    onDelete: (index, id) => dispatch(PurchaseEidtTopAct.onDelete(index, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseEidtTableTabCont)