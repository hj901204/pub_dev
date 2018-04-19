import React,{Component} from "react";
import { connect } from 'react-redux';
import { Modal, message } from "../../../base/components/AntdComp";
import SalePriceListAct from '../../actions/SaleModule/SalePriceListAct';
import SalePriceAddComp from '../../components/SaleModule/SalePriceAddComp';
import SalePriceListComp from '../../components/SaleModule/SalePriceListComp'
import TabsAct from '../../actions/TabsAct';

class SalePriceAddCont extends Component{
    constructor(props, context) {
        super(props, context);
         this.searchPm = { page: 1, pageSize: 10};
    };
    // tablePaging = (page) => {
    //     const { SaleOrderList} = this.props;
    //         SalePriceTableList(this.searchPm);
        
    // };
     handleSubmit = (data) => {
        const { dispatch,loading, handleSubmit, tablePaging, getEditData, Record, getBusinessPartnerData, getCurrencyList, showComponentMsg, supplierloading,GetSalePriceList} = this.props;
        // if (loading) {
        //     return;
        // }
        handleSubmit(data).then(json => {
            if (json.status == "2000") {
                //this.props.getDetailData(json.data);
                dispatch(TabsAct.TabInsert("salePriceList"));
                dispatch(TabsAct.TabRemove("salePriceAdd","salePriceList"));
                //  getEditData(Record.materialCode);
                //  getBusinessPartnerData({
                //      "page": "1",
                //      "pageSize": "10"
                //  });
                //  getCurrencyList({
                //      "page": "1",
                //      "pageSize": "10"
                //  });
                 GetSalePriceList({
                    "page": "1",
                    "pageSize": "10"
                });

                 //showComponentMsg(false);
                 supplierloading(false);
                //  console.log(Record.materialCode);
            } else {
                //console.log('修改职务失败!');
            };
        });
    }
   
    render() {
        const { add_supplier_visiable, supplierLoading } = this.props;
      
        return (
            <SalePriceAddComp
                {...this.props}
                loading={supplierLoading}
                onOk={this.handleSubmit}
            />
        );
   }
}   


SalePriceAddCont.defaultProps = {
    title: "新建销售价格清单",
    width: 800,
    typePage:'add'
}
const mapStateToProps = (state) => {
    return state.SalePriceRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
       supplierloading: (pm)=>{dispatch(SalePriceListAct.supplierLoading(pm))},
       SourceCodeDilog:(value) => dispatch(SalePriceListAct.SourceCodeDilog(value)),
       SourceEditDilog:(value) => dispatch(SalePriceListAct.SourceEditDilog(value)),
       handleSubmit: (data) => { return dispatch(SalePriceListAct.AddSalePrice(data)) },
       detailPriceList:(data)=> dispatch(SalePriceListAct.detailPriceList(data)),
       SalePriceAddDataSource:(data)=> dispatch(SalePriceListAct.SalePriceAddDataSource(data)),
       GetSalePriceList:(pm)=>dispatch(SalePriceListAct.SalePriceList(pm)),
       tabAdd: () => {
        dispatch(TabsAct.TabAdd({
            title:"销售价格清单",
            key:"salePriceList"
        }));
            },
            dispatch,
   
})


export default connect(mapStateToProps,mapDispatchToProps)(SalePriceAddCont);
