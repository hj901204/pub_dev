import React,{Component} from "react";
import { connect } from 'react-redux'
import AddOtherWareHousePageDialogComp from '../../components/InventoryModule/AddOtherWareHousePageDialogComp';
import AddOtherWareHousePageDialogAct from '../../actions/InventoryModule/AddOtherWareHousePageDialogAct';
import AddOtherWareHousePageAct from '../../actions/InventoryModule/AddOtherWareHousePageAct';
class AddOtherWareHousePageDialogCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    handleCancel = () => {
        if (!this.props.newState.tableLoading) {
            this.props.hide();
        }
    }
    render(){
        let {newState} = this.props;
        return (
                  newState.visible?<AddOtherWareHousePageDialogComp 
                  //loading={newState.tableLoading} 
                  visible={ newState.visible}
                  handleCancel={this.handleCancel}
                  {...this.props}/>:null
        );
    }
}
AddOtherWareHousePageDialogComp.defaultProps = {
    title: "物料选择",
    width: 750,
    maskClosable: true
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.AddOtherWareHousePageDialogRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
      takeBtnLoading:()=>{
        dispatch(AddOtherWareHousePageDialogAct.btnLoading(true))
    },
     PurchaseList: (pm) => {
        dispatch( AddOtherWareHousePageDialogAct.PurchaseList(pm) )
    },
    hide:()=>{
        dispatch(AddOtherWareHousePageDialogAct.hide(false))
    },
    checkedTableList: (val) => {
        dispatch(AddOtherWareHousePageAct.checkedTableList(val))
    },
})
export default connect( mapStateToProps, mapDispatchToProps )(AddOtherWareHousePageDialogCont)


