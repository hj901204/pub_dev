import { prefixScm, prefixPub } from '../../base/consts/UrlsConfig';

const supplier = 'supplier';
const maindata='maindata';
const bp = 'bp';
const basic = 'supplier';
const address = 'address';

const SupplierUrls = {
    SUPPLIER_LIST:`${prefixScm}/${maindata}/${supplier}/getSupplierList`,
    SUPPLIERDETAIL:`${prefixScm}/${maindata}/${supplier}/getSupplier`,
    SUPPLIERADD:`${prefixScm}/${maindata}/${supplier}/addSupplier`,
    SUPPLIEREDIT:`${prefixScm}/${maindata}/${supplier}/updateSupplier`,
    SUPPLIERDEL:`${prefixScm}/${maindata}/${supplier}/deleteSupplier`,
    SUPPLIERSETUP:`${prefixScm}/${maindata}/${supplier}/enableOrDisableSupplier`,
    IMPORT_EXCEL: `${prefixScm}/${maindata}/${supplier}/importExcel`,

    SUPPLIERADDRESS_LIST: `${prefixScm}/${maindata}/${bp}/getAddressList`,
    SUPPLIERADDRESS_ISDISABLE: `${prefixScm}/${maindata}/${bp}/enableOrDisableAddress`, 
    CHOOSEADDRESS_LIST: `${prefixPub}/basic/address/getAllForScm`, 
    CREATEADDRESS_ADD: `${prefixScm}/${maindata}/${bp}/addAddress`, 
    CHOOSEADDRESS_ADD: `${prefixScm}/${maindata}/${bp}/addRefAddress`,
    SUPPLIERADDRESS_EDIT: `${prefixScm}/${maindata}/${bp}/updateAddress`,
    SUPPLIERADDRESS_DETAIL: `${prefixScm}/${maindata}/${bp}/getAddress`,
    
    SUPPLIERCONTACTSTATUS:`${prefixScm}/${maindata}/${bp}/enableOrDisableContacts`,
    SUPPLIERADDORUPDATE: `${prefixScm}/${maindata}/${bp}/addOrUpdateContacts`,
    
};

export default SupplierUrls ;

