import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls';
import { INSTANTINVENTREDU } from '../../consts/ActTypes';

let actions = {
    SidebarVisiable:(value) => (dispatch, getState) => {
        let state = getState()[INSTANTINVENTREDU].set('sidebarVisiable', value);
        dispatch({ type: INSTANTINVENTREDU, state });
    },
    ListLoading:(value) => (dispatch, getState) => {
        let state = getState()[INSTANTINVENTREDU].set('listLoading', value);
        dispatch({ type: INSTANTINVENTREDU, state });
    },
    DialogLoading:(value) => (dispatch, getState) => {
        let state = getState()[INSTANTINVENTREDU].set('dialogLoading', value);
        dispatch({ type: INSTANTINVENTREDU, state });
    },
    GetInventoryList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize} = data;
        let state = getState()[INSTANTINVENTREDU].set('dataSource', list)
             .set("paging", { total:total,current:page,pageSize:pageSize});
        dispatch({ type: INSTANTINVENTREDU, state });
    },
    InventoryList: (pm={})=>(dispatch,getState)=>{
         dispatch(actions.ListLoading(true));
      ReqApi.get({
            url: Urls.GETLIST,
            pm,
        }).then((json) => {
             if(json.status===2000){
                dispatch(actions.GetInventoryList(json.data));  
            }
            dispatch(actions.ListLoading(false));
        })
    },
    SidebarBtn:(materialCode,status,id)=>(dispatch,getState)=>{
        let state = getState()[INSTANTINVENTREDU].set('materialCode', materialCode).set("id",id).set("status",status)
        dispatch({ type: INSTANTINVENTREDU, state });
        dispatch(actions.SidebarVisiable(true));
    }
}
export default actions;