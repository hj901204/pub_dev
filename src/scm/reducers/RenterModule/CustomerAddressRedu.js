import { fromJS, Record ,Map} from 'immutable';
import { CUSTOMERADDRESSREDU } from '../../consts/ActTypes';
let initState = fromJS({
    addressTabLoading: false,
    addressLoading: false,
    refAddressLoading: false,
    add_address_visiable: false,
    edit_address_visiable: false,
    addressId: null,
    detail: {
        addressCode: '',
        addressName: '',
        countryCode: '',
        provinceCode: '',
        cityCode: '',
        countyCode: '',
        addressDetl: '',
        langCode:'',
        isRep: 0,
        isSog: 0,
        isBil: 0,
        repDefault:0,
        sogDefault:0,
        bilDefault: 0,
        coordinate: JSON.stringify({
            "lng": 116.404,
            "lat": 39.915,
        }),
        businessValue: []
    },
    refAddressDataSource: [],
    addressDataSource: [],
    langCode: '',
    paging: {
        // current: page || act.current,
        // total,
        // pageSize
    },
    record: {},
});

const CustomerAddressRedu = (state = initState, action) => {
    switch (action.type) {
        case CUSTOMERADDRESSREDU:  
            return action.state;    
        default:    
            return state;
    }
}

export default CustomerAddressRedu;