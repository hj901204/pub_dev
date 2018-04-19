//采购价格清单
import { prefix, prefixScm, prefixPub } from '../../base/consts/UrlsConfig';
const purchasePrice = 'purchaseprice';

const PurchasePriceUrls = {
    PURCHASEPRICE_LIST: `${prefixScm}/${purchasePrice}/findList`,
    SUPPLIER_LIST: `${prefixScm}/basic/getSupplierList`,
    CUR_LIST: `${prefixPub}/basic/currency/getAll`,
    MATERIAL_LIST: `${prefixScm}/maindata/material/getList`,
    CUR_DETAIL: `${prefixPub}/basic/currency/getCurrencyByCode`,
    PURCHASEPRICE_DETAIL: `${prefixScm}/${purchasePrice}/get`,
    PURCHASEPRICE_ADD: `${prefixScm}/${purchasePrice}/add`,
    PURCHASEPRICE_EDIT: `${prefixScm}/${purchasePrice}/update`,
    PURCHASEPRICE_GET:`${prefixScm}/${purchasePrice}/get`, //采购价格清单详情
    PURCHASEPRICE_DELETE:`${prefixScm}/${purchasePrice}/delete`,//采购价格清单主列表-删除
    PURCHASEPRICE_SUBMIT:`${prefixScm}/${purchasePrice}/submit`,//采购价格清单详情-提交
    PURCHASEPRICE_RECALL:`${prefixScm}/${purchasePrice}/recall`,//采购价格清单详情-撤回
    IMPORT_EXCEL:`${prefixScm}/purchaseprice/importExcel`,//导入
    PURCHASEPRICE_CHECKSTATUS: `${prefixScm}/${purchasePrice}/checkOrderStatus`,//检查是否存在审核状态的单据
};

export default PurchasePriceUrls;
