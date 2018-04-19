import { ReqApi } from '../../../base/services/ReqApi'
import BomUrls from '../../../base/consts/BomUrls';
import { Urls } from '../../../base/consts/urls';
import { BOMREDU } from '../../consts/ActTypes';
import { message } from '../../../base/components/AntdComp'
import TabsAct from '../../actions/TabsAct';
import { store } from '../../data/StoreConfig';
const actions = {
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[BOMREDU].set('tabLoading', value);
        dispatch({ type: BOMREDU, state });
    },
    BomLoading: (value) => (dispatch, getState) => {
        let state = getState()[BOMREDU].set('bomLoading', value);
        dispatch({ type: BOMREDU, state })
    },
    Fetching: (value) => (dispatch, getState) => {
        let state = getState()[BOMREDU].set('fetching', value);
        dispatch({ type: BOMREDU, state })
    },
    BomList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: BomUrls.MAIN_BOM_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetBomList(json.data));
            }
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    GetBomList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[BOMREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: BOMREDU, state });
    },
    AddBom: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.ADD_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("新增BOM成功");
                dispatch(actions.BomList({page: 1, pageSize: 10}))
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    AddBomBack: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.ADD_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                store.dispatch(TabsAct.TabRemove("bomAdd", "bomList"));
                dispatch(actions.BomList({bomCode: '', version: '', materialCode: '', status: -1, bomName: '', page: 1, pageSize: 20}))
                store.dispatch(TabsAct.TabInsert("bomList"));
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    DeleteBom: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: BomUrls.DELETE_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("BOM删除成功");
                dispatch(actions.BomList({bomCode: '', version: '', materialCode: '', status: -1, bomName: '', page: 1, pageSize: 20}))
            }
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    BomDetail: (pm = {}, flag) => (dispatch, getState) => {
        dispatch(actions.BomLoading(true));
        return ReqApi.get({
            url: BomUrls.DETAIL_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetBomDetail(json.data, flag));
                if(flag!='detail'){
                    dispatch(actions.MaterialFormList({materialCode:json.data.materialCode,materialName:json.data.materialCode,page:1,pageSize:10,inventoryType:'0,2,3,4',status:1}))
                }
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    GetBomDetail: (data, flag) => (dispatch, getState) => {
        if (flag == "edit") {
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'edit'], data)
            dispatch({ type: BOMREDU, state });
        }
        if (flag == "copy") {
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'copy'], data)
            dispatch({ type: BOMREDU, state });
        }
        if (flag == "upgrade") {
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'upgrade'], data)
            dispatch({ type: BOMREDU, state });
        }
        if (flag == "detail") {
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'detail'], data)
            dispatch({ type: BOMREDU, state });
        }
    },
    EditBom: (pm = {}) => (dispatch, getState) => {

        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.EDIT_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("BOM编辑成功");
                store.dispatch(TabsAct.TabRemove("bomEdit", "bomList"));
                store.dispatch(TabsAct.TabAdd({ title: "Bom主页", key: "bomList" }));
                dispatch(actions.BomList({bomCode: '', version: '', materialCode: '', status: -1, bomName: '', page: 1, pageSize: 10}))
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    UpdateBom: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.EDIT_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("BOM更新成功");
                store.dispatch(TabsAct.TabRemove("bomDetail", "bomList"));
                store.dispatch(TabsAct.TabAdd({ title: "Bom主页", key: "bomList" }));
                dispatch(actions.BomList({bomCode: '', version: '', materialCode: '', status: -1, bomName: '', page: 1, pageSize: 10}))
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    UpdateStatus: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.UPDATESTATUS,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("BOM更新成功");
                store.dispatch(TabsAct.TabRemove("bomDetail", "bomList"));
                store.dispatch(TabsAct.TabAdd({ title: "Bom主页", key: "bomList" }));
                dispatch(actions.BomList({bomCode: '', version: '', materialCode: '', status: -1, bomName: '', page: 1, pageSize: 10}))
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },

    CopyBom: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.COPY_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("复制BOM成功");
                store.dispatch(TabsAct.TabRemove("bomCopy", "bomEdit"));
                store.dispatch(TabsAct.TabAdd({ title: "Bom主页", key: "bomList" }));
                dispatch(actions.BomList({bomCode: '', version: '', materialCode: '', status: -1, bomName: '', page: 1, pageSize: 20}))
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    UpgradeBom: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.UPGRADE_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                message.success("升级BOM成功");
                store.dispatch(TabsAct.TabRemove("bomUpgrade", "bomList"));
                store.dispatch(TabsAct.TabAdd({ title: "Bom主页", key: "bomList" }));
                dispatch(actions.BomList({bomCode: '', version: '', materialCode: '', status: -1, bomName: '', page: 1, pageSize: 10}))
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    CheckDate: (pm = {},type) => (dispatch, getState) => {
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.CHECK_DATE,
            pm,
            callBack:true
        }).then((json) => {
            if(type=='upgrade'){
                if (json.status === 2000) {
                    dispatch(actions.UpgradeBom(pm))
                 /*   store.dispatch(TabsAct.TabRemove("bomUpgrade", "bomList"));*/
                }
                else if (json.status === 2110) {
                    dispatch(actions.ModalVisiable(true))
                }else {
                    message.warn(json.message[0].msg)
                }
            }else  if(type=='edit'){
                if (json.status === 2000) {
                    dispatch(actions.EditBom(pm))
                   /* store.dispatch(TabsAct.TabRemove("bomEdit", "bomList"));*/
                }
                else if (json.status === 2110) {
                    dispatch(actions.ModalEditVisiable(true))
                }else {
                    message.warn(json.message[0].msg)
                }
            }else  if(type=='detail'){
                if (json.status === 2000) {
                    dispatch(actions.UpdateStatus(pm))
                    /* store.dispatch(TabsAct.TabRemove("bomEdit", "bomList"));*/
                }
                else if (json.status === 2110) {
                    dispatch(actions.ModalDetailVisiable(true))
                }else {
                    message.warn(json.message[0].msg)
                }
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    ModalVisiable: (value) => (dispatch, getState) => {
        let state = getState()[BOMREDU].set('showModal', value);
        dispatch({ type: BOMREDU, state });
    },
    ModalEditVisiable: (value) => (dispatch, getState) => {
        let state = getState()[BOMREDU].set('showEditModal', value);
        dispatch({ type: BOMREDU, state });
    },
    ModalDetailVisiable: (value) => (dispatch, getState) => {
        let state = getState()[BOMREDU].set('showDetailModal', value);
        dispatch({ type: BOMREDU, state });
    },
    //获取物料编码列表
    MaterialList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: BomUrls.MATERIAL_LIST,
            pm: { materialCode: pm, materialName: pm, page: 1, pageSize: 10, status: 1 }
        }).then((json) => {
            if (json.status === 2000) {
                return json.data.list
            } else { return [] }
        });
    },
    //获取表单物料编码列表
    MaterialFormList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.Fetching(true));
        return ReqApi.get({
            url: BomUrls.PRODUCT_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetMaterialList(json.data));
            }
            return json;
        });
    },
    GetMaterialList: (data) => (dispatch, getState) => {
        let { list } = data;
        let state = getState()[BOMREDU].set('materialSource', list)
        dispatch({ type: BOMREDU, state });
    },
    CleanBomDetail: (data) => (dispatch, getState) => {
        let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'add'], data)
        dispatch({ type: BOMREDU, state });
    },
    CleanMaterialSource: () => (dispatch, getState) => {
        let state = getState()[BOMREDU].set('materialSource', []);
        dispatch({ type: BOMREDU, state });
    },
    GetBom: (bomCode, version, flag) => (dispatch, getState) => {
        if (flag == "detail") {
            let state = getState()[BOMREDU].setIn(['detail', 'bomCode'], bomCode).setIn(['detail', 'version'], version)
            dispatch({ type: BOMREDU, state });
            dispatch(actions.BomDetail({bomCode,version},flag));
        }
        if (flag == "edit") {
            let state = getState()[BOMREDU].setIn(['edit', 'bomCode'], bomCode).setIn(['edit', 'version'], version)
            dispatch({ type: BOMREDU, state });
        }
        if (flag == "copy") {
            let state = getState()[BOMREDU].setIn(['copy', 'bomCode'], bomCode).setIn(['copy', 'version'], version)
            dispatch({ type: BOMREDU, state });
        }
        if (flag == "upgrade") {
            let state = getState()[BOMREDU].setIn(['upgrade', 'bomCode'], bomCode).setIn(['upgrade', 'version'], version)
            dispatch({ type: BOMREDU, state });
        }
    },
    //編輯鎖定 {saleOrderCode:saleOrderCode}
    CheckEdit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.CHECKEDIT,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                store.dispatch(TabsAct.TabAdd({title:"编辑BOM",key:"bomEdit"}));
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },

    GetCodeRule: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.GET_CODERULE,
            pm
        }).then(json => {
            return json;
        })
    },  
}
export default actions