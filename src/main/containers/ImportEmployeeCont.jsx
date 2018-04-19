import React,{Component} from "react";
import ImportEmployeeComp from '../components/ImportEmployeeComp';
import { connect } from 'react-redux';
import ImportEmployeeAct from '../actions/ImportEmployeeAct';
import {fromJS,Record} from 'immutable';
import AgainImportViewCont from '../dialogconts/AgainImportViewCont'
class ImportEmployeeCont extends Component{
    constructor(props,context){
        super(props,context);
        this.searchPm = {fileKey:null,page: 1,pageSize: 20};
    }
    tablePaging = (page) => {
        const { tabLoading, PositionList } = this.props;
        if (!tabLoading){
            if (typeof page === "number") {
                this.searchPm.page = page;
            } else {
                this.searchPm = { ...this.searchPm, ...page };
            };
            PositionList(this.searchPm);
        }
    }
    render(){
        return (
            <div>
                <ImportEmployeeComp
                    {...this.props}
                   tablePaging={this.tablePaging}
                />
                <AgainImportViewCont {...this.props}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => state.ImportEmployeeRedu.toJS()
    
const mapDispatchToProps = (dispatch) => ({
    PositionList: (pm) => { dispatch(ImportEmployeeAct.PositionList(pm)); },
    againImportViewVisiable: () => { dispatch(ImportEmployeeAct.againImportViewVisiable(true)); },
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportEmployeeCont);
