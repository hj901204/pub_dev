//生产退料申请单
import { prefix, prefixScm, prefixPub } from '../../base/consts/UrlsConfig';
const productionreturn="productionReturn";
const produce="productionorder";
const dept='dept';
const employees='employees';
const ProductionReturnUrls = {
    PRODUCTIONRETURN_GETLIST:`${prefixScm}/${productionreturn}/getList`,
    PRODUCTIONRETURN_GETDETAIL:`${prefixScm}/${productionreturn}/getDetail`,
    PRODUCTION_LIST:`${prefixScm}/${produce}/getOrderCodeList`,
    DEPARTMENT_LIST: `${prefixPub}/${dept}/getOrgList`,
    PRODUCTION_GETDETAIL:`${prefixScm}/${produce}/getDetail`,
    EMPLOYEES_GETLIST:`${prefixPub}/${employees}/list`,
    PRODUCTIONRETURN_ADD:`${prefixScm}/${productionreturn}/add`,
    PRODUCTIONRETURN_EDIT:`${prefixScm}/${productionreturn}/update`,
    PRODUCTION_RETURN_STATUS: (status) => `${prefixScm}/${productionreturn}/${status}`,
    GETLISTBYORDER:`${prefixScm}/${productionreturn}/getListByOrder`,
    DELPRODUCTIONRETURN:`${prefixScm}/${productionreturn}/delete`,
    PROEDIT:`${prefixScm}/${productionreturn}/edit`,
    
};

export default ProductionReturnUrls;