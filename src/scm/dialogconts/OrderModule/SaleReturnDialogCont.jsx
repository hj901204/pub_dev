import React,{Component} from 'react';
import { Modal, message,Spin } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import SaleReturnAct from '../../actions/SaleModule/SaleReturnAct';
import SaleReturnDialogComp from '../../components/SaleModule/SaleReturnDialogComp';

class SaleReturnDialogCont extends Component{
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        let { type } = this.props;

        let {saleReturn_visiable} = this.props[type];
        // console.log(saleReturn_visiable);
        return(
            saleReturn_visiable?
                <SaleReturnDialogComp
                    {...this.props}
               />: null
        )        
    }
}

SaleReturnDialogCont.defaultProps = {
    title: "销售退货明细",
}

const mapStateToProps = (state) =>{
    return state.SaleReturnRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    handleCancel: (type) => { dispatch(SaleReturnAct.SaleReturnDialogVisiable(false, type)); },
    OriginalOrderList: (searchPm) => {
        return dispatch(SaleReturnAct.OriginalOrderList(searchPm))
    },
    SaleOrderDetailList: (data, type) => { dispatch(SaleReturnAct.SaleOrderDetailList(data, type))}
    // PurchaseDetailList: (data,type)=>{dispatch(SaleReturnAct.PurchaseDetailList(data,type));}
})


export default connect(mapStateToProps,mapDispatchToProps)(SaleReturnDialogCont);
