import React from 'react';
import { connect } from 'react-redux';
import AddBaseDataComp from '../components/AddBaseDataComp';
import actions from '../actions/BaseDataAct';
import { base_config } from '../consts/BaseData';

class AddBaseDataCont extends React.Component {
    constructor(props){
        super(props);
    }
    handleSubmit = (data)=>{
        if(typeof base_config[this.props.baseType].code === "undefined"){
            data = {
                list:[{...data ,
                    type:"1",
                    langName:"",
                    langCode:"",
                    langDesc:""
                }]
            };
        }else{
            data = {
                list:[{...data ,
                    type:"1",
                    langCode:"",
                    subCode:base_config[this.props.baseType].code
                }]
            };
        }
        this.props.addRecord(data).then((res)=>{
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
            <AddBaseDataComp
                {...this.props}
                title={"新增"+base_config[this.props.baseType].c_name}
                handleSubmit={this.handleSubmit}
            />
        </div>);
    }
}
AddBaseDataCont.defaultProps = {
    flag:1,
    record:[{}]
}
const mapStateToProps = (state)=>({
    visible:state.BaseDataRedu.toJS().add_visiable,
    baseType:state.BaseDataRedu.toJS().baseType,
    loading:state.BaseDataRedu.toJS().dialogLoading,
    selectData:state.BaseDataRedu.toJS().selectData
});
const mapDispatchToProps = (dispatch)=>({
    addRecord:(data)=>dispatch(actions.addRecord(data)),
    handleCancel:()=>dispatch(actions.addDialog(false)),
    getCountrys:()=>dispatch(actions.getCountrys()),
    handleChange:{
        setRegion:(code)=>dispatch(actions.setRegion(code)),
        setProvince:(code)=>dispatch(actions.setProvince(code)),
        setCity:(code)=>dispatch(actions.setCity(code)),
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(AddBaseDataCont);