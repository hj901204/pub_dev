import { prefix, prefix2, prefixPub } from './UrlsConfig';

const employees = 'employees';

const MemberUrls = {
    // 根据部门获取员工列表
    POSITION_INFO_LIST: `${prefixPub}/${employees}/list`,
    // 获取员工详情
    GET_DETAILS_INFO: `${prefixPub}/${employees}/getEmp`,
    // 获取已停用员工列表
    GET_DEACTIVEDMEMBER_LIST: `${prefixPub}/${employees}/outInfo`,

     //批量修改部门
    BATCH_MOVE_DEP: `${prefixPub}/${employees}/batchMoveDept`,
    //停用账户
    STOP_ACCOUNT: `${prefixPub}/${employees}/batchOut`

};

export default MemberUrls;
