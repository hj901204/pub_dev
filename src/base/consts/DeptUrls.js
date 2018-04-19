import { prefixPub } from './UrlsConfig';

const dept = 'dept';
const employees = 'employees';
const position = 'position';

const DeptUrls = {

    DEPT_LIST: `${prefixPub}/${dept}/list`,
    DEPARTMENT_LIST: `${prefixPub}/${dept}/list`,
    DEPARTMENT_DETAIL: `${prefixPub}/${dept}/detail`,
    DEPARTMENT_MANAGER: `${prefixPub}/${dept}/manager`,
    DEPARTMENT_ADD: `${prefixPub}/${dept}/add`,
    DEPARTMENT_SETUP: `${prefixPub}/${dept}/setup`,
    DEPARTMENT_GETORGLIST: `${prefixPub}/${dept}/getOrgList`,


    POSITION_LIST: `${prefixPub}/${position}/getJobList`,
    POSITION_DETAIL: `${prefixPub}/${position}/getJob`,
    POSITION_ADD: `${prefixPub}/${position}/addJob`,
    POSITION_UPDATE: `${prefixPub}/${position}/updateJob`,
    POSITION_DEL: `${prefixPub}/${position}/delJob`,

    POSITION_JOB_LIST: `${prefixPub}/${position}/getJobList`,

};

export default DeptUrls ;