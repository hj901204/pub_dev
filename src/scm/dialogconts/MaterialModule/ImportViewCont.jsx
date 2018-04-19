import React,{Component} from "react";
import { Modal, message } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import ImportViewComp from '../../components/MaterialModule/ImportViewComp';
//import ImportEmployeeAct from '../../actions/MaterialModule/ImportEmployeeAct';
import MaterialAct from '../../actions/MaterialModule/MaterialAct'
//import ImportEmployeeComp from '../components/MaterialModule/ImportEmployeeComp';
//import TreeAct from '../actions/TreeAct'

class ImportViewCont extends Component{
    constructor(props, context) {
        super(props, context);
        this.state={
            visible:false,
            percent:0
        }
        
    }
    PercentFun = () => {
        let percent =  this.state.percent;      
        if (percent >= 100) {
            percent = 100;
            clearInterval(this.interval)
        }else{
            percent = this.state.percent + 20;
        }
        this.setState({percent})    
        this.props.Percent(percent)  
    }
    handleSubmit = (data) => {
        this.props.UpLoadFile(data).then(json=>{
            if(json.status==2000){
                this.interval = setInterval(this.PercentFun,100)
                setTimeout(()=>{
                    this.props.ImportViewVisiable(false)
                    this.props.ProgressVisible(false)
                    this.props.Percent(0)
                    this.setState({percent:0})
                    this.props.MaterialList()
                },1000)
            }
        })
    }
    render() {
        const { importViewVisiable,importViewLoading} = this.props;
        return (
            <div>
                {importViewVisiable ?
                <ImportViewComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    visible={importViewVisiable}
                    loading={importViewLoading}
                /> : null}
            </div>
            
        );
    }
}

const mapStateToProps = (state) => state.MaterialRedu.toJS()

const mapDispatchToProps = (dispatch) => ({
    ProgressVisible:(value)=>{dispatch(MaterialAct.ProgressVisible(value))},
    Percent:(number)=>{dispatch(MaterialAct.Percent(number))},
    AlertCancel:()=>{dispatch(MaterialAct.AlertVisible(false))},
    handleCancel:()=>{dispatch(MaterialAct.ImportViewVisiable(false))},
    ImportViewVisiable:(value)=>{dispatch(MaterialAct.ImportViewVisiable(value))},    
    UpLoadFile: (data) => { return dispatch(MaterialAct.UpLoadFile(data)) },
    MaterialList: (pm) => dispatch(MaterialAct.MaterialList(pm)),

})


export default connect(mapStateToProps,mapDispatchToProps)(ImportViewCont);
