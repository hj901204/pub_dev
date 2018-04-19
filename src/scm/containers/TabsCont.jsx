import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Button, Breadcrumb, Modal } from '../../base/components/AntdComp';
import { removeTabs } from '../../base/consts/Utils';
import TabsAct from '../actions/TabsAct';

import BusinessCont from './RenterModule/BusinessCont';
import BusinessPartnerCont from './RenterModule/BusinessPartnerCont';
import SupplierCont from './RenterModule/SupplierCont';
import CustomerCont from './RenterModule/CustomerCont';
import AddSupplierCont from '../dialogconts/RenterModule/AddSupplierCont';
import EditSupplierCont from '../dialogconts/RenterModule/EditSupplierCont';
import AddCustomerCont from '../dialogconts/RenterModule/AddCustomerCont';
import EditCustomerCont from '../dialogconts/RenterModule/EditCustomerCont';
import SupplierViewCont from './RenterModule/SupplierViewCont';
import CustomerViewCont from './RenterModule/CustomerViewCont';


import AddPurchaseCont from './OrderModule/AddPurchaseCont';
import EditPurchaseCont from './OrderModule/EditPurchaseCont';
//新增生产订单
import AddProductionCont from '../dialogconts/OrderModule/AddProductionCont';
//编辑生产订单
import EditProductionCont from '../dialogconts/OrderModule/EditProductionCont';
//新增生产领料订单
import AddProducRecCont from '../dialogconts/OrderModule/AddProducRecCont';
//编辑生产领料订单
import EditProducRecCont from '../dialogconts/OrderModule/EditProducRecCont';
//新增生产退料订单
import AddProductionReturnCont from '../dialogconts/OrderModule/AddProductionReturnCont';
import EditProductionReturnCont from '../dialogconts/OrderModule/EditProductionReturnCont';

import PurchaseCont from './OrderModule/PurchaseCont';
import PurchaseReturnCont from './OrderModule/PurchaseReturnCont';
import AddPurchaseReturnComp from '../components/OrderModule/AddPurchaseReturnComp';
import PurchaseViewCont from './OrderModule/PurchaseViewCont';
import PurRetViewCont from './OrderModule/PurchaseReturnViewCont';
import PurchasePriceCont from './OrderModule/PurchasePriceCont';
import AddPurchasePriceCont from './OrderModule/AddPurchasePriceCont';
import EditPurchasePriceCont from './OrderModule/EditPurchasePriceCont';
import PurchasePriceViewCont from './OrderModule/PurchasePriceViewCont';

import ProductionCont from './OrderModule/ProductionCont';
import ProductionReceiveCont from './OrderModule/ProductionReceiveCont';
import ProductionReturnCont from './OrderModule/ProductionReturnCont';
import ProductionViewCont from "./OrderModule/ProductionViewCont";
import ProductionReceiveViewCont from "./OrderModule/ProductionReceiveViewCont";
import ProductionReturnViewCont from "./OrderModule/ProductionReturnViewCont";
import AddPurRetCont from './OrderModule/AddPurRetCont'; //采购退货单新增
import EditPurRetCont from './OrderModule/EditPurRetCont'; //采购退货单新增

//物料
import MaterialCont from './MaterialModule/MaterialCont';
import AddMaterialCont from './MaterialModule/AddMaterialCont';
import EditMaterialCont from './MaterialModule/EditMaterialCont';
import MaterialViewCont from './MaterialModule/MaterialViewCont';

//Bom数据
import BomListCont from './BomModule/BomListCont';
import BomAddCont from './BomModule/BomAddCont';
import BomEditCont from './BomModule/BomEditCont';
import BomDetailCont from './BomModule/BomDetailCont';
import BomCopyCont from './BomModule/BomCopyCont';
import BomUpgradeCont from './BomModule/BomUpgradeCont';

