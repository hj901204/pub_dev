import { prefix, prefixScm, prefixPub } from './UrlsConfig';

const saleReturn = 'saleReturn';
const basic = 'basic';
const sale = 'sale';

const BasicUrls={

    MAIN_SALERETURN_LIST: `${prefixScm}/${saleReturn}/getSaleReturnList`,
    ADD_SALERETURN: `${prefixScm}/${saleReturn}/addSaleReturn`,
    UPDATE_SALERETURN: `${prefixScm}/${saleReturn}/updateSaleReturn`,
    DELETE_SALERETURN: `${prefixScm}/${saleReturn}/deleteSaleReturn`,
    SUBMIT_SALERETURN: `${prefixScm}/${saleReturn}/submitSaleReturn`,
    PUSH_SALERETURN: `${prefixScm}/${saleReturn}/pushSaleReturn`,
    RECALL_SALERETURN: `${prefixScm}/${saleReturn}/recallSaleReturn`,
    CLOSE_SALERETURN: `${prefixScm}/${saleReturn}/closeSaleReturn`,
    DETAIL_SALERETURN: `${prefixScm}/${saleReturn}/getSaleReturn`,
    QUERY_SALERETURN: `${prefixScm}/${saleReturn}/query`,
    CHECK_DATE: `${prefixScm}/${saleReturn}/checkDate`,
    ORIGINALORDER_LIST: `${prefixScm}/${saleReturn}/getSaleOrderList`,
    INITIALSALEORDER_LIST: `${prefixScm}/${saleReturn}/getSourceOrderList`,
    GET_SALEORDER: `${prefixScm}/${sale}/getSaleOrder`,
     // 编辑锁定
    CHECK_LOCKING_STATUS: `${prefixScm}/${saleReturn}/checkLockingStatus`,

    // scm pub basic
    MATERIAL_LIST: `${prefixScm}/${basic}/getMaterialOrList`,
    CUSTOMER_LIST: `${prefixScm}/${basic}/getConsumerList`,
    CONTACTS_LIST: `${prefixScm}/${basic}/getContactsList`,
    TAKEADDRESS_LIST: `${prefixScm}/${basic}/getAddressList`,

    //公共
    SALESMAN_LIST: `${prefixPub}/employees/list`,
    // 销售组织
    SALESORG_LIST: `${prefixPub}/dept/getOrgList`,
    RECEIVE_ADR_LIST: `${prefixPub}/${basic}/site/getList`,
    

}
export default BasicUrls ;

