import React,{Component} from "react";
import { connect } from "react-redux";
import BaseDataComp from '../components/BaseDataComp';
import AddBaseDataCont from '../dialogconts/AddBaseDataCont';
import EditBaseDataCont from '../dialogconts/EditBaseDataCont';
import actions from "../actions/BaseDataAct";
class BaseDataCont extends Component{
    constructor(prop){
        super(prop);
    }
    handleRefresh = (pm)=>{
        let page = this.props.searchPm;
        if(typeof pm === "number"){
            page.page = pm;
        }else{
            page = pm;
        }
        this.props.refreshTable(page);
    }
    handleDelete = (code)=>{
        this.props.deleteItem(code).then((res)=>{
            if(res.status === 2000){
                // this.props.clearSearch();//清空筛选条件
                this.props.refreshTable();//刷新列表
            }else{
                let msg = "";
                res.message.map((item)=>{
                    msg += item.field === null ? item.msg : '';
                })
            }
        });
    }
    render(){
        return (
            <div className="base-data">
                <BaseDataComp {...this.props} handleRefresh={this.handleRefresh} handleDelete={this.handleDelete}/>
                <AddBaseDataCont clearSearch={this.props.clearSearch} handleRefresh={this.handleRefresh}/>
                <EditBaseDataCont clearSearch={this.props.clearSearch} handleRefresh={this.handleRefresh}/>
            </div>
        );
    }
}
const mapStateToProps = (state)=>state.BaseDataRedu.toJS();
const mapDispatchToProps = (dispatch)=>({
    selectType:(type)=>dispatch(actions.selectType(type)),
    refreshTable:(page)=>dispatch(actions.refreshTable(page)),
    addDialog:(bool)=>dispatch(actions.addDialog(bool)),
    getRecord:(code)=>dispatch(actions.getRecord(code)),
    deleteItem:(code)=>dispatch(actions.deleteItem(code)),
    clearSearch:()=>dispatch(actions.clearSearch()),
    resetFlagFun:(bool)=>dispatch(actions.resetFlagFun(bool))
});
export default connect(mapStateToProps,mapDispatchToProps)(BaseDataCont);