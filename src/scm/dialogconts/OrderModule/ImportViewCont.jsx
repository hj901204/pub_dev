import React,{Component} from "react";
import { Modal, message } from '../../../base/components/AntdComp.js';
import { connect } from 'react-redux';
import ImportViewComp from '../../components/OrderModule/ImportViewComp';
import PurchasePriceAct from '../../actions/OrderModule/PurchasePriceAct';


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
                },1000)
            }
        })
    }
    render() {
        const { importViewVisiable,importViewLoading} = this.props.import;
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

const mapStateToProps = (state) => state.PurchasePriceRedu.toJS()

const mapDispatchToProps = (dispatch) => ({
    ProgressVisible:(value)=>{dispatch(PurchasePriceAct.ProgressVisible(value))},
    Percent:(number)=>{dispatch(PurchasePriceAct.Percent(number))},
    AlertCancel:()=>{dispatch(PurchasePriceAct.AlertVisible(false))},
    handleCancel:()=>{dispatch(PurchasePriceAct.ImportViewVisiable(false))},
    ImportViewVisiable:(value)=>{dispatch(PurchasePriceAct.ImportViewVisiable(value))},    
    UpLoadFile: (data) => { return dispatch(PurchasePriceAct.UpLoadFile(data)) },

})


export default connect(mapStateToProps,mapDispatchToProps)(ImportViewCont);
