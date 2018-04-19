import React,{Component} from "react";
import WareHousingDetailsComp from '../../components/InventoryModule/WareHousingDetailsComp';
import { connect } from 'react-redux'

class WareHousingDetailsCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        let {newState} = this.props;
        return (
            <div>
                    <WareHousingDetailsComp {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        newState: state.WareHousingDetailsRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
  
})
export default connect( mapStateToProps, mapDispatchToProps )(WareHousingDetailsCont)


