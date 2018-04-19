import { fromJS, Record, List } from "immutable";
import { TABSREDU } from "../consts/ActTypes";

let initState = fromJS({
    activeKey: "",
    openKeys: [],
    tabs: [],
    tabsData: {
        "customer": { title: "客户", pkey: ["saleManage"], breadcrum: ["销售管理", "客户"] },
        "supplier": { title: "供应商", pkey: ["purchaseManage"], breadcrum: ["采购管理", "供应商"] },
        "business": { title: "商业伙伴", pkey: ["baseData"], breadcrum: ["主数据", "商业伙伴"] },
        "businessPartner": { title: "商业伙伴详情", pkey: ["baseData"], breadcrum: ["主数据", "商业伙伴详情"] },
        "AddSupplier": { title: "新建供应商", pkey: ["purchaseManage"], breadcrum: ["采购管理", "新建供应商"] },
        "EditSupplier": { title: "编辑供应商", pkey: ["purchaseManage"], breadcrum: ["采购管理", "编辑供应商"] },
        "AddCustomer": { title: "新建客户", pkey: ["saleManage"], breadcrum: ["销售管理", "新建客户"] },
        "EditCustomer": { title: "编辑客户", pkey: ["saleManage"], breadcrum: ["销售管理", "编辑客户"] },
        "supplierViewCont": { title: "供应商详情", pkey: ["purchaseManage"], breadcrum: ["采购管理", "供应商详情"] },
        "customerViewCont": { title: "客户详情", pkey: ["saleManage"], breadcrum: ["销售管理", "客户详情"] },
        "addPurchase": { title: "新建采购订单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "新建采购订单"] },
        "editPurchase": { title: "编辑采购订单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "编辑采购订单"] },
        "addPurchaseReturn": { title: "新建采购退货单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "新建采购退货单"] },
        "addProductionCont": { title: "新建生产订单", pkey: ["proManage"], breadcrum: ["生产管理", "新建生产订单"] },
        "editProductionCont": { title: "编辑生产订单", pkey: ["proManage"], breadcrum: ["生产管理", "编辑生产订单"], closeConfirm:true },
        "addProducRec": { title: "新建生产领料单", pkey: ["proManage"], breadcrum: ["生产管理", "新建生产领料单"] },
        "editProducRec": { title: "编辑生产领料单", pkey: ["proManage"], breadcrum: ["生产管理", "编辑生产领料单"], closeConfirm: true },
        "purchase": { title: "采购订单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "采购订单"] },
        "purchasereturn": { title: "采购退货单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "采购退货单"] },
        "addPurRet": { title: "新建采购退货单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "新建采购退货单"] },
        "editPurRet": { title: "编辑采购退货单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "编辑采购退货单"] },
        "purchaseViewCont": { title: "采购订单详情", pkey: ["purchaseManage"], breadcrum: ["采购管理", "采购订单详情"] },
        "purRetViewCont": { title: "采购退货单详情", pkey: ["purchaseManage"], breadcrum: ["采购管理", "采购退货单详情"] },
        "production": { title: "生产订单", pkey: ["proManage"], breadcrum: ["生产管理", "生产订单"] },
        "productionReceive": { title: "生产领料申请单", pkey: ["proManage"], breadcrum: ["生产管理", "生产领料申请单"] },
        "productionReturn": { title: "生产退料申请单", pkey: ["proManage"], breadcrum: ["生产管理", "生产退料申请单"] },
        "addProductionReturnCont": { title: "新建生产退料单", pkey: ["proManage"], breadcrum: ["生产管理", "新建生产退料单"] },
        "editProductionReturnCont": { title: "编辑生产退料单", pkey: ["proManage"], breadcrum: ["生产管理", "编辑生产退料单"], closeConfirm: true},
        "productionViewCont": { title: "生产订单详情", pkey: ["proManage"], breadcrum: ["生产管理", "生产订单详情"] },
        "productionReceiveViewCont": { title: "生产领料单详情", pkey: ["proManage"], breadcrum: ["生产管理", "生产领料单详情"] },
        "productionReturnViewCont": { title: "生产退料单详情", pkey: ["proManage"], breadcrum: ["生产管理", "生产退料单详情"] },
        "material": { title: "物料", pkey: ["baseData"], breadcrum: ["主数据", "物料"] },
        "materialAdd": { title: "新建物料", pkey: ["baseData"], breadcrum: ["主数据", "新建物料"] },
        "materialEdit": { title: "编辑物料", pkey: ["baseData"], breadcrum: ["主数据", "编辑物料"] },
        "materialView": { title: "物料详情", pkey: ["baseData"], breadcrum: ["主数据", "物料详情"] },
        "bomList": { title: "BOM", pkey: ["baseData"], breadcrum: ["主数据", "BOM"] },
        "bomAdd": { title: "新建BOM", pkey: ["baseData"], breadcrum: ["主数据", "新建BOM"] },
        "bomEdit": { title: "编辑BOM", pkey: ["baseData"], breadcrum: ["主数据", "编辑BOM"], closeConfirm: true},
        "bomDetail": { title: "BOM详情", pkey: ["baseData"], breadcrum: ["主数据", "BOM详情"] },
        "bomCopy": { title: "复制BOM", pkey: ["baseData"], breadcrum: ["主数据", "复制BOM"] },
        "bomUpgrade": { title: "升级BOM", pkey: ["baseData"], breadcrum: ["主数据", "升级BOM"] },
        "saleOrderList": { title: "销售订单", pkey: ["saleManage"], breadcrum: ["销售管理", "销售订单"] },
        "saleOrderAdd": { title: "新建销售订单", pkey: ["saleManage"], breadcrum: ["销售管理", "新建销售订单"] },
        "saleOrderDetail": { title: "销售订单详情", pkey: ["saleManage"], breadcrum: ["销售管理", "销售订单详情"] },
        "saleOrderEdit": { title: "编辑销售订单", pkey: ["saleManage"], breadcrum: ["销售管理", "编辑销售订单"] },
        "saleReturnList": { title: "销售退货单", pkey: ["saleManage"], breadcrum: ["销售管理", "销售退货单"] },
        "saleReturnAdd": { title: "新建销售退货单", pkey: ["saleManage"], breadcrum: ["销售管理", "新建销售退货单"] },
        "saleReturnEdit": { title: "编辑销售退货单", pkey: ["saleManage"], breadcrum: ["销售管理", "编辑销售退货单"] },
        "saleReturnDetail": { title: "销售退货单详情", pkey: ["saleManage"], breadcrum: ["销售管理", "销售退货单详情"] },
        "purchasePrice": { title: "采购价格清单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "采购价格清单"] },
        "addPurchasePrice": { title: "新建采购价格清单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "新建采购价格清单"] },
        "editPurchasePrice": { title: "编辑采购价格清单", pkey: ["purchaseManage"], breadcrum: ["采购管理", "编辑采购价格清单"] },
        "purchasePriceView": { title: "采购价格清单详情", pkey: ["purchaseManage"], breadcrum: ["采购管理", "采购价格清单详情"] },
        //销售价格单
        "salePriceList": { title: "销售价格清单", pkey: ["saleManage"], breadcrum: ["销售管理", "销售价格情单"] },
        "salePriceAdd": { title: "新建销售价格清单", pkey: ["saleManage"], breadcrum: ["销售管理", "新建销售价格清单"] },
        "salePriceEdit": { title: "编辑销售价格清单", pkey: ["saleManage"], breadcrum: ["销售管理", "编辑销售价格清单"] },
        "salePriceDetail": { title: "销售价格清单详情", pkey: ["saleManage"], breadcrum: ["销售管理", "销售价格清单详情"] },








































        /*****************库存导航*********************/
        "inventoryStorage": { title: "仓位", pkey: ["inventoryManage", "inventorySettings"], breadcrum: ["库存管理", "基础设置", "仓位"] },
        "inventoryInstantInventory": { title: "即时库存", pkey: ["inventoryManage", "inventorySearch"], breadcrum: ["库存管理", "库存查询", "即时库存"] },
        "inventoryInventoryBreakdown": { title: "库存明细账", pkey: ["inventoryManage", "inventorySearch"], breadcrum: ["库存管理", "库存查询", "库存明细账"] },
        "inventorySalesStoreHouse": { title: "销售出库单", pkey: ["inventoryManage", "inventoryOutbound"], breadcrum: ["库存管理", "出库管理", "销售出库单"] },
        "inventorySaleCarryOut": { title: "执行销售出库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "出库管理", "销售出库单", "执行销售出库单"] },
        "inventoryNewSalesStoreHouse": { title: "新建销售出库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "出库管理", "销售出库单", "新建销售出库单"] },
        "inventorySalesOutboundDetails": { title: "销售出库单详情", pkey: ["inventoryManage"], breadcrum: ["库存管理", "出库管理", "销售出库单", "销售出库单详情"] },
        "inventoryPurchaseReturnHouse": { title: "采购退货出库单", pkey: ["inventoryManage", "inventoryOutbound"], breadcrum: ["库存管理", "出库管理", "采购退货出库单"] },
        "inventoryPurchaseReturnOutCarryOut": { title: "执行采购退货出库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "出库管理", "采购退货出库单", "执行采购退货出库单"] },
        "inventoryNewPurchaseReturn": { title: "新建采购退货出库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "出库管理", "采购退货出库单", "新建采购退货出库单"] },
        "inventoryPurchaseReturnOutboundDetails": { title: "采购退货出库单详情", pkey: ["inventoryManage"], breadcrum: ["库存管理", "出库管理", "采购退货出库单", "采购退货出库单详情"] },
        "inventoryProductionIssue": { title: "生产发料单", pkey: ["inventoryManage", "inventoryOutbound"], breadcrum: ["库存管理", "出库管理", "生产发料单"] },
        "inventoryProductionSendMaterialCarryOut": { title: "执行生产发料单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "出库管理", "生产发料单", "执行生产发料单"] },
        "inventoryNewProductionIssue": { title: "新建生产发料单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "出库管理", "生产发料单", "新建生产发料单"] },
        "inventoryProductionIssueOutboundDetails": { title: "生产发料单详情", pkey: ["inventoryManage"], breadcrum: ["库存管理", "出库管理", "生产发料单", "生产发料单详情"] },
        "inventoryPurchaseListCont": { title: "采购入库单", pkey: ["inventoryManage", "inventoryPurchase"], breadcrum: ["库存管理", "入库管理", "采购入库单"] },
        "inventoryPurchaseEidt": { title: "执行采购入库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "采购入库单", "执行采购入库单"] },
        "inventoryAddPurchaseListCont": { title: "新建采购入库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "采购入库单", "新建采购入库单"] },
        "inventoryReceiptDetailsCont": { title: "采购入库单详情", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "采购入库单", "采购入库单详情"] },
        "inventorySalesReturnListCont": { title: "销售退货入库单", pkey: ["inventoryManage","inventoryPurchase"], breadcrum: ["库存管理", "入库管理", "销售退货入库单"] },
        "inventorySalesReturnStoreCont": { title: "执行销售退货入库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "销售退货入库单", "执行销售退货入库单"] },
        "inventoryAddReturnSalesListCont": { title: "新建销售退货入库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "销售退货入库单", "新建销售退货入库单"] },
        "inventorySalesReturnDetailsCont": { title: "销售退货入库单详情", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "销售退货入库单", "销售退货入库单详情"] },
        "inventoryProductionListCont": { title: "生产退料单", pkey: ["inventoryManage", "inventoryPurchase"], breadcrum: ["库存管理", "入库管理", "生产退料单"] },
        "inventoryReturnMaterialCont": { title: "执行生产退料单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "生产退料单", "执行生产退料单"] },
        "inventoryAddInventoryProductionCont": { title: "新建生产退料单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "生产退料单", "新建生产退料单"] },
        "inventoryProductionDetailsCont": { title: "生产退料单详情", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "生产退料单", "生产退料单详情"] },
        "inventoryWareHousingCont": { title: "生产入库单", pkey: ["inventoryManage", "inventoryPurchase"], breadcrum: ["库存管理", "入库管理", "生产入库单"] },
        "inventoryProductionStorageCont": { title: "执行生产入库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "生产入库单", "执行生产入库单"] },
        "inventoryAddWareHousingCont": { title: "新建生产入库单", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "生产入库单", "新建生产入库单"] },
        "inventoryWareHousingDetailsCont": { title: "生产入库单收货详情", pkey: ["inventoryManage"], breadcrum: ["库存管理", "入库管理", "生产入库单", "生产入库单收货详情"] },




        "inventoryOtherWareHousePageCont": { title: "其他入库单", pkey: ["inventoryManage","inventoryPurchase"], breadcrum: ["库存管理", "入库管理", "其他入库单"] },
        "inventoryOtherWareHousePageDetailsCont": { title: "其他入库单详情", pkey: ["inventoryManage","inventoryPurchase","inventoryOtherWareHousePageCont"], breadcrum: ["库存管理", "入库管理", "其他入库单","其他入库单详情"] },
        "inventoryAddOtherWareHousePageCont": { title: "新建其他入库单", pkey: ["inventoryManage","inventoryPurchase","inventoryOtherWareHousePageCont"], breadcrum: ["库存管理", "入库管理", "其他入库单","新建其他入库单"] },
        "inventoryOtherWarehouseEditCont": { title: "编辑其他入库单", pkey: ["inventoryManage", "inventoryPurchase", "inventoryOtherWareHousePageCont"], breadcrum: ["库存管理", "入库管理", "其他入库单", "编辑其他入库单"], closeConfirm: true },
        "inventoryOtherWarehouseCarryOutCont": { title: "执行其他入库单", pkey: ["inventoryManage","inventoryPurchase","inventoryOtherWareHousePageCont"], breadcrum: ["库存管理", "入库管理", "其他入库单","执行其他入库单"] },



        "inventoryOtherOutboundAdd": { title: "新建其他出库单据", pkey: ["inventoryManage","inventoryOutbound","inventoryOtherOutbound"], breadcrum: ["库存管理", "出库管理", "其他出库单","新建其他出库单据"] },
        "inventoryOtherOutboundEdit": { title: "编辑其他出库单据", pkey: ["inventoryManage", "inventoryOutbound", "inventoryOtherOutbound"], breadcrum: ["库存管理", "出库管理", "其他出库单", "编辑其他出库单据"], closeConfirm: true },
        "inventoryOtherOutbound": { title: "其他出库单", pkey: ["inventoryManage", "inventoryOutbound"], breadcrum: ["库存管理", "出库管理", "其他出库单"] },
        "inventoryOtherOutboundOrderCarryOut": { title: "执行其他出库单据", pkey: ["inventoryManage","inventoryOutbound","inventoryOtherOutbound"], breadcrum: ["库存管理", "出库管理", "其他出库单","执行其他出库单据"] },
        "inventoryOtherOutboundOrderDetails": { title: "其他出库单据详情", pkey: ["inventoryManage","inventoryOutbound","inventoryOtherOutbound"], breadcrum: ["库存管理", "出库管理", "其他出库单","其他出库单据详情"] },

































































































































        //------------------------库存 start ----------------------------------- //













        //------------------------库存 end ----------------------------------- //
    }
});


/*

this.breadcrums = [
    {
        key:"material",
        breadcrum:["商品管理","商品物料库"]
    },
    {
        key:"library",
        breadcrum:["商品管理","商品列表"]
    },
    {
        key:"purchaseEidt",
        breadcrum:["库存管理","采购入库"]
    },
    {
        key:"InstantInventory",
        breadcrum:["库存查询","即时库存"]
    },
    {
        key:"InventoryBreakdown",
        breadcrum:["库存查询","库存明细账"]
    },
    {
        key:"SalesStoreHouse",
        breadcrum:["出库管理","销售出库单"]
    },
    {
        key:"saleCarryOut",
        breadcrum:["出库管理","销售出库单","执行"]
    },
    {
        key:"NewSalesStoreHouse",
        breadcrum:["出库管理","销售出库单","新建销售出库单"]
    },
    {
        key:"SalesOutboundDetails",
        breadcrum:["出库管理","销售出库单","销售出库单详情"]
    },
    {
        key:"PurchaseReturn",
        breadcrum:["出库管理","采购退货出库单"]
    },
    {
        key:"PurchaseReturnOutCarryOut",
        breadcrum:["出库管理","采购退货出库单","执行"]
    },

    {
        key:"NewPurchaseReturn",
        breadcrum:["出库管理","采购退货出库单","新建采购退货出库单"]
    },
    {
        key:"PurchaseReturnOutboundDetails",
        breadcrum:["出库管理","采购退货出库单","采购退货出库单详情"]
    },
    {
        key:"ProductionIssue",
        breadcrum:["出库管理","生产发料单"]
    },
    {
        key:"ProductionSendMaterialCarryOut",
        breadcrum:["出库管理","生产发料单","执行"]
    },
    {
        key:"NewProductionIssue",
        breadcrum:["出库管理","生产发料单","新建生产发料单"]
    },
    {
        key:"ProductionIssueOutboundDetails",
        breadcrum:["出库管理","生产发料单","生产发料单详情"]
    },
    {
        key:"PurchaseListCont",
        breadcrum:["入库管理","采购入库单"]
    },
    {
        key:"purchaseEidt",
        breadcrum:["入库管理","采购入库单","执行"]
    },
    {
        key:"salesReturnListCont",
        breadcrum:["入库管理","销售退货入库单"]
    },
    {
        key:"SalesReturnStoreCont",
        breadcrum:["入库管理","销售退货入库单","执行"]
    },
    {
        key:"ProductionListCont",
        breadcrum:["入库管理","生产退料单"]
    },
    {
        key:"ReturnMaterialCont",
        breadcrum:["入库管理","生产退料单","执行"]
    },
    {
        key:"WareHousingCont",
        breadcrum:["入库管理","生产入库单"]
    },
    {
        key:"ProductionStorageCont",
        breadcrum:["入库管理","生产入库单","执行"]
    },{
        key:"ReceiptDetailsCont",
        breadcrum:["入库管理","采购入库单","采购入库单详情"]
    },{
        key:"salesReturnDetailsCont",
        breadcrum:["入库管理","销售退货入库单","销售退货入库单详情"]
    },{
        key:"ProductionDetailsCont",
        breadcrum:["入库管理","生产退料单","生产退料单详情"]
    }, {
        key:"WareHousingDetailsCont",
        breadcrum:["入库管理","生产入库单","生产入库单收货详情"]
    },{
        key:"AddPurchaseListCont",
        breadcrum:["入库管理","采购入库单","新建采购入库单"]
    },{
        key:"addReturnSalesListCont",
        breadcrum:["入库管理","销售退货入库单","新建销售退货入库单"]
    },{
        key:"AddProductionCont",
        breadcrum:["入库管理","生产退料单","新建生产退料单"]
    }, {
        key:"AddWareHousingCont",
        breadcrum:["入库管理","生产入库单","新建生产入库单"]
    },
]*/


const TabsRedu = (state = initState, action) => {
    switch (action.type) {
        case TABSREDU:
            return action.state;
        default:
            return state;
    }
}
export default TabsRedu;
