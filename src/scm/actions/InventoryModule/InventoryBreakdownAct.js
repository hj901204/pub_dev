import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls';
import { INVENTORYBREAKDOWNREDU } from '../../consts/ActTypes';

let actions = {
    ListLoading:(value) => (dispatch, getState) => {
        let state = getState()[INVENTORYBREAKDOWNREDU].set('listLoading', value);
        dispatch({ type: INVENTORYBREAKDOWNREDU, state });
    },
    GetInventoryList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize} = data;
        let state = getState()[INVENTORYBREAKDOWNREDU].set('dataSource', list)
             .set("paging", {total:total,current:page,pageSize:pageSize});
        dispatch({ type: INVENTORYBREAKDOWNREDU, state });
    },
    InventoryList: (pm={})=>(dispatch,getState)=>{
         dispatch(actions.ListLoading(true));
      ReqApi.get({
            url: Urls.INVENTORYRECORD,
            pm,
        }).then((json) => {
             if(json.status===2000){
                dispatch(actions.GetInventoryList(json.data));  
            }
            dispatch(actions.ListLoading(false));
        })
    },
}
export default actions;