//生产领料申请单
import { prefix, prefixScm, prefixPub } from '../../base/consts/UrlsConfig';
const produce="produce";
const picking = "picking";

const ProductionReceiveUrls = {
    PRODUCTIONRECEIVE_GETLIST:`${prefixScm}/${produce}/picking/getList`,
    PRODUCTIONRECEIVE_GETDETAIL:`${prefixScm}/${produce}/picking/getDetail`,
    PRODUCTIONRECEIVE_ADD:`${prefixScm}/${produce}/picking/add`,
    PRODUCTIONRECEIVE_UPDATE:`${prefixScm}/${produce}/picking/update`,
    PRODUCTIONRECEIVE_GETMATER:`${prefixScm}/${produce}/picking/getMaterialListByCode`,
    PRODUCTIONRECEIVE_ISEDIT:`${prefixScm}/${produce}/picking/edit`,
    PRODUCTION_RECEIVE_STATUS: (status) => `${prefixScm}/${produce}/${picking}/${status}`,
    PRODUCTIONRECEIVE_DELETE:`${prefixScm}/${produce}/picking/delete`,
};

export default ProductionReceiveUrls;