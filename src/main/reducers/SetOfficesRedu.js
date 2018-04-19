import { fromJS, Record ,Map} from 'immutable';
import { SETOFFICESREDU }from '../consts/ActTypes';

let initState=fromJS({
    setOfficesLoading:false,
    set_offices_visible:false,
    officesAddress:[],
});

const SetOfficesRedu=(state=initState,action)=>{
    switch (action.type){
        case SETOFFICESREDU:
            return action.state;
        default:
            return state;
    }
}

export default SetOfficesRedu;