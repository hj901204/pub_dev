import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductionStorageTopAct from '../../actions/InventoryModule/ProductionStorageTopAct'
import ProductionStorageOrderInfoTableComp from '../../components/InventoryModule/ProductionStorageOrderInfoTableComp'   // 订单信息表格
import ProductionStorageGoodsTableComp from '../../components/InventoryModule/ProductionStorageGoodsTableComp'  // 预收货信息表格
import { Tabs } from '../../../base/components/AntdComp';

const TabPane = Tabs.TabPane;

class ProductionStorageTableTabCont extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback} animated={false}>
                <TabPane tab="订单信息" key="1">
                    <ProductionStorageOrderInfoTableComp {...this.props} />
                </TabPane>
                <TabPane tab="预收货信息" key="2">
                    <ProductionStorageGoodsTableComp {...this.props} />
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.ProductionStorageTableTabRedu.toJS()
})

const mapDispatchToProps = (dispatch, getState) => ({
    onDelete: (index, id) => dispatch(ProductionStorageTopAct.onDelete(index, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductionStorageTableTabCont)