import { ReqApi } from '../../../base/services/ReqApi'
import { RenterUrls } from '../../consts';


const actions = (ReduType) => ({  
    //联系人表格LOADING
    ContactTabLoading: (value) => (dispatch, getState) => {
        let state = getState()[ReduType].set('contactTabLoading', value);
        dispatch({ type: ReduType, state });
    },
    //获取联系人列表
    ContactList:(pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).ContactTabLoading(true));
        return ReqApi.post({
            url: RenterUrls.GETCONTACTS_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let { list, total, page, pageSize } = json.data;
                let state = getState()[ReduType].set('contactDataSource', list)
                    .set("contactPaging", { total, current: page, pageSize })
                    .set("contactTabLoading",false);
                dispatch({ type: ReduType, state });
            } else {
                dispatch(actions(ReduType).ContactTabLoading(false));
            }
            return json;
        })
    },
    //新增、逻辑联系人
    ContactAddEdit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).ContactTabLoading(true));
        if (pm.rowKey <= 0 || pm.rowKey ==undefined) { pm.flag = 1}
        else { pm.flag = 2 };
        // delete pm.rowKey;
        return ReqApi.post({
            url: RenterUrls.ADD_OR_UPDATE_CONTACTS,
            pm
        }).then(json => {
            dispatch(actions(ReduType).ContactTabLoading(false));
            return json
        })
    },
    //启用、禁用联系人
    ContactStatus: (pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).ContactTabLoading(true));
        return ReqApi.post({
            url: RenterUrls.ENABLE_OR_DISABLE_CONTACTS,
            pm
        }).then(json => {
            dispatch(actions(ReduType).ContactTabLoading(false));
            return json
        })
    },

})
export default actions;    