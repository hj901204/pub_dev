//采购退货单
import { prefix, prefixScm, prefixPub } from '../../base/consts/UrlsConfig';
const purchasereturn='purchaseReturn';
const PurchaseReturnUrls = {
    PURCHASERETURN_LIST:`${prefixScm}/${purchasereturn}/getList`,
    GETDETAILBYCODE:`${prefixScm}/${purchasereturn}/getDetailByCode`,
    PURCHASERETURN_DEL: `${prefixScm}/${purchasereturn}/delete`,
    ADD_PURCHASERETURN: `${prefixScm}/${purchasereturn}/add`,
    UPDATE_PURCHASERETURN: `${prefixScm}/${purchasereturn}/update`,
    PURCHASERETURN_STATUS: (status) => `${prefixScm}/${purchasereturn}/${status}`, 
    CAN_PURCHASERETURN_EDIT: `${prefixScm}/${purchasereturn}/beforeEdit`,
};

export default PurchaseReturnUrls;
