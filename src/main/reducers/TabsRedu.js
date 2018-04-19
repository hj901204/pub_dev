import { fromJS, Record,List } from "immutable";
import { TABSREDU } from "../consts/ActTypes";

let initState = fromJS({
    activeKey:"",
    openKeys:[],
    tabs:[],
    tabsData:{
        "member":{title:"员工管理",pkey:[""],breadcrum:["员工管理"]},
        "position":{title:"职位",pkey:["organi"],breadcrum:["组织架构","职位"]},
        "department":{title:"部门",pkey:["organi"],breadcrum:["组织架构","部门"]},
        "address":{title:"地址管理",pkey:["system"],breadcrum:["系统管理","地址管理"]},
        "site":{title:"站点",pkey:["system"],breadcrum:["系统管理","站点管理"]},
        "basedata":{title:"基础数据",pkey:["system"],breadcrum:["系统管理","基础数据"]},
        "authority":{title:"权限",pkey:[""],breadcrum:["权限管理"]}
    }
});

const TabsRedu = (state = initState, action) => {
    switch (action.type) {
        case TABSREDU:
            return action.state;
        default:
            return state;
    }
}
export default TabsRedu;