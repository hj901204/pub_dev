import { ReqApi } from '../../base/services/ReqApi'
import {GETDEAVTIVEMEMER} from '../consts/ActTypes'
import { MemberManage } from '../../base/consts/urls';


const actions = {
    tableLoading: (val) => (dispatch, getState) => {
        let state = getState()[GETDEAVTIVEMEMER].set('tableLoading', val);
        dispatch( {type: GETDEAVTIVEMEMER, state} )
    },
    GetDeactivedMemberInfoList: (val) => (dispatch, getState) => {
        const { list, page, pageSize, total } = val;
        let state = getState()[GETDEAVTIVEMEMER].set('outInfoData', list).set('paging', {page, pageSize, total} );
        dispatch( {type: GETDEAVTIVEMEMER, state} )
    },
    getDeactivedList: ( pm = {} ) => (dispatch, getState) =>{
        dispatch(actions.tableLoading(true))
        let state = getState()[GETDEAVTIVEMEMER].set('searchDeactiveMemberVal', pm);
        dispatch( {type: GETDEAVTIVEMEMER, state} )
        ReqApi.get({
            url: MemberManage.GET_DEACTIVEDMEMBER_LIST,
            pm
        }).then(json => {      
            if( json.status == 2000){
                dispatch(actions.GetDeactivedMemberInfoList(json.data));          
            }
            dispatch(actions.tableLoading(false));
        })
    }
}

export default actions