//销售订单
import SaleOrderListCont from './SaleModule/SaleOrderListCont';
import SaleOrderAddCont from './SaleModule/SaleOrderAddCont';
import SaleOrderEditCont from './SaleModule/SaleOrderEditCont';
import SaleOrderDetailCont from './SaleModule/SaleOrderDetailCont';
//销售退货单
import SaleReturnListCont from  './SaleModule/SaleReturnListCont';
import SaleReturnAddCont from './SaleModule/SaleReturnAddCont';
import SaleReturnDetailCont from './SaleModule/SaleReturnDetailCont';
import SaleReturnEditCont from './SaleModule/SaleReturnEditCont';
//销售价格单
import SalePriceListCont from  './SaleModule/SalePriceListCont';
import SalePriceAddCont from './SaleModule/SalePriceAddCont';
import SalePriceDetailCont from './SaleModule/SalePriceDetailCont';
import SalePriceEditCont from './SaleModule/SalePriceEditCont';















//---------------------库存 start -----------------------------

import SaleCarryOutCont from './InventoryModule/SaleCarryOutCont'
import PurchaseListCont from './InventoryModule/PurchaseListCont'
import AddPurchaseListCont from './InventoryModule/AddPurchaseListCont'
import StorageCont from "./InventoryModule/StorageCont"
import PurchaseEidtCont from './InventoryModule/PurchaseEidtCont'
import SalesStoreHouseCont from './InventoryModule/SalesStoreHouseCont'
import NewSalesStoreHouseCont from './InventoryModule/NewSalesStoreHouseCont'
import InstantInventoryCont from './InventoryModule/InstantInventoryCont'
import InventoryBreakdownCont from './InventoryModule/InventoryBreakdownCont'
import SalesOutboundDetailsCont from './InventoryModule/SalesOutboundDetailsCont'
import ReceiptDetailsCont from './InventoryModule/ReceiptDetailsCont'

import SalesReturnStoreCont from './InventoryModule/SalesReturnStoreCont'
import SalesReturnListCont from './InventoryModule/SalesReturnListCont'
import SalesReturnDetailsCont from './InventoryModule/SalesReturnDetailsCont'
import AddReturnSalesListCont from './InventoryModule/AddReturnSalesListCont'
import ReturnMaterialCont from './InventoryModule/ReturnMaterialCont'
import NewPurchaseReturnCont from './InventoryModule/NewPurchaseReturnCont'
import PurchaseReturnOutboundDetailsCont from './InventoryModule/PurchaseReturnOutboundDetailsCont'
import ProductionIssueCont from './InventoryModule/ProductionIssueCont'
import ProductionIssueOutboundDetailsCont from './InventoryModule/ProductionIssueOutboundDetailsCont'
import NewProductionIssueCont from './InventoryModule/NewProductionIssueCont'
import ProductionListCont from './InventoryModule/ProductionListCont'
import ProductionDetailsCont from './InventoryModule/ProductionDetailsCont'

import WareHousingCont from './InventoryModule/WareHousingCont'
import WareHousingDetailsCont from './InventoryModule/WareHousingDetailsCont'
import AddWareHousingCont from './InventoryModule/AddWareHousingCont'

import ProductionStorageCont from './InventoryModule/ProductionStorageCont'
import PurchaseReturnOutCarryOutCont from './InventoryModule/PurchaseReturnOutCarryOutCont'
import ProductionSendMaterialCarryOutCont from './InventoryModule/ProductionSendMaterialCarryOutCont'
import AddInventoryProductionCont from './InventoryModule/AddInventoryProductionCont'
import PurchaseReturnHouseCont from './InventoryModule/PurchaseReturnCont'

import OtherWarehouseCarryOutCont from './InventoryModule/OtherWarehouseCarryOutCont'
import OtherWareHousePageCont from './InventoryModule/OtherWareHousePageCont'
import OtherWareHousePageDetailsCont from './InventoryModule/OtherWareHousePageDetailsCont'
import AddOtherWareHousePageCont from './InventoryModule/AddOtherWareHousePageCont'


