import React,{Component} from "react";
import PurchasePriceViewComp from '../../components/OrderModule/PurchasePriceViewComp';
import { connect } from 'react-redux';
import PurchasePriceAct from '../../actions/OrderModule/PurchasePriceAct';
import TabsAct from '../../actions/TabsAct';

class PurchasePriceViewCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    
    render(){
        return (
            <div className='sale-order-box'>
                <PurchasePriceViewComp {...this.props}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
     return Object.assign({},state.PurchasePriceRedu.toJS(),state.TabsRedu.toJS());
}
    
const mapDispatchToProps = (dispatch) => ({
    OpenAddPurchasePrice: () => dispatch(TabsAct.TabAdd({
        title: "新建采购价格清单",
        key: "addPurchasePrice"
    })),
    OpenEditPurchasePrice: () => dispatch(TabsAct.TabAdd({
        title: "编辑采购价格清单",
        key: "editPurchasePrice"
    })),
    TabsRemove: () => { dispatch(TabsAct.TabRemove("purchasePriceView", "purchasePrice"));},
    PurchasePriceView:(data) =>{ dispatch(PurchasePriceAct.PurchasePriceView(data))},
    PurchasePriceList: (pm) => dispatch(PurchasePriceAct.PurchasePriceList(pm)),     
    PurchasePriceSubmit:(data) =>{ return dispatch(PurchasePriceAct.PurchasePriceSubmit(data))},
    PurchasePriceRecall:(data) =>{ return dispatch(PurchasePriceAct.PurchasePriceRecall(data))},
    PurchasePriceCopy: (data) => { dispatch(PurchasePriceAct.PurchasePriceCopy(data)) },
    PurchasePriceCode: (orderCode) => { dispatch(PurchasePriceAct.PurchasePriceCode(orderCode)) },
    PurchasePriceCheckStatus: (supplierCode) => dispatch(PurchasePriceAct.PurchasePriceCheckStatus({supplierCode})),
})

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePriceViewCont);
