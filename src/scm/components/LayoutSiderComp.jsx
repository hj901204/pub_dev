import React,{Component} from "react";
import { connect } from "react-redux";
import TabsAct from '../actions/TabsAct';
import { Menu, Icon } from '../../base/components/AntdComp';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LayoutSider extends Component{
    constructor(prop){
        super(prop);
    }
    handleClick =(e)=>{
        this.props.tabAdd(e);
    }
    render(){
        const {mode} = this.props;
        if(this.props.openKeys.length>0)
        return (
            <Menu 
                defaultOpenKeys={this.props.openKeys}
                selectedKeys={[this.props.activeKey]}
                inlineIndent={18}
                onClick={this.handleClick}
                mode={mode}>
                <SubMenu key="inventoryManage" title={<span><Icon type="setting" /><span className="nav-text">库存管理</span></span>}>
                    {/*--------------------库存 start------------------*/}
                    <SubMenu key="inventorySettings" title={<span><span className="nav-text">基础设置</span></span>}>
                        <Menu.Item key="inventoryStorage" title="仓位">仓位</Menu.Item>
                    </SubMenu>
                    <SubMenu key="inventorySearch" title={<span><span className="nav-text">库存查询</span></span>}>
                        <Menu.Item key="inventoryInstantInventory" title="即时库存">即时库存</Menu.Item>
                        <Menu.Item key="inventoryInventoryBreakdown" title="库存明细账">库存明细账</Menu.Item>
                    </SubMenu>
                    <SubMenu key="inventoryPurchase" title={<span><span className="nav-text">入库管理</span></span>}>
                        <Menu.Item key="inventoryPurchaseListCont" title="采购入库单">采购入库单</Menu.Item>
                        <Menu.Item key="inventorySalesReturnListCont" title="销售退货入库单">销售退货入库单</Menu.Item>
                        <Menu.Item key="inventoryProductionListCont" title="生产退料单">生产退料单</Menu.Item>
                        <Menu.Item key="inventoryWareHousingCont" title="生产入库单">生产入库单</Menu.Item>
                        {/*<Menu.Item key="inventoryOtherWarehouseCarryOutCont" title="其他入库单执行">其他入库单执行</Menu.Item>*/}
                        <Menu.Item key="inventoryOtherWareHousePageCont" title="其他入库单">其他入库单</Menu.Item>
                        {/*<Menu.Item key="inventoryOtherWarehouseEditCont" title="其他入库单编辑">其他入库单编辑</Menu.Item>*/}
                    </SubMenu>
                    <SubMenu key="inventoryOutbound" title={<span><span className="nav-text">出库管理</span></span>}>
                        <Menu.Item key="inventorySalesStoreHouse" title="销售出库单">销售出库单</Menu.Item>
                        <Menu.Item key="inventoryPurchaseReturnHouse" title="采购退货出库单">采购退货出库单</Menu.Item>
                        <Menu.Item key="inventoryProductionIssue" title="生产发料单">生产发料单</Menu.Item>
                        {/*<Menu.Item key="allocatingOutbound" title="调拨出库单">调拨出库单</Menu.Item>*/}
                        <Menu.Item key="inventoryOtherOutbound" title="其他出库单">其他出库单</Menu.Item>
                    </SubMenu>
                    {/*--------------------库存 end------------------*/}
                </SubMenu>

                <SubMenu key="purchaseManage" title={<span><Icon type="setting" /><span className="nav-text">采购管理</span></span>}>
                    <Menu.Item key="supplier" title="供应商">供应商</Menu.Item>
                    <Menu.Item key="purchase" title="采购订单">采购订单</Menu.Item>
                    <Menu.Item key="purchasereturn" title="采购退货单">采购退货单</Menu.Item>
                    <Menu.Item key="purchasePrice" title="采购价格清单">采购价格清单</Menu.Item>
                </SubMenu>
                <SubMenu key="saleManage" title={<span><Icon type="setting" /><span className="nav-text">销售管理</span></span>}>
                    <Menu.Item key="customer" title="客户">客户</Menu.Item>
                    <Menu.Item key="saleOrderList" title="销售订单">销售订单</Menu.Item>
                    <Menu.Item key="saleReturnList" title="销售退货单">销售退货单</Menu.Item>
                    <Menu.Item key="salePriceList" title="销售价格清单">销售价格清单</Menu.Item>
                </SubMenu>
                <SubMenu key="proManage" title={<span><Icon type="setting" /><span className="nav-text">生产管理</span></span>}>
                    <Menu.Item key="production" title="生产订单">生产订单</Menu.Item>
                    <Menu.Item key="productionReceive" title="生产领料申请单">生产领料申请单</Menu.Item>
                    <Menu.Item key="productionReturn" title="生产退料申请单">生产退料申请单</Menu.Item>
                </SubMenu>
                <SubMenu key="baseData" title={<span><Icon type="mail" /><span className="nav-text">主数据</span></span>}>
                    <Menu.Item key="material" title="物料">物料</Menu.Item>
                    <Menu.Item key="business" title="商业伙伴">商业伙伴</Menu.Item>
                    <Menu.Item key="bomList" title="BOM">BOM</Menu.Item>
                </SubMenu>
            </Menu>
        )
        else return (<span></span>);
    }
}
const mapStateToProps = (state) => {
    return state.TabsRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    tabAdd:(e) => {
        dispatch(TabsAct.TabAdd({
            title:e.item.props.title,
            key:e.key
        }));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(LayoutSider);