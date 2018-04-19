import { ReqApi } from '../../../base/services/ReqApi'
import { RenterUrls } from '../../consts';

const actions = (ReduType) => ({  
    //地址表格LOADING
    AddressTabLoading: (value) => (dispatch, getState) => {
        let state = getState()[ReduType].set('addressTabLoading', value);
        dispatch({ type: ReduType, state });
    },
    //引用地址表格LOADING
    RefAddressLoading: (value) => (dispatch, getState) => {
        let state = getState()[ReduType].set('refAddressLoading', value);
        dispatch({ type: ReduType, state });
    },
    //新增,编辑LOADING
    AddressLoading: (value) => (dispatch, getState) => {
        let state = getState()[ReduType].set('addressLoading', value);
        dispatch({ type: ReduType, state })
    },
    //新增地址弹窗显示
    AddAddressVisiable: (value) => (dispatch, getState) => {
        let state = getState()[ReduType].set('add_address_visiable', value);
        dispatch({ type: ReduType, state });
    },
    //编辑地址弹窗显示
    EditAddressVisiable: (value, id, langCode) => (dispatch, getState) => {
        let state = getState()[ReduType].set('edit_address_visiable', value);
        if (id || id === null) state = state.set('addressId', id);
        if (langCode || langCode === null) state = state.set('langCode', langCode);
        dispatch({ type: ReduType, state });
    },
    //获取地址列表
    AddressList:(pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).AddressTabLoading(true));
        return ReqApi.post({
            url: RenterUrls.SUPPLIERADDRESS_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let { list, total, page, pageSize } = json.data;
                let state = getState()[ReduType].set('addressDataSource', list)
                    .set("paging", { total, current: page, pageSize })
                    .set("addressTabLoading",false);
                dispatch({ type: ReduType, state });
            } else {
                dispatch(actions(ReduType).AddressTabLoading(false));
            }
            return json;
        })
    },
    //获取引用地址列表
    ChooseAddressList:(pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).RefAddressLoading(true));
        return ReqApi.post({
            url: RenterUrls.CHOOSEADDRESS_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let { list, total, page, pageSize } = json.data;
                let state = getState()[ReduType].set('refAddressDataSource', list)
                    .set("paging", { total, current: page, pageSize });
                dispatch({ type: ReduType, state });
            } else {
                let state = getState()[ReduType].set('refAddressDataSource', [])
                    .set("paging", { total:"", current: "", pageSize:"" });
                dispatch({ type: ReduType, state });
            }
            dispatch(actions(ReduType).RefAddressLoading(false));
            return json;
        })
    },
    //编辑地址
    EditAddress: (pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).AddressLoading(true));
        let addressCode=getState()[ReduType].get('addressId');
        return ReqApi.post({
            url: RenterUrls.SUPPLIERADDRESS_EDIT,
            pm:{...pm,addressCode}
        }).then(json => {
            dispatch(actions(ReduType).AddressLoading(false));
            return json
        })
    },
    //新增地址(自建)
    CreateAddressAdd: (pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).AddressLoading(true));
        return ReqApi.post({
            url: RenterUrls.CREATEADDRESS_ADD,
            pm
        }).then(json => {
            dispatch(actions(ReduType).AddressLoading(false));
            return json
        })
    },
    //新增地址(选择)
    ChooseAddressAdd: (pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).AddressLoading(true));
        return ReqApi.post({
            url: RenterUrls.CHOOSEADDRESS_ADD,
            pm
        }).then(json => {
            dispatch(actions(ReduType).AddressLoading(false));
            return json
        })
    },
    //地址详情
    AddressDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).AddressLoading(true));
        return ReqApi.post({
            url: RenterUrls.SUPPLIERADDRESS_DETAIL,
            pm
        }).then(json => {
            if (json.status === 2000) {  
                if (json.data) {
                    let state = getState()[ReduType].set('detail', json.data)                   
                    dispatch({ type: ReduType, state });
                }
            }
            dispatch(actions(ReduType).AddressLoading(false));
            return json;
        })
    },    
    //启用、禁用地址
    AddressDisable: (pm = {}) => (dispatch, getState) => {
        dispatch(actions(ReduType).AddressTabLoading(true));
        return ReqApi.post({
            url: RenterUrls.SUPPLIERADDRESS_ISDISABLE,
            pm
        }).then(json => {
            dispatch(actions(ReduType).AddressTabLoading(false));
            return json
        })
    },

})
export default actions;    