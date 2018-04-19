/**
 * Created by MW on 2017/3/20.
 */
import React,{Component} from "react";
import {connect} from "react-redux";
import PageLoadingComp from "../../../base/components/PageLoadingComp";

const  mapStateToProps = (state)=>{
    return state.PageLoadingRedu.toJS()
};
export default connect(mapStateToProps)(PageLoadingComp);
