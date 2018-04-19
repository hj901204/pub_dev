import React,{Component} from "react";
import { Tabs } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import MaterialAct from '../../actions/MaterialModule/MaterialAct';
import MTable from '../../../base/components/TableComp';
//import SupplierContactComp from './SupplierContactComp';
//import SupplierAddressCont from '../containers/RenterModule/SupplierAddressCont';
import MaterialInventoryComp from './MaterialInventoryComp';
import MaterialSellComp from './MaterialSellComp';
import MaterialPurchaseComp from './MaterialPurchaseComp';
import MaterialProduceComp from './MaterialProduceComp';
import MaterialPlanComp from './MaterialPlanComp';
const { TabPane } = Tabs;

class MaterialTabsComp extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = { activeKey: '1'};
    }
    handleSubmit1 = (data,callback) => {
        this.props.EditInventoryDetail(data).then(json => {
            if (json.status == "2000") {
                callback && callback();
            }
        });
    }
    handleSubmit2 = (data,callback) => {
        this.props.EditSellDetail(data).then(json => {
            if (json.status == "2000") {
                callback && callback();
            }
        });
    }
    handleSubmit3 = (data,callback) => {
        this.props.EditPurchaseDetail(data).then(json => {
            if (json.status == "2000") {
                callback && callback();
            }
        });
    }

    handleSubmit4 = (data,callback) => {
        this.props.EditProduceDetail(data).then(json => {
            if (json.status == "2000") {
                callback && callback();
            }
        });
    }
    handleSubmit5 = (data,callback) => {
        this.props.EditPlanDetail(data).then(json => {
            if (json.status == "2000") {
                callback && callback();
            }
        });
    }
    render() {
        let {Record,materialBaseSource,inventoryLoading,sellLoading,purchaseLoading,produceLoading,planLoading}= this.props;
        return (
            <div className='TabsComp'>
                <div className='tabs-style'>
                    <div className='left-style'>
                        <MaterialInventoryComp onOk={this.handleSubmit1} loading={inventoryLoading}  {...this.props}/>
                    </div>
                    <div className='right-style'>
                        <MaterialSellComp onOk={this.handleSubmit2} loading={sellLoading} {...this.props}/>
                    </div>
                </div>
                <div className='content-style'>
                    <div className='left-style'>
                         <MaterialPurchaseComp onOk={this.handleSubmit3} loading={purchaseLoading} {...this.props}/>
                    </div>
                    <div className='right-style'>
                        <MaterialProduceComp onOk={this.handleSubmit4} loading={produceLoading} {...this.props}/>
                    </div>
                </div>
                <div className='footer-style'>
                    <MaterialPlanComp onOk={this.handleSubmit5} loading={planLoading} {...this.props}/>
                </div>
             </div>
                    
        );
    }
    
}
const mapStateToProps = (state) => {
    return state.MaterialRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({ 
     hidden_visible:(val)=>dispatch(MaterialAct.Hidden_visible(val)),
     InventoryLoading:(val)=>dispatch(MaterialAct.InventoryLoading(val)),
     EditInventoryDetail: (data) => { return dispatch(MaterialAct.EditInventoryDetail(data)) },
     EditSellDetail: (data) => { return dispatch(MaterialAct.EditSellDetail(data)) },
     EditPurchaseDetail: (data) => { return dispatch(MaterialAct.EditPurchaseDetail(data)) },
     EditProduceDetail: (data) => { return dispatch(MaterialAct.EditProduceDetail(data)) },
     EditPlanDetail: (data) => { return dispatch(MaterialAct.EditPlanDetail(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(MaterialTabsComp);

