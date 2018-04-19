import React,{Component} from "react";
import { Modal, message } from "../../../base/components/AntdComp";
import { connect } from 'react-redux';
import SalePriceListAct from '../../actions/SaleModule/SalePriceListAct';
import SalePriceEditComp from '../../components/SaleModule/SalePriceEditComp';
import TabsAct from '../../actions/TabsAct';

class SalePriceEditCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    
    handleSubmit = (data) => {
        const { loading, handleSubmit, handleCancel, getEditData, materialBaseSource,tabAdd, tabRemove,supplierloading,showComponentMsg } = this.props;
        

        handleSubmit(data).then(json => {
            if (json.status == "2000") {
                getEditData(materialBaseSource.orderCode);
                this.props.tabAdd();
                this.props.tabRemove();
                //showComponentMsg(false);
                //supplierloading(false);
            }
        }); 
    }

    render() {
         const { visible, supplierloading } = this.props;
        return (
                <SalePriceEditComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    loading={supplierloading}
                   // initData={this.initData}
                />
        );
    }
}

SalePriceEditCont.defaultProps = {
    title: "编辑销售价格清单",
    width: 800,
     typePage:'edit'
}

const mapStateToProps = (state) => {
    return state.SalePriceRedu.toJS();
}
const mapDispatchToProps = (dispatch, ownProps) => ({
        supplierloading: (pm)=>{dispatch(SalePriceListAct.supplierLoading(pm))},
        SourceCodeDilog:(value) => dispatch(SalePriceListAct.SourceCodeDilog(value)),   
        SourceEditDilog:(value) => dispatch(SalePriceListAct.SourceEditDilog(value)),
        detailPriceList:(data)=> dispatch(SalePriceListAct.detailPriceList(data)),
        SalePriceAddDataSource:(data)=> dispatch(SalePriceListAct.SalePriceAddDataSource(data)),
        getEditData:(orderCode)=>dispatch(SalePriceListAct.getSupplierData({orderCode})),
        handleSubmit: (data) => { return dispatch(SalePriceListAct.EditSalePrice(data)) },
        tabAdd: () => {
            dispatch(TabsAct.TabAdd({
                title:"销售价格清单详情",
                key:"salePriceDetail"
            }));
        },
        tabRemove: () =>{
            dispatch(TabsAct.TabRemove("salePriceEdit","salePriceDetail"));
        }
})


export default connect(mapStateToProps,mapDispatchToProps)(SalePriceEditCont);