/**
 * Created by MW on 2017/3/13.
 */
import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import { TREE } from '../consts/ActTypes';
import PersonMangerAct from '../actions/PersonManegeAct'
import MemberManageAct from '../actions/MemberManageAct'
let actions = {
    reqJson:{
        conditions: [
            {
                field: "status",
                value: 1,
                operation: 0
            }
        ],
        relations: "status"
    },
    //去获取左侧树结构
    getDepartments: (pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: Urls.DEPARTMENT_LIST,
            pm:actions.reqJson
        }).then((json) => {
                if (json.status == 2000){
                    dispatch(actions.setData([json.data]));
                } else {
                    let state = getState()[TREE].set('loading',false);
                    dispatch({type: TREE, state});
                }
        });
    },
    //清空数据
    emptyData: () => (dispatch, getState) => {
        let state = getState()[TREE].set('data',[]).set('loading',true);
        dispatch({type: TREE, state});
    },
    //设置data的值，以及loading
    setData: (val) => (dispatch, getState) => {
        let state = getState()[TREE].set('data', val).set('loading',false);
        dispatch({type: TREE, state});
    },
    onSelect: (info) => (dispatch, getState) => {
        let val = {
            key: info.node.props.deptCode,
            departNum: info.node.props.children? info.node.props.children.length : 0,
            departLeader: info.node.props.deptMgrName,
            departName: info.node.props.deptName
        };
        dispatch(PersonMangerAct.disableEmployees(2,2));
        dispatch(MemberManageAct.DepartInfo(val));
    }
}



export default actions