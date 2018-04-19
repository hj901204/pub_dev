/**
 * Created by MW on 2017/3/17.
 */
import React from 'react';
import PersonManageComp from '../components/PersonManageComp'
import {connect} from 'react-redux'
import personManageAct from '../actions/PersonManegeAct'


let mapStateToProps = (state) => state.PersonManageRedu.toJS();

let mapDispatchToProps = (dispatch) => ({
    disableEmployees: () => {
         dispatch(personManageAct.disableEmployees(1,1));
    },
    organizationChart: (data) => {
        dispatch(personManageAct.organizationChart({data}));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(PersonManageComp)
