import { fromJS, Record, Map } from 'immutable';
import { ReqApi } from '../../../base/services/ReqApi';
import { Urls } from '../../../base/consts/urls';
import { SALERETURNADDTABLEREDU, SALE_RETURN_REDU } from '../../consts/ActTypes';

const actions = {

    handleAdd: (data, typePage) => (dispatch, getState) => {
        if (typePage == "copy") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'copy']);
            if (typeof dataSource1.saleReturnDetails === 'undefined') {
                dataSource1.saleReturnDetails = [];
            }
            let dataSource = dataSource1.saleReturnDetails;

            dataSource.unshift(data);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'copy'], { ...dataSource1, list: dataSource });
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "edit") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'edit']);

            console.log(dataSource1);
            if (typeof dataSource1.saleReturnDetails === 'undefined') {
                dataSource1.saleReturnDetails = [];
            }
            let dataSource = dataSource1.saleReturnDetails;

            dataSource.unshift(data);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'edit'], { ...dataSource1, list: dataSource });
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "upgrade") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'upgrade']);

            if (typeof dataSource1.saleReturnDetails === 'undefined') {
                dataSource1.saleReturnDetails = [];
            }
            let dataSource = dataSource1.saleReturnDetails;

            dataSource.unshift(data);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'upgrade'], { ...dataSource1, list: dataSource });
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "add") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'add']);
            console.log('dataSource1:');
            console.log(dataSource1);

            if (typeof dataSource1.saleReturnDetails === 'undefined') {
                dataSource1.saleReturnDetails = [];
            }
            let dataSource = dataSource1.saleReturnDetails;

            console.log(dataSource);
            dataSource.unshift(data);
            console.log(dataSource);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'add'], { ...dataSource1, list: dataSource });
            dispatch({ type: SALE_RETURN_REDU, state });
        }
    },
    onDelete: (data, typePage) => (dispatch, getState) => {
        if (typePage == "copy") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'copy']);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'copy'], { ...dataSource1, list: data });
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "edit") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'edit']);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'edit'], { ...dataSource1, list: data });
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "upgrade") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'upgrade']);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'upgrade'], { ...dataSource1, list: data });
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "add") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'add']);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'add'], { ...dataSource1, list: data });
            dispatch({ type: SALE_RETURN_REDU, state });
        }
    },
    onCellChange: (data, typePage) => (dispatch, getState) => {

        if (typePage == "copy") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'copy']);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'copy'], { ...dataSource1, list: data });
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "edit") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'edit']);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'edit'], { ...dataSource1, list: data });
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "upgrade") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'upgrade']);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'upgrade'], { ...dataSource1, list: data });
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "add") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'add']);
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'add'], { ...dataSource1, list: data });
            dispatch({ type: SALE_RETURN_REDU, state });
        }
    },
    handleChange: (val, flag,typePage) => (dispatch, getState) => {
        if (typePage == "copy") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'copy']);
            let list = dataSource1.saleReturnDetails;

            list.map((item, index) => {
                if (index == flag) {
                    item.detailName = val.materialName;
                    item.detailSpec = val.materialSpec;
                    item.measureUnit = val.measureUnit;
                }
                return item;
            });
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'copy'], { ...dataSource1}, [['list'].concat(list)]);
            dispatch({ type: SALE_RETURN_REDU, state });

        } else if (typePage == "edit") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'edit']);

            let list = dataSource1.saleReturnDetails;
            console.log(dataSource1);
            console.log(list);

            list.map((item, index) => {
                if (index == flag) {
                    item.detailName = val.materialName;
                    item.detailSpec = val.materialSpec;
                    item.measureUnit = val.measureUnit;
                }
                return item;
            });
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'edit'], { ...dataSource1, list: list }, [['list'].concat(list)]);
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "upgrade") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'upgrade']);
            let list = dataSource1.saleReturnDetails;

            list.map((item, index) => {
                if (index == flag) {
                    item.detailName = val.materialName;
                    item.detailSpec = val.materialSpec;
                    item.measureUnit = val.measureUnit;
                }
                return item;
            });
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'upgrade'], { ...dataSource1, list: list }, [['list'].concat(list)]);
            dispatch({ type: SALE_RETURN_REDU, state });
        } else if (typePage == "add") {
            let dataSource1 = getState()[SALE_RETURN_REDU].getIn(['saleReturnDetailInfo', 'add']);

            let list = dataSource1.saleReturnDetails;

            list.map((item, index) => {
                if (index == flag) {
                    item.materialName = val.materialName;
                    item.materialSpec = val.materialSpec;
                    item.measureUnit = val.measureUnit;
                    item.unitPrice = val.unitPrice;

                }
                return item;
            });
            let state = getState()[SALE_RETURN_REDU].setIn(['saleReturnDetailInfo', 'add'], { ...dataSource1, list: list }, [['list'].concat(list)]);
            dispatch({ type: SALE_RETURN_REDU, state });
        }
    },
}

export default actions;