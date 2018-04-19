import { fromJS, Record,Map} from 'immutable';
import {ADDRESSREDU} from '../consts/ActTypes';

let initState = fromJS({
    tabLoading: false,
    addressLoading: false,
    add_address_visiable: false,
    edit_address_visiable: false,
    detail: {
        addressCode: "",
        addressName: "",
        addressDetl: "",
        businessValue: [],

        countryCode: "",
        provinceCode: "",
        cityCode: "",
        countyCode: "",

        isReg: 0,
        isMag: 0,
        isRep: 0,
        isSog: 0,
        isBil: 0,
        isOfe: 0,

        isVisible: 0,
        status: 0,
        org: [],

        coordinate: JSON.stringify({
            "lng": 116.404,
            "lat": 39.915,
        })
    },
    select:{
        selectLoading:false,
        countrySource: [],
        provinceSource: [],
        citySource: [],
        countySource: []
    },
    addressId: '',
    dataSource: [],
    paging:{
        // current: page || act.current,
        // total,
        // pageSize
    },
    record:{}
});

const AddressRedu = (state =initState, action) => {
    switch (action.type) {
        case ADDRESSREDU:
            return action.state;
        default:
            return state;
    }
}

export default AddressRedu;