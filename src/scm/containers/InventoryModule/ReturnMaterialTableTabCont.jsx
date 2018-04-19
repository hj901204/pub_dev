import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReturnMaterialTopAct from '../../actions/InventoryModule/ReturnMaterialTopAct'

import ReturnMaterialOrderInfoTableComp from '../../components/InventoryModule/ReturnMaterialOrderInfoTableComp'   // 订单信息表格
import ReturnMaterialReceiveGoodsTableComp from '../../components/InventoryModule/ReturnMaterialReceiveGoodsTableComp'  // 预收货信息表格

import { Tabs } from '../../../base/components/AntdComp';

const TabPane = Tabs.TabPane;

class ReturnMaterialTableTabCont extends Component {
    constructor(props, context) {
        super(props, context);
    }

    callback = (key) => {   // 切换事件
        //console.log(key)
    }

    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback} animated={false}>
                <TabPane tab="订单信息" key="1">
                    <ReturnMaterialOrderInfoTableComp {...this.props} />
                </TabPane>
                <TabPane tab="预收货信息" key="2">
                    <ReturnMaterialReceiveGoodsTableComp {...this.props} />
                </TabPane>
            </Tabs>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state.ReturnMaterialTableTabRedu.toJS()   // reducer 
})

const mapDispatchToProps = (dispatch, getState) => ({
    //actions: bindActionCreators(ReturnMaterialTopAct, dispatch)  
    onDelete: (index, id) => dispatch(ReturnMaterialTopAct.onDelete(index, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReturnMaterialTableTabCont)