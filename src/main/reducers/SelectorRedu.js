import * as AT from '../consts/ActTypes';

const filtrSelecedData = (currentData, allSelecedData,selecedCount) => {
    for (var sdata of allSelecedData) {
        for (var cdata of currentData) {
            if (sdata.userID === cdata.userID){
                cdata.ischecked = true;
                selecedCount++;
            }
        }
    }
    return currentData;
}
const initialState = {
    loading:false,
    lightId:0,
    selecedData: [],
    sourceData: [],
    currentData: [],
    selecedCount:0,
    currentCount:0,
    searchData: null,
    record:{id:0,name:""}
}

const SelectorRedu = (state = initialState, act) => {
     switch (act.type) {
        case AT.SELECTOR_VISIBLE:
            return {
                ...state,
                ...act
            }
            break;
        case AT.SELECTOR_SELECTED_TREE:
            return {
                ...state,
                record:act.record,
                lightId:act.lightId
            }
            break;
        case AT.SELECTOR_EMPTY:
            return {
                ...state,
                loading:false,
                lightId:0,
                record:{id:0,name:""},
                selecedData: [],
                sourceData: [],
                currentData: [],
                currentCount:0,
                searchData: null
            }
            break;
        case AT.SELECTOR_LOADING:
            return {
                ...state,
                loading:true
            }
            break;
        case AT.SELECTOR_CHECK_ALL_SELECED:
            let userIds = state.currentData.map((item) => {return item.userID});
            let newCurrentData = state.currentData.map((item) => {
                item.ischecked = act.payload;
                return item;
            });
            let count = state.currentData.length;
            let newSeleced = [];
            if(act.payload)
                newSeleced = state.selecedData.filter((elem, i) => {
                    return userIds.indexOf(elem.userID) == -1
                })
            return {
                ...state,
                currentData:newCurrentData,
                selecedCount:act.payload?count:0,
                selecedData:act.payload?[
                    ...newSeleced,
                    ...newCurrentData
                ]: state.selecedData.filter((elem, i) => {
                    return userIds.indexOf(elem.userID) == -1
                })
            }
            break;
        case AT.SELECTOR_UPDATE_CURRENT_SELECED:
            var k = 0;
            var newCurrentData = state.currentData.map((item) => {
                if(item.empCode === act.data.selecedItem.empCode){
                    item.ischecked = act.data.isAdd;
                    k++;
                }
                return item;
            });
            return {
                ...state,
                selecedCount:act.data.isAdd?state.selecedCount+k:state.selecedCount-k,
                currentData: newCurrentData,
                selecedData: act.data.isAdd ? [
                    ...state.selecedData,
                    act.data.selecedItem
                ] : state.selecedData.filter((elem, i) => {
                    return act.data.selecedItem.empCode !== elem.empCode
                })
            };
            break;
        case AT.SELECTOR_INSERT_SELECED:
             return {
                ...state,
                selecedData: act.selecedItem
            };
            break;
        case AT.SELECTOR_GET_USERSBYDEP:
            var k = 0;
            var usersIds = state.selecedData.map((item) => {return item.empCode}); 
            var newCurrentData = act.payload.map((item) => {
                    if(usersIds.indexOf(item.empCode) != -1){
                        item.ischecked = true;
                        k++;
                    }
                    return item;
                }
            );
            return {
                ...state,
                searchData: null,
                loading: false,
                selecedCount: k,
                currentData: newCurrentData,
                currentCount: newCurrentData.length
            };
            break;
        case AT.SELECTOR_GET_DEPARTMENTS:
            return {
                ...state,
                loading: false,
                sourceData: act.payload
            }
        case AT.SELECTOR_SEARCH_SELECED:
            let cData = [];
            if (act.key.length > 0) {
                cData = state.currentData.filter((item) => {
                    return item
                        .empName
                        .includes(act.key)
                })
            }else{
                cData = null;
            }
            return {
                ...state,
                searchData: cData
            };
            break;
        default:
            return state;
     }

}

export default SelectorRedu;
