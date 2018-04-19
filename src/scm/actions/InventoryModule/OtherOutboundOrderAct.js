/**
 * Created by MW on 2017/7/20.
 * 其它出库单action
 */
import {OTHER_OUTBOUND_ORDER_REDU} from '../../consts/ActTypes'
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import {message} from '../../../base/components/AntdComp'
import TabsAct from '../../actions/TabsAct'
import OtherOutboundOrderCarryOutAct from './OtherOutboundOrderCarryOutAct';
import * as OtherOutboundOrderEditAct from './OtherOutboundOrderEditAct';



let OtherOutboundOrderAct = {

    //加载页面的loading
     loading: (load,flag) => (dispatch, getState) => {
        let state = getState()[OTHER_OUTBOUND_ORDER_REDU].set(load,flag);
        dispatch({type:OTHER_OUTBOUND_ORDER_REDU, state});
    },

    //获取单据类型
    getTypeList: (pm = {}) => (dispatch, getState) => {
        ReqApi.post({
            url: Urls.PUB_BASIC_BUSINESS_GETLIST,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[OTHER_OUTBOUND_ORDER_REDU].set('dataTypeSource',json.data.list);
                dispatch({type:OTHER_OUTBOUND_ORDER_REDU, state});
            }
        });
    },

    //获取其它出库单列表
    getList: (pm ={page:1,pageSize:10,sourceOrderType:15}) => (dispatch, getState) => {
        dispatch(OtherOutboundOrderAct.loading('tableLoading',true));
        ReqApi.get({
            url: Urls.SALE_GETLIST,
            pm,
        }).then((json) => {
            if(json.status===2000){
                let state = getState()[OTHER_OUTBOUND_ORDER_REDU].set('search',pm).set('dataSource',json.data.list)
                    .set('paging',{total:json.data.total, current:json.data.page, pageSize:json.data.pageSize});
                dispatch({type:OTHER_OUTBOUND_ORDER_REDU, state});
            }
            dispatch(OtherOutboundOrderAct.loading('searchLoading',false));
            dispatch(OtherOutboundOrderAct.loading('tableLoading',false));
        });
    },

    //删除单条单据
    confirmDelete: (pm = {}) => (dispatch, getState) => {
        dispatch(OtherOutboundOrderAct.loading('tableLoading',true));
        ReqApi.get({
            url: Urls.SALE_OUT_INVENTORY_DELETE,
            pm,
        }).then((json) => {
            if(json.status===2000){
                message.success('数据删除成功！');
                dispatch(OtherOutboundOrderAct.getList(getState()[OTHER_OUTBOUND_ORDER_REDU].get('search')));
            } else {
                dispatch(OtherOutboundOrderAct.loading('tableLoading',false));
            }
        });
    },

    //单据是否处于锁定状态
    isLock: (flag, pm = {}) => (dispatch, getState) => {
        ReqApi.get({
            url: Urls.ISLOCK,
            pm,
        }).then((json) => {
            if(json.status===2000){
                if(json.data.isLock == 0) {
                    if(flag == 'edit') {

                        dispatch(OtherOutboundOrderEditAct.show(pm.orderCode));

                    } else {
                        //打开执行也面
                        dispatch(TabsAct.TabAdd({title:'执行其他出库单据', key:'inventoryOtherOutboundOrderCarryOut'}));
                        dispatch(OtherOutboundOrderCarryOutAct.getList(pm));
                    }
                } else {
                    message.success('此单据处于锁定中');
                }
            }
        });
    }
}



export default OtherOutboundOrderAct
