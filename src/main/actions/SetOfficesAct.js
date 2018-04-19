import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import { SETOFFICESREDU } from '../consts/ActTypes';

const actions={
    SetOfficesLoading:(value)=>(dispatch,getState)=>{
        let state = getState()[SETOFFICESREDU].set('setOfficesLoading', value);
        dispatch({type:SETOFFICESREDU, state});
    },
    SetOfficesVisiable:(value)=>(dispatch,getState)=>{
        let state = getState()[SETOFFICESREDU].set('set_offices_visible', value);
        dispatch({ type: SETOFFICESREDU, state });
    },
    SetOffices:(pm={})=>(dispatch,getState)=>{
        dispatch(actions.SetOfficesLoading(true));
        return ReqApi.post({
            url:Urls.BATCH_EDITSITE,
            pm: {
                empCodes: getState().MemberManageRedu.get('memberCodeArr'),
                newSiteCode: pm.officeAddress
            }
        }).then((json)=>{
            dispatch(actions.SetOfficesLoading(false));
            return json
        })
    },
    getSelectSOData:(pm={})=>(dispatch,getState)=>{
        dispatch(actions.SetOfficesLoading(true));
        return ReqApi.get({
            url:Urls.ADDRESS_ALLLIST,
            pm: {
                isReg: 0,
                isMag: 0,
                isRep: 0,
                isSog: 0,
                isBil: 0,
                isOfe: 1,
                // isVisible: "int,是否公开可见, 0否, 1是"
            }
        }).then((json)=>{
            if(json.status===2000){
               dispatch(actions.offAddList(json.data.list));
            }
            dispatch(actions.SetOfficesLoading(false));
        })
    },
    offAddList:(data)=>(dispatch,getState)=>{
        let state=getState()[SETOFFICESREDU].set('officesAddress',data);
        dispatch({type:SETOFFICESREDU,state});
    }
}

export default actions;