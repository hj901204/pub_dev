import React,{Component} from "react";
import { Modal, message, Tabs, Button, Popconfirm } from '../../../base/components/AntdComp';
import { connect } from 'react-redux';
import SupplierAct from '../../actions/RenterModule/SupplierAct';
import MTable from '../../../base/components/TableComp';
import SupplierContactCont from '../../containers/RenterModule/SupplierContactCont';
import SupplierAddressCont from '../../containers/RenterModule/SupplierAddressCont';
const { TabPane } = Tabs;

class SupplierTabsComp extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = { activeKey: '1'};
    }
    onChange = (activeKey) => {
        this.setState({ activeKey });
      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.supplierId !== this.props.supplierId) {
            this.setState({ activeKey: '1' }, () => this.onChange(this.state.activeKey));
            
        } 
    }
    
    render() {
       let { supplierBaseSource,tabLoading,supplierId, ...props } = this.props;
        return (
                    <Tabs  className="supplierTabs" onChange={this.onChange} activeKey={this.state.activeKey}>
                        <TabPane tab="联系人" key="1">
                            <SupplierContactCont />
                        </TabPane>
                        <TabPane tab="地址" key="2">   
                            <SupplierAddressCont supplierBaseSource={supplierBaseSource} supplierId={supplierId} activeKey={this.state.activeKey} />  
                        </TabPane>
                    </Tabs>
        );
    }
    
}

const mapStateToProps = (state) => {
    return state.SupplierRedu.toJS();
}

const mapDispatchToProps = (dispatch) => ({ 
})

export default connect(mapStateToProps, mapDispatchToProps)(SupplierTabsComp);

