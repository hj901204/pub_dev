import React,{Component} from 'react';
import { Modal, message,Spin } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import SalePriceListAct from '../../actions/SaleModule/SalePriceListAct';
import SaleEditLineDialogComp from '../../components/SaleModule/SaleEditLineDialogComp';

class SaleEditLineDialogCont extends Component{
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        // const { handleSubmit, handleCancel, tablePaging } = this.props;
        // handleSubmit(data).then(json => {
        //     if (json.status === 2000) {
        //         handleCancel();
        //         tablePaging();
        //     }
        // });
         const { handleSubmit, handleCancel, tablePaging,getNewRow } = this.props;
                handleCancel();
               
    }

    
    render() {

        let {visible,form,...props} = this.props;
        return(
            visible?
               <SaleEditLineDialogComp {...props} />: null
        )        
    }
}

SaleEditLineDialogCont.defaultProps = {
    addTitle: "修改物料",
}

const mapStateToProps = (state) =>({
    visible: state.SalePriceRedu.get('sourceEditDilog')
})
const mapDispatchToProps = (dispatch) => ({
     handleCancel: () => { dispatch(SalePriceListAct.SourceEditDilog(false)) },
     MaterialList: (pm) => dispatch(SalePriceListAct.MaterialList(pm)),
    //handleCancel: (type) => { dispatch(SaleReturnAct.SaleReturnDialogVisiable(false, type)); },
    //OriginalOrderList: (searchPm) => {
      //  return dispatch(SaleReturnAct.OriginalOrderList(searchPm))
    //},
    //SaleOrderDetailList: (data, type) => { dispatch(SaleReturnAct.SaleOrderDetailList(data, type))}
    // PurchaseDetailList: (data,type)=>{dispatch(SaleReturnAct.PurchaseDetailList(data,type));}
})


export default connect(mapStateToProps,mapDispatchToProps)(SaleEditLineDialogCont);
