import { prefixScm, prefixPub } from './UrlsConfig';
const bom = 'maindata/bom';
const base = 'basic';
const material = 'maindata/material';
const BasicUrls={
    MAIN_BOM_LIST: `${prefixScm}/${bom}/getList`,
    ADD_BOM: `${prefixScm}/${bom}/add`,
    EDIT_BOM: `${prefixScm}/${bom}/update`,
    DELETE_BOM: `${prefixScm}/${bom}/delete`,
    DETAIL_BOM: `${prefixScm}/${bom}/getDetail`,
    COPY_BOM: `${prefixScm}/${bom}/copy`,
    UPGRADE_BOM: `${prefixScm}/${bom}/upgrade`,
    QUERY_BOM:`${prefixScm}/${bom}/query`,
    CHECK_DATE:`${prefixScm}/${bom}/checkDate`,
    MATERIAL_LIST:`${prefixScm}/${base}/getMaterialOrList`,
    PRODUCT_LIST:`${prefixScm}/maindata/material/selectedMaterial`,
    CHECKEDIT:`${prefixScm}/${bom}/edit`,
    UPDATESTATUS:`${prefixScm}/${bom}/updateStatus`,
}
export default BasicUrls ;