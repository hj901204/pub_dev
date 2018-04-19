/**
 * Created by MW on 2017/3/24.
 */
import { OTHER_OUT_ADD_ROW_DIALOG_REDU } from '../../consts/ActTypes';
import { ReqApi } from '../../../base/services/ReqApi'
import { Urls } from '../../consts/InventoryUrls'

export let show =  (dataSource={}) => (dispatch,getState)=>{
    dispatch(setVisible(true));
    dispatch(setDataSource(dataSource));
}

export let hide =  () => (dispatch,getState)=>{
    dispatch(setVisible(false));
}

export let setVisible =  (bool) => (dispatch,getState)=>{
    let state =  getState()[OTHER_OUT_ADD_ROW_DIALOG_REDU].setIn(["visible"],bool);
    dispatch({type:OTHER_OUT_ADD_ROW_DIALOG_REDU, state});
}
export let setLoading =  (bool) => (dispatch,getState)=>{
    let state =  getState()[OTHER_OUT_ADD_ROW_DIALOG_REDU].setIn(["loading"],bool);
    dispatch({type:OTHER_OUT_ADD_ROW_DIALOG_REDU, state});
}

export let setDataSource =  (dataSource={}) => (dispatch,getState)=>{
    let state =  getState()[OTHER_OUT_ADD_ROW_DIALOG_REDU].setIn(["dataSource"],dataSource);
    dispatch({type:OTHER_OUT_ADD_ROW_DIALOG_REDU, state});
}

export let fetchData =  (pm={}) => (dispatch,getState)=>{
    return ReqApi.get({
        url: Urls.GET_MINDATA_LIST,
        pm
    })
}

