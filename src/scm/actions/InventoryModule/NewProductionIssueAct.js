/**
 * Created by MW on 2017/4/20.
 */
import {NEWPRODUCTION_ISSUE_REDU} from '../../consts/ActTypes'
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'
import {message} from '../../../base/components/AntdComp'
import TabsAct from '../TabsAct'
import ProductionIssueAct from './ProductionIssueAct'

import { TABSREDU } from '../../consts/ActTypes';
let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}

let NewProductionIssueAct = {
    // Whether load loading
    loading:(loading,flag) => (dispatch, getState) => {
        let state = getState()[NEWPRODUCTION_ISSUE_REDU].set(loading,flag);
        dispatch({type:NEWPRODUCTION_ISSUE_REDU, state});
    },

    getSelectedList: (pm={}) => (dispatch, getState) => {
        let state = getState()[NEWPRODUCTION_ISSUE_REDU].set('dataSource',{});
        dispatch({type:NEWPRODUCTION_ISSUE_REDU,state});
        ReqApi.get({
            url: Urls.PRODUCT_PICKING_GETLIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[NEWPRODUCTION_ISSUE_REDU].set('selectedList',json.data.list);
                dispatch({type:NEWPRODUCTION_ISSUE_REDU,state});
            }
        });
    },

    //onSelect information
    onSelect: (pm ={}) => (dispatch, getState) => {
        dispatch(NewProductionIssueAct.loading('loading',true));
        ReqApi.get({
            url: Urls.PRODUCE_PICKING_GETDETAIL,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                let state = getState()[NEWPRODUCTION_ISSUE_REDU].set('dataSource',json.data);
                dispatch({type:NEWPRODUCTION_ISSUE_REDU,state});
            }
            dispatch(NewProductionIssueAct.loading('loading',false));
        });
    },

    //save the information
    saveInfo: (pm ={}) => (dispatch, getState) => {
        dispatch(NewProductionIssueAct.loading('saveLoading',true));
        dispatch(NewProductionIssueAct.loading('loading',true));
        ReqApi.post({
            url: Urls.SALE_OUT_INVENTORY_ADD,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(TabsAct.TabRemove('inventoryNewProductionIssue','inventoryProductionIssue'));
                if(getStateFun(getState).get('tabs').some((tab) => {
                        return tab.key == 'inventoryProductionIssue'
                    })){
                    dispatch(ProductionIssueAct.getList({page:1, pageSize:10,sourceOrderType:14}));
                }
                dispatch(TabsAct.TabAdd({title:'生产发料单',key:'inventoryProductionIssue'}));
                message.success('保存成功');
            }
            dispatch(NewProductionIssueAct.loading('saveLoading',false));
            dispatch(NewProductionIssueAct.loading('loading',false));
        });
    }
};

export default NewProductionIssueAct