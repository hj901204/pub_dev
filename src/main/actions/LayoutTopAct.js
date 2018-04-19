import { ReqApi,delJsonHead,delCookie } from '../../base/services/ReqApi'
import { Urls ,LoginUrls} from '../../base/consts/Urls'
import { LAYOUTTOPREDU } from '../consts/ActTypes'
import { message } from '../../base/components/AntdComp';
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'

const actions = {
    GetPersonalInfo: (data) => (dispatch, getState) => {
        let state = getState()[LAYOUTTOPREDU].set('dataSource', data);
        dispatch( {type: LAYOUTTOPREDU, state})
    },
    PersonalInfo: (pm={}) => (dispatch, getState) => {
        // 获取登录 个人信息
        ReqApi.get({
            url: Urls.GET_PERSONAL_INFO,
            pm
        }).then(json => {
            if(json.status == 2000){
                if(json.data){
                    dispatch(actions.GetPersonalInfo(json.data));
                }
            }
        })
    },
    //退出系统
    Logout:(pm={}) => (dispatch, getState) => {
        ReqApi.get({
            url: LoginUrls.LOGIN_LOGOUT,
            pm
        }).then(json => {
            if(json.status == 2000){
                delJsonHead();
                window.location.href=prefix+prefixCh+"login.html";
            }
        })
    },
}

export default actions;