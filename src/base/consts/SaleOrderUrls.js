import { prefixScm, prefixPub } from './UrlsConfig';
const saleOrder = 'sale';
const base = 'basic';
const employees = 'employees';

const SaleOrderUrls = {
    ADD_SALE_ORDER: `${prefixScm}/${saleOrder}/addSaleOrder`,//
    GET_CURRENCY_LIST: `${prefixPub}/${base}/currency/getList`,
    GET_CUSTOMERS_LIST: `${prefixScm}/${base}/getConsumerList`,
    GET_INV_ADDRESS_LIST: `${prefixScm}/${base}/getAddressList`,
    GET_CONTACTS_LIST: `${prefixScm}/${base}/getContactsList`,
    GET_EMPLOYEE_LIST: `${prefixPub}/${employees}/list`,
    GET_ORG_LIST: `${prefixPub}/dept/getOrgList`,
    RECEIVE_ADDRESS_LIST: `${prefixScm}/${base}/getAddressList`,
    GET_SALE_ORDER: `${prefixScm}/${saleOrder}/getSaleOrder`,
    GET_SALE_ORDER_LIST: `${prefixScm}/${saleOrder}/getSaleOrderList`,
    GET_SITE_LIST: `${prefixPub}/${base}/site/getList`,
    GET_CATEGORY_LIST: `${prefixPub}/${base}/subject/getList`,
    PUSH_SALE_ORDER: `${prefixScm}/${saleOrder}/pushSaleOrder`,
    DELETE_SALE_DETAIL: `${prefixScm}/${saleOrder}/deleteSaleDetail`,
    RECALL_SALE_ORDER: `${prefixScm}/${saleOrder}/recallSaleOrder`,
    DELETE_SALE: `${prefixScm}/${saleOrder}/deleteSale`,
    SUBMIT_SALE_ORDER: `${prefixScm}/${saleOrder}/submitSaleOrder`,
    CLOSE_SALE_ORDER: `${prefixScm}/${saleOrder}/closeSaleOrder`,
    UPDATE_SALE_ORDER: `${prefixScm}/${saleOrder}/updateSaleOrder`,
    GET_MATERIAL_LIST: `${prefixScm}/${base}/getMaterialOrList`,
    CHECK_LOCKING_STATUS: `${prefixScm}/${saleOrder}/checkLockingStatus`,
    // GET_MATERIAL_LIST: `${prefixScm}/${base}/selectedMaterial`,/basic/getMaterialOrList
}
export default SaleOrderUrls;