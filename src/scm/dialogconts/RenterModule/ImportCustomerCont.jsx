import React,{Component} from "react";
import { Modal, message } from '../../../base/components/AntdComp.js';
import { connect } from 'react-redux';
import ImportCustomerViewComp from '../../components/RenterModule/ImportCustomerViewComp';
import CustomerAct from '../../actions/RenterModule/CustomerAct';


class ImportCustomerCont extends Component{
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
                    this.props.CustomerList()
                },1000)
            }
        })
    }
    render() {
        const { importViewVisiable,importViewLoading} = this.props;
        return (
            <div>
                {importViewVisiable ?
                <ImportCustomerViewComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    visible={importViewVisiable}
                    loading={importViewLoading}
                /> : null}
                
            </div>
            
        );
    }
}

const mapStateToProps = (state) => state.CustomerRedu.toJS()

const mapDispatchToProps = (dispatch) => ({
    ProgressVisible:(value)=>{dispatch(CustomerAct.ProgressVisible(value))},
    Percent:(number)=>{dispatch(CustomerAct.Percent(number))},
    AlertCancel:()=>{dispatch(CustomerAct.AlertVisible(false))},
    handleCancel:()=>{dispatch(CustomerAct.ImportViewVisiable(false))},
    ImportViewVisiable:(value)=>{dispatch(CustomerAct.ImportViewVisiable(value))},    
    UpLoadFile: (data) => { return dispatch(CustomerAct.UpLoadFile(data)) },
    CustomerList:() => {dispatch(CustomerAct.CustomerList({page: 1, pageSize: 10}))}

})


export default connect(mapStateToProps,mapDispatchToProps)(ImportCustomerCont);
