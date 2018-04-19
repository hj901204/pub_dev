import { combineReducers } from "redux"
import TabsRedu from './TabsRedu'



import PageLoadingRedu from './PageLoadingRedu'
import PurchaseListRedu from './PurchaseListRedu'
import AddPurchaseListRedu from './AddPurchaseListRedu'
import SalesStoreHouseRedu from './SalesStoreHouseRedu'
import NewSalesStoreHouseRedu from './NewSalesStoreHouseRedu'
import SaleCarryOutRedu from './SaleCarryOutRedu'
import InstantInventoryRedu from './InstantInventoryRedu'
import InventoryBreakdownRedu from './InventoryBreakdownRedu'
import PreReceiptOperationDialogRedu from './PreReceiptOperationDialogRedu'
import PurchaseEidtTopRedu from './PurchaseEidtTopRedu'
import PurchaseEidtTableTabRedu from './PurchaseEidtTableTabRedu'

import SalesOutboundDetailsRedu from './SalesOutboundDetailsRedu'
import ReceiptDetailsRedu from './ReceiptDetailsRedu'
import PurchaseReturnRedu from './PurchaseReturnRedu'
import SalesReturnStoreEidtTopRedu from './SalesReturnStoreEidtTopRedu'
import SalesReturnStoreTableTabRedu from './SalesReturnStoreTableTabRedu'
import SalesReturnStoreDialogRedu from './SalesReturnStoreDialogRedu'


import { StorageAddDialogRedu } from './StorageAddDialogRedu';
import { StorageEditDialogRedu } from './StorageEditDialogRedu';


import SalesReturnListRedu from './SalesReturnListRedu'
import SalesReturnDetailsRedu from './SalesReturnDetailsRedu'
import AddReturnSalesListRedu from './AddReturnSalesListRedu'

import ReturnMaterialTopRedu from './ReturnMaterialTopRedu'
import ReturnMaterialTableTabRedu from './ReturnMaterialTableTabRedu'
import ReturnMaterialDialogRedu from './ReturnMaterialDialogRedu'

import NewPurchaseReturnRedu from './NewPurchaseReturnRedu'
import PurchaseReturnOutboundDetailsRedu from './PurchaseReturnOutboundDetailsRedu'
import ProductionIssueRedu from './ProductionIssueRedu'
import ProductionIssueOutboundDetailsRedu from './ProductionIssueOutboundDetailsRedu'
import NewProductionIssueRedu from './NewProductionIssueRedu'
import ProductionlistRedu from './ProductionlistRedu'
import ProductionDetailsRedu from './ProductionDetailsRedu'
import AddProductionRedu from './AddProductionRedu';


import {StorageRedu} from  "./StorageRedu"

import WareHousingRedu from './WareHousingRedu'
import WareHousingDetailsRedu from './WareHousingDetailsRedu'
import AddWareHousingRedu from './AddWareHousingRedu'
import ProductionStorageTopRedu from './ProductionStorageTopRedu'
import ProductionStorageTableTabRedu from './ProductionStorageTableTabRedu'
import ProductionStorageOperationDialogRedu from './ProductionStorageOperationDialogRedu'
import PurchaseReturnOutCarryOutRedu from './PurchaseReturnOutCarryOutRedu'
import ProductionSendMaterialCarryOutRedu from './ProductionSendMaterialCarryOutRedu'

import OtherWarehouseCarryOutRedu from './OtherWarehouseCarryOutRedu'

import OtherWareHousePageRedu from './OtherWareHousePageRedu'
import OtherWareHousePageDetailsRedu from './OtherWareHousePageDetailsRedu'

import OtherWarehouseCarryOutTableRedu from './OtherWarehouseCarryOutTableRedu'
import OtherWarehouseCarryOutDialogRedu from './OtherWarehouseCarryOutDialogRedu'
import AddOtherWareHousePageRedu from './AddOtherWareHousePageRedu'

import AddOtherWareHousePageDialogRedu from './AddOtherWareHousePageDialogRedu'


import OtherWarehouseEditRedu from './OtherWarehouseEditRedu' // 其他入库单 编辑
import OtherWarehouseEditDialogRedu from './OtherWarehouseEditDialogRedu' // 其他入库单  编辑弹窗

const rootReducer = combineReducers({
    TabsRedu,




    PageLoadingRedu,
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
    PurchaseReturnRedu,
    SalesReturnStoreEidtTopRedu,
    SalesReturnStoreTableTabRedu,
    SalesReturnStoreDialogRedu,


    PurchaseReturnOutCarryOutRedu,
    ProductionSendMaterialCarryOutRedu,

    StorageRedu,




















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

    OtherWarehouseEditRedu,
    OtherWarehouseEditDialogRedu,
})

export default rootReducer;


