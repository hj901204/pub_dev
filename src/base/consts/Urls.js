import { prefixPub } from './UrlsConfig';
import BasicUrls from './BasicUrls';
import LoginUrls from './LoginUrls';
import MemberManage from './MemberUrls';
import ManageUrls from './ManageUrls';

import BaseDataUrls from './BaseDataUrls';
import DeptUrls from './DeptUrls';
import AddressUrls from './AddressUrls';

const employees = 'employees';
const company = 'company';
const login = 'login';

const Urls = {
    ...AddressUrls,
    ...BaseDataUrls,
    ...DeptUrls,

    EMPLOYEE_ADD: `${prefixPub}/${employees}/modify`,
    EMPLOYEE_UPDATE: `${prefixPub}/${employees}/modify`,
    GET_DETAILS_INFO: `${prefixPub}/${employees}/getEmp`,
    IMPORT_FILE: `${prefixPub}/${employees}/importFile`,
    IMPORT_VIEW: `${prefixPub}/${employees}/importView`,
    GET_PERSONAL_INFO: `${prefixPub}/${employees}/getWithToken`,
    BATCH_EDITSITE: `${prefixPub}/${employees}/batchEditSite`,
    EDIT_PROFILE_PHOTO: `${prefixPub}/${employees}/editProfilePhoto`,
    LOGIN_GETMENUES: `${prefixPub}/resource/getMenus`,

/*    LOGIN_GETMENUES: `${prefixPub}/${login}/getmenues`,*/
    SET_ENTERPRISE_INFO: `${prefixPub}/${company}/getCompanyByUser`,
    //
    UPLOAD_IMAGE: `${prefixPub}/${company}/uploadLogo`,
    COUNTRY_GETSELECTED: `${prefixPub}/basic/country/getSelected`,

    //导入文件-上传文件
    COMMON_UPLOAD_FILE:`${prefixPub}/common/uploadFile`,

    //编码规则      
    GET_CODERULE: `/pub/codeRule/isAuto`,    
};

export { Urls, BasicUrls, LoginUrls, MemberManage, ManageUrls };
