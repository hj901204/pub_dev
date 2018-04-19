import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'antd';
import OtherOutAddRowDialogComp from '../../components/InventoryModule/OtherOutAddRowDialogComp';
import * as OtherOutAddRowDialogAct  from '../../actions/InventoryModule/OtherOutAddRowDialogAct';

const mapStateToProps = (state) => state.OtherOutAddRowDialogRedu.toJS()

const mapDispatchToProps = (dispatch) => ({
   actions:bindActionCreators(OtherOutAddRowDialogAct,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(OtherOutAddRowDialogComp));
