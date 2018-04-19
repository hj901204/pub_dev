import React,{Component} from "react";
import OtherWareHousePageDetailsComp from '../../components/InventoryModule/OtherWareHousePageDetailsComp';
import { connect } from 'react-redux'
class OtherWareHousePageDetailsCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <OtherWareHousePageDetailsComp {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.OtherWareHousePageDetailsRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect( mapStateToProps, mapDispatchToProps )(OtherWareHousePageDetailsCont)


