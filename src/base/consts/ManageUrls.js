import { prefixPub } from './UrlsConfig';

const Manage = 'company';

const ManageUrls = {
    MANAGE_LIST: `${prefixPub}/${Manage}/list`,
    MANAGE_ADD: `${prefixPub}/${Manage}/add`,
    MANAGE_UPDATE: `${prefixPub}/${Manage}/update`,
    MANAGE_DETAIL: `${prefixPub}/${Manage}/detail`,
    MANAGE_RESET: `${prefixPub}/${Manage}/resetpassword`,
    MANAGE_STATUS: `${prefixPub}/${Manage}/status`,
    MANAGE_UPDATEBYUSER:`${prefixPub}/${Manage}/updateCompanyByUser`,
};

export default ManageUrls;
