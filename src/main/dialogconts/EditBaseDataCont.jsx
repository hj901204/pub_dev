import React from 'react';
import { connect } from 'react-redux';
import EditBaseDataComp from '../components/EditBaseDataComp';
import actions from '../actions/BaseDataAct';
import { base_config } from '../consts/BaseData';

class EditBaseDataCont extends React.Component {
    constructor(props){
        super(props);
    }
    handleSubmit = (data)=>{
        if(typeof base_config[this.props.baseType].code === "undefined"){
            data = {
                list:[{...data ,
                    langName:"",
                    langCode:"",
                    langDesc:""
                }]
            };
        }else{
            data = {
                list:[{...data ,
                    langCode:"",
                    subCode:base_config[this.props.baseType].code,
                }]
            };
        }
        this.props.editRecord(data).then((res)=>{
            if(res.status === 2000){
                this.props.handleCancel();//退出弹出框
                // this.props.clearSearch();//清空筛选条件
                this.props.handleRefresh();
            }else{
                let msg = "";
                res.message.map((item)=>{
                    msg += item.field === null ? item.msg : '';
                })
            }
        });
    }
    render(){
        return (<div>
            <EditBaseDataComp
                {...this.props}
                title={"编辑"+base_config[this.props.baseType].c_name}
                handleSubmit={this.handleSubmit}
            />
        </div>);
    }
}
EditBaseDataCont.defaultProps = {
    flag : 2
}
const mapStateToProps = (state)=>({
    visible:state.BaseDataRedu.toJS().edit_visiable,
    baseType:state.BaseDataRedu.toJS().baseType,
    loading:state.BaseDataRedu.toJS().dialogLoading,
    record:state.BaseDataRedu.toJS().record,
    selectData:state.BaseDataRedu.toJS().selectData
});
const mapDispatchToProps = (dispatch)=>({
    editRecord:(data)=>dispatch(actions.editRecord(data)),
    handleCancel:()=>dispatch(actions.editDialog(false)),
    getCountrys:()=>dispatch(actions.getCountrys()),
    handleChange:{
        setRegion:(code)=>dispatch(actions.setRegion(code)),
        setProvince:(code)=>dispatch(actions.setProvince(code)),
        setCity:(code)=>dispatch(actions.setCity(code)),
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(EditBaseDataCont);