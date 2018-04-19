import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import { SITEREDU } from '../consts/ActTypes';

const actions = {
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[SITEREDU].set('tabLoading', value);
        dispatch({ type: SITEREDU, state });
    },
    SiteLoading: (value) => (dispatch, getState) => {
        let state = getState()[SITEREDU].set('siteLoading', value);
        dispatch({ type: SITEREDU, state })
    },
    AddSiteVisiable: (value) => (dispatch, getState) => {
        let state = getState()[SITEREDU].set('add_site_visiable', value);
        dispatch({ type: SITEREDU, state });
    },
    EditSiteVisiable: (value, id) => (dispatch, getState) =>  {
        let state = getState()[SITEREDU].set('edit_site_visiable', value);
        if (id||id===null) state = state.set('siteId', id);
        dispatch({ type: SITEREDU, state });
    },
    GetSiteList: (json) => (dispatch, getState) => {
        let { total, page, pageSize } = json.data;
        let state = getState()[SITEREDU].set('dataSource', json.data.list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: SITEREDU, state });
    },
    Site: (data) => (dispatch, getState) => {
        data.siteUse = [];
        if (data.isSog == 1) //仓储管理
            data.siteUse.push("isSog");
        if (data.isPrd == 1) //生产制造
            data.siteUse.push("isPrd");
        if (data.isDot == 1) //服务网点
            data.siteUse.push("isDot");
        let state = getState()[SITEREDU].set('detail', data);
        dispatch({ type: SITEREDU, state });
    },
    SiteList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: Urls.SITE_LIST,
            pm,
            type: 'SiteList'
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetSiteList(json));
            }    
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    SiteDel: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: Urls.SITE_DEL,
            pm,
            type: 'SiteDel'
        }).then(json => {
            dispatch(actions.TabLoading(false));
            return json;
        })
    },
    SiteDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SiteLoading(true));
        return ReqApi.get({
            url: Urls.SITE_DETAIL,
            pm,
            type:'SiteDetail'
        }).then(json => {
            if (json.status === 2000) {
                let _data = json.data.list[0];
                if (json.data.list.length) {
                    dispatch(actions.OrgList({ orgCode: _data.orgCode, orgName: _data.orgCode, page: 1, pageSize: 10 }));
                    dispatch(actions.Site(_data));
                }
            }
            dispatch(actions.SiteLoading(false));
            return json;
        });
    },
    AddSite: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SiteLoading(true));
        return ReqApi.post({
            url: Urls.SITE_ADD,
            pm,
            type: 'AddSite'
        }).then(json => {
            dispatch(actions.SiteLoading(false));
            return json
        })
    },
    EditSite: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SiteLoading(true));
        let siteCode=getState()[SITEREDU].get('siteId');
        return ReqApi.post({
            url: Urls.SITE_EDIT,
            pm,
            type: 'EditSite'
        }).then(json => {
            dispatch(actions.SiteLoading(false));
            return json
        })
    },

        
    SiteDisable: (pm = {}) => (dispatch, getState) => {
       dispatch(actions.TabLoading(true));
        return ReqApi.post({
           url:Urls.SITE_ISDISABLE,
           pm,
           type: 'SiteDisable'
        }).then(json=>{
            dispatch(actions.TabLoading(false));
            return json
        })
    },
    
   OrgList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.ORG_LIST,
            pm: { orgType: "1", ...pm },
            type: 'OrgList'
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[SITEREDU].set('orgList', json.data.list)
                dispatch({ type: SITEREDU, state });
            }
        })
    },

    OrgDetail: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.DEPARTMENT_DETAIL,
            pm,
            type: 'OrgDetail'
        }).then(json => {
            if (json.status === 2000) {
            }
            return json;
        })
        
    },
    AddressDetail: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: Urls.ADDRESS_DETAIL,
            pm,
            type: 'AddressDetail'
        }).then(json => {
            if (json.status === 2000) {
            }
            return json;
        })
    },
}

export default actions;