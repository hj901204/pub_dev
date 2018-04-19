//采购订单
import { prefix, prefixScm, prefixPub } from '../../base/consts/UrlsConfig';
const purchase = 'purchase';
const dept = 'dept';
const basic = 'basic';

const PurchaseUrls = {
    PURCHASE_LIST:`${prefixScm}/${purchase}/getList`,
    GETDETAILBYCODE:`${prefixScm}/${purchase}/getDetailByCode`,
    PURCHASE_DEL:`${prefixScm}/${purchase}/delete`,
    COSTCENTER_LIST:`${prefixPub}/${dept}/getOrgList`,
    GET_CONTACTLIST:`${prefixScm}/${basic}/getContactsList`,
    GET_SHIPPINGADDRESS_LIST:`${prefixScm}/${basic}/getAddressList`,
    GET_SUPPLIER_LIST:`${prefixScm}/${basic}/getSupplierList`,
    GET_MEASURELIST: `${prefixPub}/basic/measure/getAll`,
    ISBUYER: `${prefixScm}/${purchase}/currentUserIsBuyer`,
    GET_MATERIALLIST: `${prefixScm}/${basic}/getMaterialOrList`,
    ADD_PURCHASE: `${prefixScm}/${purchase}/add`,
    CAN_PURCHASE_EDIT: `${prefixScm}/${purchase}/beforeEdit`,
    UPDATE_PURCHASE: `${prefixScm}/${purchase}/update`,
    PURCHASE_STATUS: (status) => `${prefixScm}/${purchase}/${status}`,
};

export default PurchaseUrls;