import OtherOutboundOrderCont from './InventoryModule/OtherOutboundOrderCont'
import OtherOutboundOrderAddCont from './InventoryModule/OtherOutboundOrderAddCont';
import OtherOutboundOrderEditCont from './InventoryModule/OtherOutboundOrderEditCont';
import OtherWarehouseEditCont from './InventoryModule/OtherWarehouseEditCont'
import OtherOutboundOrderCarryOutCont from './InventoryModule/OtherOutboundOrderCarryOutCont'
import OtherOutboundOrderDetailsCont from './InventoryModule/OtherOutboundOrderDetailsCont'
//---------------------库存 end -----------------------------

//重名
/*import AddProductionCont from './InventoryModule/AddProductionCont'
import PurchaseReturnCont from './InventoryModule/PurchaseReturnCont'*/



const confirm = Modal.confirm;


const TabPane = Tabs.TabPane;
class TabsCont extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            visiable: false,
        }
    }
    onEdit = (targetKey, action) => {
        let closeConfirmTabs = [];
        for (let [k, v] of Object.entries(this.props.tabsData)) {
            if (v.closeConfirm == true) {
                closeConfirmTabs.push(k)
            }
        }
        let remove = () => this[action](targetKey);
        if (closeConfirmTabs.includes(targetKey)) {
            confirm({
                title: '关闭标签页',
                content: '即将离开编辑页面，请确认是否取消已修改的内容？',
                onOk() {
                    remove();
                },
            });
        } else remove();
    }
    remove = (targetKey) => {
        removeTabs(targetKey,this.props);
    }
    getContent = (tab) => {
        switch (tab.key) {
            case "customer":
                return <CustomerCont />
                break;
            case "supplier":
                return <SupplierCont />
                break;
            case 'business':
                return <BusinessCont />
                break;
            case "businessPartner":
                return <BusinessPartnerCont />
                break;
            case "AddSupplier":
                return <AddSupplierCont />
                break;
            case "EditSupplier":
                return <EditSupplierCont />
                break;
            case "AddCustomer":
                return <AddCustomerCont />
                break;
            case "EditCustomer":
                return <EditCustomerCont />
                break;
            case "supplierViewCont":
                return <SupplierViewCont />
                break;
            case "customerViewCont":
                return <CustomerViewCont />
                break;

            case "addPurchase":
                return <AddPurchaseCont />
                break;
            case "editPurchase":
                return <EditPurchaseCont />
                break;
            case "addPurchaseReturn":
                return <AddPurchaseReturnComp />
                break;
            case 'addProductionCont':
                return <AddProductionCont />
                break;
            case 'addInventoryProductionCont':
                return <AddInventoryProductionCont />
                break;
            case 'editProductionCont':
                return <EditProductionCont />
                break;
            case 'addProducRec':
                return <AddProducRecCont />
                break;
            case 'editProducRec':
                return <EditProducRecCont />
                break;
            // case 'addProOrderRet':
            //     return <AddProOrderRetCont />
            //     break;
            case "purchase":
                return <PurchaseCont />
                break;

            case "purchasereturn":
                return <PurchaseReturnCont />
                break;
            case "addPurRet":
                return <AddPurRetCont />
                break;
            case "editPurRet":
                return <EditPurRetCont />
                break;
            case "purchaseViewCont":
                return <PurchaseViewCont />
                break;
            case "purRetViewCont":
                return <PurRetViewCont />
                break;
            case "purchasePrice":
                return <PurchasePriceCont />
                break; 
            case "addPurchasePrice":
                return <AddPurchasePriceCont />
                break;
            case "editPurchasePrice":
                return <EditPurchasePriceCont />
                break;
            case "purchasePriceView":
                return <PurchasePriceViewCont />
                break;
            case "production":
                return <ProductionCont />
                break;
            case "productionReceive":
                return <ProductionReceiveCont />
                break;
            case "productionReturn":
                return <ProductionReturnCont />
                break;
            case "addProductionReturnCont":
                return <AddProductionReturnCont />
                break;
            case "editProductionReturnCont":
                return <EditProductionReturnCont />
            case "productionViewCont":
                return <ProductionViewCont />
                break;
            case "productionReceiveViewCont":
                return <ProductionReceiveViewCont />
                break;
            case "productionReturnViewCont":
                return <ProductionReturnViewCont />
            case "material":
                return <MaterialCont />
                break;
            case "materialAdd":
                return <AddMaterialCont />
                break;
            case "materialEdit":
                return <EditMaterialCont />
                break;
            case "materialView":
                return <MaterialViewCont />
                break;
            case "bomList":
                return <BomListCont/>
                break;
            case "bomAdd":
                return <BomAddCont/>
                break;
            case 'bomEdit':
                return <BomEditCont/>
                break;
            case 'bomDetail':
                return <BomDetailCont/>
                break;
            case 'bomCopy':
                return <BomCopyCont/>
                break;
            case 'bomUpgrade':
                return <BomUpgradeCont />
                break;
            case 'saleOrderList':
                return <SaleOrderListCont />
                break;
            case 'saleOrderAdd':
                return <SaleOrderAddCont/>
                break;
            case 'saleOrderDetail':
                return <SaleOrderDetailCont/>
                break;
            case 'saleOrderEdit':
                return <SaleOrderEditCont/>
                break;
            case "saleReturnList":
                return <SaleReturnListCont />
                break;
            case "saleReturnAdd":
                return <SaleReturnAddCont />
                break;
            case 'saleReturnEdit':
                return <SaleReturnEditCont/>
                break;
            case 'saleReturnDetail':
                return <SaleReturnDetailCont/>
                 break;
            case "salePriceList":
                return <SalePriceListCont />
                break;
            case "salePriceAdd":
                return <SalePriceAddCont />
                break;
            case 'salePriceEdit':
                return <SalePriceEditCont/>
                break;
            case 'salePriceDetail':
                return <SalePriceDetailCont/>
                break;

            case 'inventoryOtherWarehouseCarryOutCont':
                return <OtherWarehouseCarryOutCont />
                break;
            case 'inventoryOtherWareHousePageDetailsCont':  // 其他入库单-详情
                return <OtherWareHousePageDetailsCont />
                 break;
            case 'inventoryAddOtherWareHousePageCont':   // 其他入库单-新增
                return <AddOtherWareHousePageCont />
                break;
            case 'inventoryOtherWareHousePageCont':   // 其他入库单
                return <OtherWareHousePageCont />
                break;





























                //---------------------库存 start -----------------------------

            case "inventorySaleCarryOut": //销售出库单执行
                return <SaleCarryOutCont/>;
            case "inventoryStorage":     //仓位
                return <StorageCont />;
            case "inventoryPurchaseListCont":    //采购入库单
                return <PurchaseListCont />;
            case "inventoryAddPurchaseListCont":     //新建采购入库单
                return <AddPurchaseListCont />;
            case "inventoryPurchaseEidt":    //采购入库库执行
                return <PurchaseEidtCont />;
            case "inventorySalesStoreHouse":     //销售出库单
                return <SalesStoreHouseCont />;
            case "inventoryNewSalesStoreHouse":  //新建销售出库单
                return <NewSalesStoreHouseCont />;
            case "inventoryInstantInventory":    //即时库存
                return <InstantInventoryCont />;
            case "inventoryInventoryBreakdown":  //库存明细账
                return <InventoryBreakdownCont />;
            case "inventorySalesOutboundDetails":    //销售出库单详情
                return <SalesOutboundDetailsCont />;
            case "inventoryReceiptDetailsCont":  //采购入库单详情
                return <ReceiptDetailsCont />;
            case "inventorySalesReturnStoreCont":    //销售退货入库单执行
                return <SalesReturnStoreCont />;
            case "inventorySalesReturnListCont":     //销售退货入库单
                return <SalesReturnListCont />;
            case "inventorySalesReturnDetailsCont":  //销售退货入库单详情
                return <SalesReturnDetailsCont />;
            case "inventoryAddReturnSalesListCont":  //新建销售退货入库单
                return <AddReturnSalesListCont />;
            case "inventoryPurchaseReturnHouse":      //采购退货出库单
                return <PurchaseReturnHouseCont />;
            case "inventoryReturnMaterialCont":  //生产退料单执行
                return <ReturnMaterialCont />;
            case "inventoryNewPurchaseReturn":   //新建采购退货出库单
                return <NewPurchaseReturnCont />;
            case "inventoryPurchaseReturnOutboundDetails":   //采购退货出库单详情
                return <PurchaseReturnOutboundDetailsCont />;
            case "inventoryProductionIssue":     //生产发料单
                return <ProductionIssueCont />;
            case "inventoryProductionIssueOutboundDetails":  //生产发料单详情页面
                return <ProductionIssueOutboundDetailsCont />;
            case "inventoryNewProductionIssue":      //新建生产发料单
                return <NewProductionIssueCont />;
            case "inventoryProductionListCont":  //生产退料单
                return <ProductionListCont />;
            case "inventoryProductionDetailsCont":   //生产退料单详情
                return <ProductionDetailsCont />;
           case "inventoryAddInventoryProductionCont":   //新建生产退料单
                return <AddInventoryProductionCont />;
            case "inventoryWareHousingCont":     //生产入库单
                return <WareHousingCont />;
            case "inventoryWareHousingDetailsCont":  //生产入库单详情
                return <WareHousingDetailsCont />;
            case "inventoryAddWareHousingCont":  //新建生产入库单
                return <AddWareHousingCont />;
            case "inventoryProductionStorageCont":   //生产入库单执行
                return <ProductionStorageCont />;
            case "inventoryPurchaseReturnOutCarryOut":   //采购退货出库单执行
                return <PurchaseReturnOutCarryOutCont />;
            case "inventoryProductionSendMaterialCarryOut":  //生产发料单执行
                return <ProductionSendMaterialCarryOutCont />;
            case "inventoryOtherWarehouseEditCont":  // 其他入库单 编辑
                return <OtherWarehouseEditCont/>



            case "inventoryOtherOutbound":
                return <OtherOutboundOrderCont />;    //其他出库单
            case "inventoryOtherOutboundOrderCarryOut": //其它出库单执行
                return <OtherOutboundOrderCarryOutCont />;
            case "inventoryOtherOutboundOrderDetails":    //其他出库单详情
                return <OtherOutboundOrderDetailsCont />



            case "inventoryOtherOutboundAdd": //其他出库单新增
                return <OtherOutboundOrderAddCont />;
            case "inventoryOtherOutboundEdit": //编辑其他出库单据
                return <OtherOutboundOrderEditCont />;
                //---------------------库存 end -----------------------------




            default:
                return null;
        }
    }
    render() {
        const { tabs, activeKey, tabChange,tabsData } = this.props;
        let _breadcrums = undefined;
        if (activeKey) {
            _breadcrums = tabsData[activeKey] ? tabsData[activeKey].breadcrum : undefined;
        }
        return (
            <div>
                <div className="ew-breadcrumb">
                    {/*<div className="breadcrum-inner">*/}
                        {/*<Breadcrumb separator=">">*/}
                            {/*<Breadcrumb.Item>你所在的位置</Breadcrumb.Item>*/}
                            {/*{*/}
                                {/*_breadcrums != undefined ? _breadcrums.map((item, index) => {*/}
                                    {/*return (<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)*/}
                                {/*}) : null*/}
                            {/*}*/}
                        {/*</Breadcrumb>*/}
                    {/*</div>*/}
                </div>
                <div className="ew-tabs">
                    <Tabs
                        animated={false}
                        hideAdd
                        onChange={tabChange}
                        activeKey={activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            tabs.map(pane =>
                                <TabPane tab={pane.title} key={pane.key}>
                                    {this.getContent(pane)}
                                </TabPane>
                            )
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state.TabsRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    tabChange: (activeKey) => {
        dispatch(TabsAct.TabChange(activeKey));
    },
    tabRemove: (key, activeKey) => {
        dispatch(TabsAct.TabRemove(key, activeKey));
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(TabsCont);