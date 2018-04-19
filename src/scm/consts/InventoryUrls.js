/**
 * Created by MW on 2017/4/20.
 */
import { prefixScm } from '../../base/consts/UrlsConfig';
import { prefixPub } from '../../base/consts/UrlsConfig';
let inventory = 'inventory';
let out = 'out';
let exec = 'exec';
let allocate = 'allocate';

let put = 'put';
let freightspace = 'freightSpace'

const Urls = {

    //EMPLOYEE_ADD: `${prefixScm}/${employees}/modify`,

    // --出库单 url--
    INVENTORYRECORD: `${prefixScm}/${inventory}/inventoryRecord/getList`,//获取库存明细账列表
    GETLIST: `${prefixScm}/${inventory}/getList`,//获取库存选择列表
    SALE_GETLIST: `${prefixScm}/${inventory}/${out}/getList`, //获取出库单列表(带分页)
    OUT_GETORDERINFO: `${prefixScm}/${inventory}/${out}/getOrderInfo`, //出库单据订单信息查询
    OUT_GETDETAIL: `${prefixScm}/${inventory}/${out}/getDetail`, //出库单据详情主信息查询
    ALLOCATE_GETINVENTORYLIST: `${prefixScm}/${inventory}/${out}/${exec}/${allocate}/getInventoryList`, //出库单执行操作分配时获取库存列表
    ALLOCATE_GETORDERDETAIL: `${prefixScm}/${inventory}/${out}/${exec}/${allocate}/getOrderDetail`, //出库单执行操作分配时获取订单详情
    ORDERINFO_ALLOCATESAVE: `${prefixScm}/${inventory}/${out}/${exec}/orderInfo/allocateSave`, //出库单执行操作时订单分配保存操作
    ALLOCATEINFO_DELETE: `${prefixScm}/${inventory}/${out}/${exec}/allocateInfo/delete`, //出库单执行操作分配信息删除操作
    GETALLOCATEINFO: `${prefixScm}/${inventory}/${out}/getAllocateInfo`, //出库单据分配信息查询
    SHIPPING: `${prefixScm}/${inventory}/${out}/${exec}/shipping`, //出库单执行操作发货
    SALE_OUT_INVENTORY_DELETE: `${prefixScm}/${inventory}/${out}/delete`, //单条出库单删除
    SALE_OUT_INVENTORY_ADD: `${prefixScm}/${inventory}/${out}/add`,  //出库单新建时保存操作
    ISLOCK: `${prefixScm}/${inventory}/${out}/islock`, //点击执行时判断当前单据是否锁定
    GET_SALEORDER:`${prefixScm}/sale/getSaleOrder`, //根据源单据号获取源单据详情(销售出库单)
    SALE_SALEORDER_LIST:`${prefixScm}/sale/getSaleOrderList`,  //获取源单据列表(销售出库单)
    PURCAHSE_RETURN_GET_DETAIL:`${prefixScm}/purchaseReturn/getDetailByCode`,  //根据源单据号获取源单据详情(采购退货出库单)
    PURCHASE_RETURN_GETLIST:`${prefixScm}/purchaseReturn/getList`,  //获取源单据列表(采购退货出库单)
    PRODUCE_PICKING_GETDETAIL:`${prefixScm}/produce/picking/getDetail`, //根据源单据号获取源单据详情(生产领料单)
    PRODUCT_PICKING_GETLIST:`${prefixScm}/produce/picking/getList`, //获取源单据列表(生产领料单)
    PUB_BASIC_BUSINESS_GETLIST:`${prefixPub}/basic/business/getList`,//获取单据类型
    CLOSE:`${prefixScm}/${inventory}/${out}/close`, //关闭


    // ---- 采购入库单 url ----------
    GET_PRE_PUT_INFO: `${prefixScm}/${inventory}/${put}/getPrePutInfo`,   // 入库单据预收货信息查询
    PRE_PUT_INFO_DELETE: `${prefixScm}/${inventory}/${put}/exec/prePutInfo/delete`, // 入库单据执行操作预收货信息删除操作
    GET_FREIGHT_SPACE: `${prefixScm}/${inventory}/${freightspace}/getBySiteCode`, // 根据仓库编码获取仓位
    GET_PURCHASELIST:`${prefixScm}/${inventory}/${put}/getList`,//采购入库单主界面
    GET_DETAIL: `${prefixScm}/${inventory}/${put}/getDetail`, // 入库单据主信息查询
    GET_ORDER_INFO: `${prefixScm}/${inventory}/${put}/getOrderInfo`, // 入库单据订单信息查询
    RECEIVE: `${prefixScm}/${inventory}/${put}/exec/receive`, // 入库单据执行操作收货
    PRE_PUT_SAVE: `${prefixScm}/${inventory}/${put}/exec/orderInfo/prePutSave`, //入库单据执行操作订单信息预收货保存操作
    GET_PURCHASE_DETAILBYCODE: `${prefixScm}/purchase/getDetailByCode`, //采购入库单主界面查询源单信息
    GET_PURCHASE_DELETE: `${prefixScm}/${inventory}/${put}/delete`, // 入库单据删除操作
    PUT_CLOASE: `${prefixScm}/${inventory}/${put}/close`, // 生产入库单执行界面关闭操作
    GET_PURCHASE_GETLIST: `${prefixScm}/purchase/getList`, //采购入库单新建时查询源单列表
    GET_PURCHASE_SAVE: `${prefixScm}/${inventory}/${put}/add`, // 入库单据保存操作




    // ---- 仓位 url ----------
    INVENTORY_FREIGHTSPACE_GETLIST: `${prefixScm}/${inventory}/freightSpace/getList`, //获取出库单列表(带分页)
    INVENTORY_FREIGHTSPACE_GETDETAIL: `${prefixScm}/${inventory}/freightSpace/getDetail`, //获取单条仓位详情
    INVENTORY_FREIGHTSPACE_ADD: `${prefixScm}/${inventory}/freightSpace/add`, //仓位新增
    INVENTORY_FREIGHTSPACE_DELETE: `${prefixScm}/${inventory}/freightSpace/delete`, //仓位删除
    INVENTORY_FREIGHTSPACE_UPDATE: `${prefixScm}/${inventory}/freightSpace/update`,//仓位更新
    INVENTORY_FREIGHTSPACE_ISDISABLE: `${prefixScm}/${inventory}/freightSpace/isDisable`,//仓位启用禁用
    PUB_BASIC_SITE_GETLIST: `${prefixPub}/basic/site/getList`,//获取站点
    SCM_INVENTORY_FREIGHTSPACE_IMPORTEXCEL: `${prefixScm}/inventory/freightSpace/importExcel`,//获取站点

    // -----------------------------



    // --------------销售退货入库单---------------
     GET_RETURN_SIDE: `${prefixScm}/saleReturn/getSaleReturn`, //销售退货入库单主界面查询源单信息和销售退货入库单新建时查询源单订单信息
     GET_RETURN_LIST: `${prefixScm}/saleReturn/getSaleReturnList`, //销售退货入库单新建时查询源单列表

     // --------------生产退料单---------------
    GET_PRODUCTION_SIDE: `${prefixScm}/productionReturn/getDetail`, // 生产退料单主界面查询源单信息和生产退料单新建时查询源单订单信息
    GET_PRODUCTION_LIST: `${prefixScm}/productionReturn/getList`, // 生产退料单新建时查询源单列表

    // --------------生产入库单---------------
    GET_NEW_SIDE: `${prefixScm}/productionorder/getDetail`, //生产入库单主界面查询源单信息和生产入库单新建时查询源单订单信息
    GET_NEW_LIST: `${prefixScm}/productionorder/getList`, //生产入库单新建时查询源单列表
    GET_NEW_SITE: `${prefixPub}/basic/site/getList`, //生产入库新建时选择站点
    GET_TAKE_ISLOCK: `${prefixScm}/${inventory}/${put}/islock`, //点击执行时判断当前单据是否锁定






    // --------------其他出库---------------
    PUB_DEPT_GET_ORG_LIST: `${prefixPub}/dept/getOrgList`,  //部门枚举
    PUB_EMPLOYEES_LIST: `${prefixPub}/employees/list`,  //员工枚举

    PUB_BASIC_BUSINESS_GET_LIST: `${prefixPub}/basic/business/getList`,  //单据类型枚举

    SCM_MAIN_DATA_MATERIAL_GET_LIST: `${prefixScm}/maindata/material/getList`,  //物料查询
    SCM_INVENTORY_PUT_GET_ORDER_INFO: `${prefixScm}/inventory/put/getOrderInfo`,  //物料 信息列表查询

    SCM_INVENTORY_OUT_GET_ORDER_INFO: `${prefixScm}/inventory/out/getOrderInfo`,  //订单信息 查询列表
    SCM_INVENTORY_OUT_GET_DETAIL: `${prefixScm}/inventory/out/getDetail`,  //基本信息 主单据明细(常规信息)查询

    SCM_INVENTORY_OUT_OTHER_SAVE: `${prefixScm}/inventory/out/otherSave`,  //新增编辑出库提交






    // --------------其他入库单---------------
     PUB_BASIC_BUSCODE: `${prefixPub}/basic/business/getList`,//主表获取业务类型查询
     GET_MINDATA_LIST: `${prefixScm}/maindata/material/getList`, //其他入库单弹窗物料列表查询
     OTHER_SAVE: `${prefixScm}/inventory/put/otherSave`, // 其他入库单 新增或编辑  单据保存

     //------------------编码规则--------------
     GET_CODERULE: `${prefixPub}/codeRule/isAuto`,//编码规则
};




export { Urls };
