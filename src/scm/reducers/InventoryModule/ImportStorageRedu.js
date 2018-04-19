import { fromJS} from 'immutable';
import { IMPORT_STORAGE_REDU }from '../../consts/ActTypes';

let initState = fromJS({
    tabLoading:false,
    dataSource: [],
    paging:{},
    record: {},
    message:"",
    importViewLoading:false,
    importViewVisiable:false,
    progressVisible:false,
    percent:0,
    errorExcelUrl:"",
    alertVisible:false,
});

const ImportStorageRedu = (state = initState, action) => {
    switch (action.type) {
        case IMPORT_STORAGE_REDU:
            return action.state;    
        default:    
            return state;
    }
}

export default ImportStorageRedu;