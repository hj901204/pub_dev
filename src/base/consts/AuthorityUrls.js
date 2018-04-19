import { prefixPub } from './UrlsConfig';

const resource  = 'resource';

const AuthorityUrls = {

    GET_LIST: `${prefixPub}/${resource}/getList`,
    GET_ROLE_INFO: `${prefixPub}/${resource}/getRoleInfo`,
    ADD_ROLE: `${prefixPub}/${resource}/addRole`,
    EDIT: `${prefixPub}/${resource}/edit`,
    DELETE: `${prefixPub}/${resource}/delete`,
    GET_EMP_LIST: `${prefixPub}/${resource}/getEmpList`,
    ADD_EMP_RESOURCE: `${prefixPub}/${resource}/addEmpResource`,
    BATCH_MOVE: `${prefixPub}/${resource}/batchMove`,
    GET_TREE: `${prefixPub}/${resource}/getTree`,

};
export default AuthorityUrls ;