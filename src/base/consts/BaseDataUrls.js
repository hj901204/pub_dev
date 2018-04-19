import { prefixPub } from './UrlsConfig';
import { base_config } from '../../main/consts/BaseData';

const basic = 'basic';

const BaseDataUrls = {
    BASEDATA:base_config.map((item)=>{
        let list = item.tableData ? item.tableData : item.e_name;
        return {
            getList:`${prefixPub}/${basic}/${list}/getList`,
            getDetail: `${prefixPub}/${basic}/${item.e_name}/getDetail`,
            delete: `${prefixPub}/${basic}/${item.e_name}/delete`,
            add: `${prefixPub}/${basic}/${item.e_name}/add`,
            updata: `${prefixPub}/${basic}/${item.e_name}/update`,
            measureDetail: `${prefixPub}/${basic}/${item.e_name}/getMeasureByCode`,
            currencyDetail : `${prefixPub}/${basic}/${item.e_name}/getCurrencyByCode`,
        }
    })
}
// const BaseDataUrls = {
//     BASEDATA: [{
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }, {
//         getList: `${prefix}/${basic}/country/getList`,
//         getDetail: `${prefix}/${basic}/country/getDetail`,
//         delete: `${prefix}/${basic}/country/delete`,
//         add: `${prefix}/${basic}/country/add`,
//         updata: `${prefix}/${basic}/country/updata`,
//     }],
// };

export default BaseDataUrls;