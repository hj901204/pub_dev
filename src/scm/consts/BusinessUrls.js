import { prefixScm } from '../../base/consts/UrlsConfig';
const bp = 'bp';
const maindata = 'maindata';
const BusinessUrls = {
    BUSINESS_LIST: `${prefixScm}/${maindata}/${bp}/getBusinessPartnerList`,
    BUSINESS_BASE: `${prefixScm}/${maindata}/${bp}/getBusinessPartner`,
    BUSINESS_CONTACTLIST: `${prefixScm}/${maindata}/${bp}/getContactsList`,
    BUSINESS_ADDRESSLIST: `${prefixScm}/${maindata}/${bp}/getAddressList`,

    //联系人
    GETCONTACTS_LIST: `${prefixScm}/${maindata}/${bp}/getContactsList`,
    ENABLE_OR_DISABLE_CONTACTS: `${prefixScm}/${maindata}/${bp}/enableOrDisableContacts`,
    ADD_OR_UPDATE_CONTACTS: `${prefixScm}/${maindata}/${bp}/addOrUpdateContacts`,

};

export default BusinessUrls ;