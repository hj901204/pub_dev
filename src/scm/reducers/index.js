import { combineReducers } from "redux"
import TabsRedu from './TabsRedu'
import PageLoadingRedu from './PageLoadingRedu'

import BusinessRedu from './RenterModule/BusinessRedu';
import CustomerRedu from './RenterModule/CustomerRedu';
import SupplierRedu from './RenterModule/SupplierRedu';
import SupplierAddressRedu from './RenterModule/SupplierAddressRedu';
import CustomerAddressRedu from './RenterModule/CustomerAddressRedu';

import PurchaseRedu from './OrderModule/PurchaseRedu';
import PurchaseReturnRedu from './OrderModule/PurchaseReturnRedu';
import ProductionRedu from './OrderModule/ProductionRedu';
import ProductionReturnRedu from './OrderModule/ProductionReturnRedu';
import ProductionReceiveRedu from './OrderModule/ProductionReceiveRedu';
import PurchasePriceRedu from './OrderModule/PurchasePriceRedu';

import LayoutTopRedu from '../../main/reducers/LayoutTopRedu';
//物料
import MaterialRedu from './MaterialModule/MaterialRedu';
//Bom
import BomRedu from './BomModule/BomRedu'
import BomAddTableRedu from './BomModule/BomAddTableRedu'
//销售订单、退货单
import SaleOrderRedu from './SaleModule/SaleOrderRedu'
import SaleReturnAddTableRedu from './SaleModule/SaleReturnAddTableRedu'
import SaleReturnRedu from './SaleModule/SaleReturnRedu'
//销售价格单
import SalePriceRedu from './SaleModule/SalePriceRedu'












       



























//库存----------------------start ------------------------

import PurchaseListRedu from './InventoryModule/PurchaseListRedu'
import AddPurchaseListRedu from './InventoryModule/AddPurchaseListRedu'
import SalesStoreHouseRedu from './InventoryModule/SalesStoreHouseRedu'
import NewSalesStoreHouseRedu from './InventoryModule/NewSalesStoreHouseRedu'
import SaleCarryOutRedu from './InventoryModule/SaleCarryOutRedu'
import InstantInventoryRedu from './InventoryModule/InstantInventoryRedu'
import InventoryBreakdownRedu from './InventoryModule/InventoryBreakdownRedu'
import PreReceiptOperationDialogRedu from './InventoryModule/PreReceiptOperationDialogRedu'
import PurchaseEidtTopRedu from './InventoryModule/PurchaseEidtTopRedu'
import PurchaseEidtTableTabRedu from './InventoryModule/PurchaseEidtTableTabRedu'

import SalesOutboundDetailsRedu from './InventoryModule/SalesOutboundDetailsRedu'
import ReceiptDetailsRedu from './InventoryModule/ReceiptDetailsRedu'
import PurchaseReturnHouseRedu from './InventoryModule/PurchaseReturnRedu'
import SalesReturnStoreEidtTopRedu from './InventoryModule/SalesReturnStoreEidtTopRedu'
import SalesReturnStoreTableTabRedu from './InventoryModule/SalesReturnStoreTableTabRedu'
import SalesReturnStoreDialogRedu from './InventoryModule/SalesReturnStoreDialogRedu'


import { StorageAddDialogRedu } from './InventoryModule/StorageAddDialogRedu';
import { StorageEditDialogRedu } from './InventoryModule/StorageEditDialogRedu';
import { OtherOutAddRowDialogRedu } from './InventoryModule/OtherOutAddRowDialogRedu';
import { OtherOutEditRowDialogRedu } from './InventoryModule/OtherOutEditRowDialogRedu';



import SalesReturnListRedu from './InventoryModule/SalesReturnListRedu'
import SalesReturnDetailsRedu from './InventoryModule/SalesReturnDetailsRedu'
import AddReturnSalesListRedu from './InventoryModule/AddReturnSalesListRedu'

import ReturnMaterialTopRedu from './InventoryModule/ReturnMaterialTopRedu'
import ReturnMaterialTableTabRedu from './InventoryModule/ReturnMaterialTableTabRedu'
import ReturnMaterialDialogRedu from './InventoryModule/ReturnMaterialDialogRedu'

import NewPurchaseReturnRedu from './InventoryModule/NewPurchaseReturnRedu'
import PurchaseReturnOutboundDetailsRedu from './InventoryModule/PurchaseReturnOutboundDetailsRedu'
import ProductionIssueRedu from './InventoryModule/ProductionIssueRedu'
import ProductionIssueOutboundDetailsRedu from './InventoryModule/ProductionIssueOutboundDetailsRedu'
import NewProductionIssueRedu from './InventoryModule/NewProductionIssueRedu'
import ProductionlistRedu from './InventoryModule/ProductionlistRedu'
import ProductionDetailsRedu from './InventoryModule/ProductionDetailsRedu'
import AddProductionRedu from './InventoryModule/AddProductionRedu';


import {StorageRedu} from  './InventoryModule/StorageRedu';
import ImportStorageRedu from  './InventoryModule/ImportStorageRedu';

