import { prefixPub } from './UrlsConfig';

const basic = 'basic';
const address = 'basic/address';
const site = 'site';
const AddressUrls = {

    //站点
    SITE_LIST: `${prefixPub}/${basic}/${site}/getList`,
    SITE_DEL: `${prefixPub}/${basic}/${site}/delete`,
    SITE_DETAIL:`${prefixPub}/${basic}/${site}/getSiteByCode`,
    SITE_ADD: `${prefixPub}/${basic}/${site}/add`,
    SITE_EDIT: `${prefixPub}/${basic}/${site}/update`,
    SITE_ISDISABLE: `${prefixPub}/${basic}/${site}/isDisable`,
    ORG_LIST:`${prefixPub}/dept/getOrgList`,

    //国家,区域,省份，城市下拉框数据URL
    COUNTRY_SELECTED: `${prefixPub}/${basic}/country/getSelected`,
    REGION_SELECTED: `${prefixPub}/${basic}/region/getSelected`,
    PROVINCE_SELECTED: `${prefixPub}/${basic}/province/getSelected`,
    CITY_SELECTED: `${prefixPub}/${basic}/city/getSelected`,
    COUNTY_SELECTED: `${prefixPub}/${basic}/county/getSelected`,
    //地址
    ADDRESS_ADD: `${prefixPub}/${address}/add`,
    ADDRESS_EDIT: `${prefixPub}/${address}/update`,
    ADDRESS_DETAIL: `${prefixPub}/${address}/getAddressByCode`,
    ADDRESS_LIST: `${prefixPub}/${address}/getList`,
    ADDRESS_DEL: `${prefixPub}/${address}/delete`,
    ADDRESS_ISDISABLE: `${prefixPub}/${address}/isDisable`,
    ADDRESS_ALLLIST:`${prefixPub}/${address}/getAll`,
    ADDRESS_GET_ALL: `${prefixPub}/${address}/getall`,
    ADDRESS_GET_SENIOR_ADDRESS:`${prefixPub}/${address}/getSeniorAddress`,
};

export default AddressUrls ;