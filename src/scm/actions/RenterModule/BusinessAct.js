import { ReqApi } from '../../../base/services/ReqApi'
import BusinessUrls from '../../consts/BusinessUrls';
import { BUSINESSREDU } from '../../consts/ActTypes';


const actions = {
        BusinessTabLoading:(value)=>(dispatch,getState)=>{
            let state=getState()[BUSINESSREDU].set('businessTabLoading',value);
            dispatch({type:BUSINESSREDU,state});
        },
        BusinessPartnerLoading:(value)=>(dispatch,getState)=>{
            let state=getState()[BUSINESSREDU].set('businessPartnerTabLoading',value);
            dispatch({type:BUSINESSREDU,state});
        },
        ContactTabLoading:(value)=>(dispatch,getState)=>{
            let state=getState()[BUSINESSREDU].set('contactTabLoading',value);
            dispatch({type:BUSINESSREDU,state});
        },
        AddressTabLoading:(value)=>(dispatch,getState)=>{
            let state=getState()[BUSINESSREDU].set('addressTabLoading',value);
            dispatch({type:BUSINESSREDU,state});
        },
        BusinessList:(pm={})=>(dispatch,getState)=>{
            dispatch(actions.BusinessTabLoading(true));
            return ReqApi.post({
                url: BusinessUrls.BUSINESS_LIST,//商业伙伴列表
                pm
            }).then((json)=>{
                if(json.status===2000){
                    dispatch(actions.GetBusinessList(json.data));
                    dispatch(actions.BusinessTabLoading(false));
                }
                return json;
            });
        },
        GetBusinessList:(data)=>(dispatch,getState)=>{
            let{list,total,page,pageSize}=data;
            let state=getState()[BUSINESSREDU].set('dataSource',list)
                .set("paging",{total,current:page,pageSize});
            dispatch({type:BUSINESSREDU,state});
        },
        BusinessDetailsId:(bpCode,langCode)=>(dispatch,getState)=>{
            let state=getState()[BUSINESSREDU].set('businessId',bpCode);
            dispatch({type:BUSINESSREDU,state});
            dispatch(actions.BusinessDetailsShow({bpCode:bpCode,langCode:langCode}));
            dispatch(actions.BusinessDetailsContact({bpCode:bpCode,page: 1,pageSize: 10}));
            dispatch(actions.BusinessDetailsAddress({bpCode:bpCode,page: 1,pageSize: 10}));
        },
        BusinessBase:(data)=>(dispatch,getState)=>{
             let state = getState()[BUSINESSREDU].set('businessBase', data);
             dispatch({ type: BUSINESSREDU, state });
        },
        BusinessDetailsShow:(pm={})=>(dispatch,getState)=>{
            dispatch(actions.BusinessPartnerLoading(true));
            return ReqApi.post({
                    url: BusinessUrls.BUSINESS_BASE,//除列表以外
                    pm
                }).then(json => {
                    if (json.status === 2000) {
                        if (json.data) {
                            dispatch(actions.BusinessBase(json.data));
                            dispatch(actions.BusinessPartnerLoading(false));
                        }
                    }
                    return json;
                })
        },
        GetBusinessContactList:(data)=>(dispatch,getState)=>{
            let { list, total, page, pageSize } = data;
            let state=getState()[BUSINESSREDU].set('dataContactSource',list)
                .set("contactPaging",{total,current:page,pageSize});
            dispatch({type:BUSINESSREDU,state});
        },
        BusinessDetailsContact:(pm={})=>(dispatch,getState)=>{
            dispatch(actions.ContactTabLoading(true));
            return ReqApi.post({
                url: BusinessUrls.BUSINESS_CONTACTLIST,//获取联系人列表
                pm
            }).then(json=>{
                if(json.status===2000){
                    dispatch(actions.GetBusinessContactList(json.data));
                    dispatch(actions.ContactTabLoading(false));
                }
                return json;
            })
        },
        GetBusinessAddressList:(data)=>(dispatch,getState)=>{
            let{list,total,page,pageSize}=data;
            let state=getState()[BUSINESSREDU].set('dataAddressSource',list)
                .set("addressPaging",{total,current:page,pageSize});
            dispatch({type:BUSINESSREDU,state});
        },
        BusinessDetailsAddress:(pm={})=>(dispatch,getState)=>{
            dispatch(actions.AddressTabLoading(true));
            return ReqApi.post({
                url: BusinessUrls.BUSINESS_ADDRESSLIST,//获取地址列表
                pm
            }).then(json=>{
                if(json.status===2000){
                    dispatch(actions.GetBusinessAddressList(json.data));
                    dispatch(actions.AddressTabLoading(false));
                }
                return json;
            })
        }     
}
export default actions;