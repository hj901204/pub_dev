import { prefix, prefix2,prefixScm,prefixPub } from '../../base/consts/UrlsConfig';

const bp = 'bp';
const maindata = 'maindata';
const basic = 'basic';
const prefix3 = 'http://10.99.2.70:9095'; //服务器
const prefix4 = 'http://10.99.2.70:9097'; //服务器

const BusinessUrls = {
    BUSINESS_LIST: `${prefix}/${maindata}/${bp}/getbusinesspartnerlist`,
    BUSINESS_BASE: `${prefix}/${maindata}/${bp}/getbusinesspartner`,
    BUSINESS_CONTACTLIST: `${prefix}/${maindata}/${bp}/getContactsList`,
    BUSINESS_ADDRESSLIST: `${prefix}/${maindata}/${bp}/getaddresslist`,

 
    MATERIAL_ADD:`${prefixScm}/maindata/material/add`,//物料新增
    MATERIAL_DELETE:`${prefixScm}/maindata/material/delete`,//物料删除
    MATERIAL_GETDETAIL:`${prefixScm}/maindata/material/getDetail`,//获取物料详情
    MATERIAL_GETLIST:`${prefixScm}/maindata/material/getList`,//获取物料列表
    MATERIAL_ISDISABLE:`${prefixScm}/maindata/material/isDisable`,//物料启用/禁用
    MATERIAL_UPDATE:`${prefixScm}/maindata/material/update`,//物料更新
  

    MATERIALINVENTORY_UPDATE:`${prefixScm}/maindata/materialInventory/update`, //物料库存信息更新
    MATERIALPLAN_UPDATE:`${prefixScm}/maindata/materialPlan/update`, //物料计划信息更新

    MATERIALPRODUCE_UPDATE:`${prefixScm}/maindata/materialProduce/update`,//物料生产信息更新
    MATERIALPURCHASE_UPDATE:`${prefixScm}/maindata/materialPurchase/update`,//物料采购信息更新
    MATERIALSELL_UPDATE:`${prefixScm}/maindata/materialSell/update`,//物料销售信息更新

    MEASURE_GETLIST: `${prefixPub}/${basic}/measure/getList`,//单位下拉框
    MEASURE_GETALL: `${prefixPub}/${basic}/measure/getAll`,//单位下拉框

    //销售价格单
    SALEPRICE_ADD:`${prefixScm}/salePrice/add`,//新增
    SALEPRICE_UPDATE:`${prefixScm}/salePrice/update`,//修改
    SALEPRICE_DELETE:`${prefixScm}/salePrice/delete`,//删除
    SALEPRICE_GETLIST:`${prefixScm}/salePrice/getList`,//查询列表
    SALEPRICE_GETDETAIL:`${prefixScm}/salePrice/getDetail`,//查询明细

    SALEPRICE_SUBMIT:`${prefixScm}/salePrice/submit`,//提交
    SALEPRICE_REPEAL:`${prefixScm}/salePrice/repeal`,//撤回
    SALEPRICE_REJECT:`${prefixScm}/salePrice/reject`,//驳回




    MATERIAL_IMPORTEXCEL:`${prefixScm}/maindata/material/importExcel`,//物料导入


};

export default BusinessUrls ;