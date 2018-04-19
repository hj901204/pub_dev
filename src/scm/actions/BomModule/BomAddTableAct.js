import { ReqApi } from '../../../base/services/ReqApi';
import { fromJS, Record, Map } from 'immutable';
import { Urls } from '../../../base/consts/urls';
import { BOMADDTABLEREDU, BOMREDU } from '../../consts/ActTypes';

const actions = {
    handleAdd: (data, typePage) => (dispatch, getState) => {
        if (typePage == "copy") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'copy']);
            if (typeof dataSource1.list === 'undefined') {
                dataSource1.list = [];
            }
            let dataSource = dataSource1.list;
            dataSource.unshift(data);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'copy'], { ...dataSource1, list: dataSource });
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "edit") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'edit']);
            if (typeof dataSource1.list === 'undefined') {
                dataSource1.list = [];
            }
            let dataSource = dataSource1.list;
            dataSource.unshift(data);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'edit'], { ...dataSource1, list: dataSource });
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "upgrade") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'upgrade']);
            if (typeof dataSource1.list === 'undefined') {
                dataSource1.list = [];
            }
            let dataSource = dataSource1.list;
            dataSource.unshift(data);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'upgrade'], { ...dataSource1, list: dataSource });
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "add") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'add']);
            if (typeof dataSource1.list === 'undefined') {
                dataSource1.list = [];
            }
            let dataSource = dataSource1.list;
            dataSource.unshift(data);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'add'], { ...dataSource1, list: dataSource });
            dispatch({ type: BOMREDU, state });
        }
    },
    onDelete: (data, typePage) => (dispatch, getState) => {
        if (typePage == "copy") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'copy']);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'copy'], { ...dataSource1, list: data });
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "edit") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'edit']);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'edit'], { ...dataSource1, list: data });
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "upgrade") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'upgrade']);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'upgrade'], { ...dataSource1, list: data });
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "add") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'add']);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'add'], { ...dataSource1, list: data });
            dispatch({ type: BOMREDU, state });
        }
    },
    onCellChange: (data, typePage) => (dispatch, getState) => {

        if (typePage == "copy") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'copy']);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'copy'], { ...dataSource1, list: data });
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "edit") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'edit']);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'edit'], { ...dataSource1, list: data });
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "upgrade") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'upgrade']);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'upgrade'], { ...dataSource1, list: data });
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "add") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'add']);
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'add'], { ...dataSource1, list: data });
            dispatch({ type: BOMREDU, state });
        }
    },
    handleChange: (val, flag,typePage) => (dispatch, getState) => {
        if (typePage == "copy") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'copy']);
            let list = dataSource1.list;
            list.map((item, index) => {
                if (index == flag) {
                    item.detailName = val.materialName;
                    item.detailSpec = val.materialSpec;
                    item.measureUnit = val.measureUnit;
                }
                return item;
            });
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'copy'], { ...dataSource1}, [['list'].concat(list)]);
            dispatch({ type: BOMREDU, state });

        } else if (typePage == "edit") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'edit']);
            let list = dataSource1.list;
            list.map((item, index) => {
                if (index == flag) {
                    item.detailName = val.materialName;
                    item.detailSpec = val.materialSpec;
                    item.measureUnit = val.measureUnit;
                }
                return item;
            });
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'edit'], { ...dataSource1, list: list }, [['list'].concat(list)]);
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "upgrade") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'upgrade']);
            let list = dataSource1.list;
            list.map((item, index) => {
                if (index == flag) {
                    item.detailName = val.materialName;
                    item.detailSpec = val.materialSpec;
                    item.measureUnit = val.measureUnit;
                }
                return item;
            });
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'upgrade'], { ...dataSource1, list: list }, [['list'].concat(list)]);
            dispatch({ type: BOMREDU, state });
        } else if (typePage == "add") {
            let dataSource1 = getState()[BOMREDU].getIn(['bomDetailInfo', 'add']);
            let list = dataSource1.list;
            list.map((item, index) => {
                if (index == flag) {
                    item.detailName = val.materialName;
                    item.detailSpec = val.materialSpec;
                    item.measureUnit = val.measureUnit;
                }
                return item;
            });
            let state = getState()[BOMREDU].setIn(['bomDetailInfo', 'add'], { ...dataSource1, list: list }, [['list'].concat(list)]);
            dispatch({ type: BOMREDU, state });
        }
    },
}

export default actions;