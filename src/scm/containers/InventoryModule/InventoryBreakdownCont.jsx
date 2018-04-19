import React,{Component} from "react";
import InventoryBreakdownComp from '../../components/InventoryModule/InventoryBreakdownComp';
import { connect } from 'react-redux';
import actions from '../../actions/InventoryModule/InventoryBreakdownAct';
class InventoryBreakdownCont extends Component{
    constructor(props,context){
        super(props,context);
        //this.searchPm = {page: 1,pageSize: 10};
    }
  
    // tablePaging = (page) => {
    //     const { listLoading, InventoryList } = this.props;
    //     if (!listLoading){
    //         if (typeof page === "number") {
    //             this.searchPm.page = page;
    //         } else {
    //             this.searchPm = { ...this.searchPm, ...page };
    //         };
    //         InventoryList(this.searchPm);
    //     }
    // }
    render(){
        return (
             <InventoryBreakdownComp {...this.props}/>
        )
    }
}
const mapStateToProps = (state) => state.InventoryBreakdownRedu.toJS();
    
const mapDispatchToProps = (dispatch) => ({
     InventoryList: (data) =>{ dispatch(actions.InventoryList(data))},
})

export default connect(mapStateToProps, mapDispatchToProps)(InventoryBreakdownCont);
