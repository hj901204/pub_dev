//生产领料申请单
import { ReqApi } from '../../../base/services/ReqApi'
import ProductionReceiveUrls from '../../consts/ProductionReceiveUrls';
import ProductionUrls from '../../consts/ProductionUrls';
import { Urls } from '../../../base/consts/urls';
import ProductionReturnUrls from '../../consts/ProductionReturnUrls';
import { PRODUCTIONRECEIVEREDU } from '../../consts/ActTypes';

const actions = {
    ProductionReceiveList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: ProductionReceiveUrls.PRODUCTIONRECEIVE_GETLIST,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetProductionReceiveList(json.data,pm));
            }

            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRECEIVEREDU].set('tabLoading', value);
        dispatch({ type: PRODUCTIONRECEIVEREDU, state });
    },
    ProReceiveLoading: (value) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRECEIVEREDU].set('proReceiveLoading', value);
        dispatch({ type: PRODUCTIONRECEIVEREDU, state });
    },
    ProducRecLoading: (value, type) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRECEIVEREDU].setIn([type, 'producRecLoading'], value);
        dispatch({ type: PRODUCTIONRECEIVEREDU, state });
    },
    ProducRecListLoading: (value, type) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRECEIVEREDU].setIn([type, 'producRecListLoading'], value);
        dispatch({ type: PRODUCTIONRECEIVEREDU, state });
    },
    //概览Act-----------------------------------------------------------------
    ProductionReceiveViewData: (pm = {}) => (dispatch, getState) => {
        let orderCode = pm.orderCode;
        dispatch(actions.ProReceiveLoading(true));
        dispatch(actions.ProducRecListLoading(true, 'edit'));
        return ReqApi.post({
            url: ProductionReceiveUrls.PRODUCTIONRECEIVE_GETDETAIL,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.GetProRecViewTableList(json.data));
                let state = getState()[PRODUCTIONRECEIVEREDU].set('productionOrderCode', json.data.productionOrderCode);
            }

            dispatch(actions.ProReceiveLoading(false));
            dispatch(actions.ProducRecListLoading(false, 'edit'));
            return json;
        });
    },
    GetProRecViewTableList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[PRODUCTIONRECEIVEREDU].set('proRecbouncedData', data);
        dispatch(actions.GetEditDate(data));
        dispatch({ type: PRODUCTIONRECEIVEREDU, state });
    },
    //编辑页面中数据的回填
    GetEditDate: (data) => (dispatch, getState) => {
        let { productionOrderCode, deptCode, empCode } = data;
        let page = { page: 1, pageSize: 10 };
        dispatch(actions.ProOrderCodeList({ orderCode: productionOrderCode, ...page }, 'edit'));
        dispatch(actions.EmpCodeList({ deptCode: deptCode, ...page }, 'edit'));
        dispatch(actions.getSelectDataList({ orgType: '5', orgCode: deptCode, orgName: deptCode, ...page }, 'edit'));
    },
    //获取详情
    ProductionReceiveView: (pm = {}) => (dispatch, getState) => {
        let orderCode = pm.orderCode;
        dispatch(actions.ProReceiveLoading(true));
        return ReqApi.post({
            url: ProductionReceiveUrls.PRODUCTIONRECEIVE_GETDETAIL,
            pm
        }).then((json) => {
            if (json.status == 2000) {
                let { list, total, page, pageSize } = json.data;
                let state = getState()[PRODUCTIONRECEIVEREDU].set('proReceiveViewData', json.data)
                dispatch({ type: PRODUCTIONRECEIVEREDU, state });
            }

            dispatch(actions.ProReceiveLoading(false));
            return json;
        });
    },
    //----------------------------------------------------------------------------------------------- 
    GetProductionReceiveList: (data,pm) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let statusO = { status: '启用' }
        let statusN = { status: '禁用' }
        // for (let x in list) {
        //     if (list[x].status == '1') {
        //         Object.assign(list[x], statusO);
        //     } else {
        //         Object.assign(list[x], statusN);
        //     }

        // }

        let state = getState()[PRODUCTIONRECEIVEREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize })
            .set("pm",pm);
        dispatch({ type: PRODUCTIONRECEIVEREDU, state });
    },
    //判断编辑页面是否可以打开
    CanPorducRecEdit: (pm = {}, type) => (dispatch, getState) => {

        return ReqApi.get({
            url: ProductionReceiveUrls.PRODUCTIONRECEIVE_ISEDIT,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PRODUCTIONRECEIVEREDU].set('producRecId', pm.requisitionCode).set('sourceType', type).set('productionOrderCode', pm.requisitionCode);
                dispatch({ type: PRODUCTIONRECEIVEREDU, state });
            }
            return json;
        })
    },
    //详情页面中编辑按钮确定code
    ViewEditCode: (pm = {}) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRECEIVEREDU].set('producRecId', pm.requisitionCode);
        dispatch({ type: PRODUCTIONRECEIVEREDU, state });
    },
    //获取生产领料单新增编辑中的列表
    ProOrderList: (pm = {}, type) => (dispatch, getState) => {
        dispatch(actions.ProducRecListLoading(true, type));
        return ReqApi.get({
            url: ProductionReceiveUrls.PRODUCTIONRECEIVE_GETMATER,
            pm
        }).then(json => {
            if (json.status === 2000 || json.status === 2001) {
                let state = getState()[PRODUCTIONRECEIVEREDU].setIn([type, 'proOrderList'], json.data.list)
                dispatch({ type: PRODUCTIONRECEIVEREDU, state });
                dispatch(actions.ProducRecListLoading(false, type));
                return json.data.list;
            } else { return [] };
        })
    },
    //获取生产订单下拉
    ProOrderCodeList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: ProductionReturnUrls.PRODUCTION_LIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PRODUCTIONRECEIVEREDU].setIn([type, 'proOrderCodeList'], json.data.list);
                dispatch({ type: PRODUCTIONRECEIVEREDU, state });
            }
        })
    },
    //获取生产领料单新增编辑中的申请人
    EmpCodeList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.get({
            url: ProductionReturnUrls.EMPLOYEES_GETLIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PRODUCTIONRECEIVEREDU].setIn([type, 'empCodeList'], json.data.list);
                dispatch({ type: PRODUCTIONRECEIVEREDU, state });
            }
        })
    },
    //获取生产领料单新增编辑中的领料组织
    //数型select/获取生产领料单新增编辑中的领料组织
    // getSelectData:(tag,param)=>(dispatch, getState)=>{
    //  dispatch(actions.pDeptName(param.deptNamePm));
    //  },
    // pDeptName:(pm={},type)=>(dispatch, getState)=>{
    //     ReqApi.post({
    //         //url: ProductionUrls.PRODUCTION_DEPTLIST,
    //         url:ProductionUrls.PRODUCTION_ORGLIST,
    //         pm
    //     }).then(json=>{
    //         dispatch(actions.get_pDeptName(json.data));
    //     })
    // },
    // get_pDeptName:(data)=>(dispatch, getState)=>{
    //     let state=getState()[PRODUCTIONRECEIVEREDU].set('pDeptName',data);
    //     dispatch({type: PRODUCTIONRECEIVEREDU, state})
    // },
    getSelectDataList: (pm = {}, type) => (dispatch, getState) => {
        return ReqApi.post({
            url: ProductionUrls.PRODUCTION_ORGLIST,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let state = getState()[PRODUCTIONRECEIVEREDU].setIn([type, 'selectDataList'], json.data.list)
                    .setIn([type, 'empCodeList'], []);
                dispatch({ type: PRODUCTIONRECEIVEREDU, state });
            }
            return json;
        })
    },
    GetSelectData: (type) => (dispatch, getState) => {
        let page = { page: 1, pageSize: 10 };
        let p1, p2, p3;
        if (type == 'add') {
            dispatch(actions.ProducRecLoading(true, 'add'));
            p1 = dispatch(actions.ProOrderCodeList(page, type)),
                // p2 = dispatch(actions.EmpCodeList({ deptCode: '', page: 1, pageSize: 10 }, type));
            p2 = dispatch(actions.getSelectDataList({ orgType: '5', page: 1, pageSize: 10, status:1}, type));
            Promise.all([p1, p2]).then(function () {
                dispatch(actions.ProducRecLoading(false, 'add'));
            })
        } else {
            dispatch(actions.ProducRecLoading(true, 'edit'));
            let requisitionCode = getState()[PRODUCTIONRECEIVEREDU].get('producRecId'),
                productionOrderCode = getState()[PRODUCTIONRECEIVEREDU].get('productionOrderCode');
            dispatch(actions.ProductionReceiveViewData({ requisitionCode }));
            dispatch(actions.ProducRecLoading(false, 'edit'));
        }
    },
    //改变状态
    ChangeType: (type) => (dispatch, getState) => {
        let state = getState()[PRODUCTIONRECEIVEREDU].set('typeName', type);
        dispatch({ type: PRODUCTIONRECEIVEREDU, state });
    },
    //生产领料单更多操作
    ProRecStatus: (status, pm = {}) => (dispatch, getState) => {
        dispatch(actions.ProReceiveLoading(true));
        ReqApi.post({
            url: ProductionReceiveUrls.PRODUCTION_RECEIVE_STATUS(status),
            pm
        }).then((json) => {
            if (json.status == 2000) {
                dispatch(actions.ProductionReceiveList(getState()[PRODUCTIONRECEIVEREDU].get('pm')));
                dispatch(actions.ProductionReceiveView(pm))
            } else {
                dispatch(actions.ProReceiveLoading(false));
            }
        });
    },
    //点击新增页面中的保存按钮
    AddProducRec: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.ProducRecLoading(true, 'add'));
        return ReqApi.post({
            url: ProductionReceiveUrls.PRODUCTIONRECEIVE_ADD,
            pm
        }).then(json => {
            dispatch(actions.ProducRecLoading(false, 'add'));
            if (json.status === 2000) {
                dispatch(actions.ProductionReceiveList(getState()[PRODUCTIONRECEIVEREDU].get('pm')));
                return json;
            }
        })
    },
    //点击编辑页面中的保存按钮
    EditProducRec: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.ProducRecLoading(true, 'edit'));
        return ReqApi.post({
            url: ProductionReceiveUrls.PRODUCTIONRECEIVE_UPDATE,
            pm
        }).then(json => {
            dispatch(actions.ProducRecLoading(false, 'edit'));
            if (json.status === 2000) {
                dispatch(actions.ProductionReceiveList(getState()[PRODUCTIONRECEIVEREDU].get('pm')));
                return json;
            }
        })
    },
    //删除功能
    DelPorducRec: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        ReqApi.post({
            url: ProductionReceiveUrls.PRODUCTIONRECEIVE_DELETE,
            pm
        }).then(json => {
            if (json.status == 2000) {
                dispatch(actions.ProductionReceiveList(getState()[PRODUCTIONRECEIVEREDU].get('pm')));
            }
            dispatch(actions.TabLoading(false));
        })
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
export default actions;