import WareHousingRedu from './InventoryModule/WareHousingRedu'
import WareHousingDetailsRedu from './InventoryModule/WareHousingDetailsRedu'
import AddWareHousingRedu from './InventoryModule/AddWareHousingRedu'
import ProductionStorageTopRedu from './InventoryModule/ProductionStorageTopRedu'
import ProductionStorageTableTabRedu from './InventoryModule/ProductionStorageTableTabRedu'
import ProductionStorageOperationDialogRedu from './InventoryModule/ProductionStorageOperationDialogRedu'
import PurchaseReturnOutCarryOutRedu from './InventoryModule/PurchaseReturnOutCarryOutRedu'
import ProductionSendMaterialCarryOutRedu from './InventoryModule/ProductionSendMaterialCarryOutRedu'
import OtherWarehouseCarryOutRedu from './InventoryModule/OtherWarehouseCarryOutRedu'
import OtherWarehouseCarryOutTableRedu from './InventoryModule/OtherWarehouseCarryOutTableRedu'
import OtherWareHousePageRedu from './InventoryModule/OtherWareHousePageRedu'
import OtherWareHousePageDetailsRedu from './InventoryModule/OtherWareHousePageDetailsRedu'
import OtherWarehouseCarryOutDialogRedu from './InventoryModule/OtherWarehouseCarryOutDialogRedu'

import AddOtherWareHousePageRedu from './InventoryModule/AddOtherWareHousePageRedu'

import AddOtherWareHousePageDialogRedu from './InventoryModule/AddOtherWareHousePageDialogRedu'



import OtherOutboundOrderRedu from './InventoryModule/OtherOutboundOrderRedu'

import OtherOutboundOrderCarryOutRedu from './InventoryModule/OtherOutboundOrderCarryOutRedu'


import {OtherOutboundOrderAddRedu} from './InventoryModule/OtherOutboundOrderAddRedu';
import {OtherOutboundOrderEditRedu} from './InventoryModule/OtherOutboundOrderEditRedu';

import OtherOutAddSearchMaterialDialogRedu from './InventoryModule/OtherOutAddSearchMaterialDialogRedu';
import OtherOutEditSearchMaterialDialogRedu from './InventoryModule/OtherOutEditSearchMaterialDialogRedu';



import OtherWarehouseEditRedu from './InventoryModule/OtherWarehouseEditRedu'
import OtherWarehouseEditDialogRedu from './InventoryModule/OtherWarehouseEditDialogRedu'
import OtherOutboundOrderDetailsRedu from './InventoryModule/OtherOutboundOrderDetailsRedu'

//库存----------------------end ------------------------

























const rootReducer = combineReducers({
    PageLoadingRedu,
	TabsRedu,
    PurchaseRedu,
    PurchaseReturnRedu,
    ProductionRedu,
    ProductionReturnRedu,
    ProductionReceiveRedu,
    LayoutTopRedu,
    
    BusinessRedu,
    CustomerRedu,
    SupplierRedu,
    SupplierAddressRedu,
    CustomerAddressRedu,
    //物料
    MaterialRedu,
    //Bom
    BomRedu,
    BomAddTableRedu,
    //销售订单、退货单
    SaleOrderRedu,
    SaleReturnAddTableRedu,
    SaleReturnRedu,
    //采购价格清单
    PurchasePriceRedu,
    SalePriceRedu,






































    //库存----------------------start ------------------------

    PurchaseListRedu,

    AddPurchaseListRedu,
    SaleCarryOutRedu,
    SalesStoreHouseRedu,
    NewSalesStoreHouseRedu,

    PreReceiptOperationDialogRedu,
    PurchaseEidtTopRedu,
    PurchaseEidtTableTabRedu,
    SalesOutboundDetailsRedu,
    ReceiptDetailsRedu,
    PurchaseReturnHouseRedu,
    SalesReturnStoreEidtTopRedu,
    SalesReturnStoreTableTabRedu,
    SalesReturnStoreDialogRedu,


    PurchaseReturnOutCarryOutRedu,
    ProductionSendMaterialCarryOutRedu,

    StorageRedu,
    ImportStorageRedu,


    NewPurchaseReturnRedu,
    PurchaseReturnOutboundDetailsRedu,
    ProductionIssueRedu,
    ProductionIssueOutboundDetailsRedu,
    NewProductionIssueRedu,

    ProductionlistRedu,
    ProductionDetailsRedu,
    AddProductionRedu,
    SalesReturnListRedu,
    SalesReturnDetailsRedu,
    AddReturnSalesListRedu,
    ReturnMaterialTopRedu,
    ReturnMaterialTableTabRedu,
    ReturnMaterialDialogRedu,

    InstantInventoryRedu,
    InventoryBreakdownRedu,

    StorageAddDialogRedu,
    StorageEditDialogRedu,
    OtherOutAddRowDialogRedu,
    OtherOutEditRowDialogRedu,


    WareHousingRedu,
    WareHousingDetailsRedu,
    AddWareHousingRedu,

    ProductionStorageTopRedu,
    ProductionStorageTableTabRedu,
    ProductionStorageOperationDialogRedu,

    OtherWarehouseCarryOutRedu,

    OtherWareHousePageRedu,
    OtherWareHousePageDetailsRedu,
    OtherWarehouseCarryOutDialogRedu,
    OtherWarehouseCarryOutTableRedu,
    AddOtherWareHousePageRedu,

    AddOtherWareHousePageDialogRedu,



    OtherOutboundOrderRedu,

    OtherOutboundOrderCarryOutRedu,
    OtherOutboundOrderAddRedu,
    OtherOutboundOrderEditRedu,
    OtherOutAddSearchMaterialDialogRedu,
    OtherOutEditSearchMaterialDialogRedu,

    OtherWarehouseEditRedu,
    OtherOutboundOrderDetailsRedu,
    OtherWarehouseEditDialogRedu, 
    //库存----------------------end ------------------------




})

export default rootReducer;