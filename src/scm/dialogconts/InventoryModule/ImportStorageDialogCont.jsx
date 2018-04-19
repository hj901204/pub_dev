import React,{Component} from "react";
import { connect } from 'react-redux';
import ImportStorageComp from '../../components/InventoryModule/ImportStorageComp';

import ImportEmployeeAct from '../../actions/InventoryModule/ImportStorageAct';



class ImportStorageDialogCont extends Component{
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
                  /*  this.props.getDepartments()*/
                },1000)
            }
        })
    }
    render() {
        const { importViewVisiable,importViewLoading} = this.props;
        return (
            <div>
                {importViewVisiable ?
                <ImportStorageComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    visible={importViewVisiable}
                    loading={importViewLoading}
                /> : null}
            </div>
            
        );
    }
}

const mapStateToProps = (state) => state.ImportStorageRedu.toJS()

const mapDispatchToProps = (dispatch) => ({
    ProgressVisible:(value)=>{dispatch(ImportEmployeeAct.ProgressVisible(value))},
    Percent:(number)=>{dispatch(ImportEmployeeAct.Percent(number))},
    AlertCancel:()=>{dispatch(ImportEmployeeAct.AlertVisible(false))},
    handleCancel:()=>{dispatch(ImportEmployeeAct.ImportViewVisiable(false))},
    ImportViewVisiable:(value)=>{dispatch(ImportEmployeeAct.ImportViewVisiable(value))},    
    UpLoadFile: (data) => { return dispatch(ImportEmployeeAct.UpLoadFile(data)) }

})


export default connect(mapStateToProps,mapDispatchToProps)(ImportStorageDialogCont);
