//生产订单
import { prefix, prefixScm, prefixPub } from '../../base/consts/UrlsConfig';
const produce="productionorder";
const site = 'basic/site';
const freightSpace='inventory/freightSpace';
const dept='dept';
const ProductionUrls = {
    PRODUCTION_LIST:`${prefixScm}/${produce}/getList`,
    PRODUCTION_DEL:`${prefixScm}/${produce}/delete`,
    PRODUCTION_SALELIST:`${prefixScm}/${produce}/getSaleList`,
    PRODUCTION_GETBOM:`${prefixScm}/${produce}/getBom`,
    SITE_ALLLIST:`${prefixPub}/${site}/getAll`,
    //FREIGHTSPACE_LIST:`${prefixScm}/${freightSpace}/getList`,
    FREIGHTSPACE_LIST: `${prefixScm}/${freightSpace}/getBySiteCode`,
    DEPARTMENT_LIST: `${prefixPub}/${dept}/getOrgList`,
    PRODUCTION_GETDETAIL:`${prefixScm}/${produce}/getDetail`,
    PRODUCTION_ADD:`${prefixScm}/${produce}/add`,
    PRODUCTION_EDIT:`${prefixScm}/${produce}/update`,
    PRODUCTION_DEPTLIST: `${prefixScm}/${dept}/list`,
    PRODUCTION_ORGLIST: `${prefixPub}/${dept}/getOrgList`,
    PRODUCTION_STATUS: (status) => `${prefixScm}/${produce}/${status}`,
};

export default ProductionUrls;