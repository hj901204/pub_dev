import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'antd';
import OtherOutAddRowDialogComp from '../../components/InventoryModule/OtherOutAddRowDialogComp';
import * as OtherOutEditRowDialogAct  from '../../actions/InventoryModule/OtherOutEditRowDialogAct';

const mapStateToProps = (state) => state.OtherOutEditRowDialogRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
   actions:bindActionCreators(OtherOutEditRowDialogAct,dispatch)
});

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(OtherOutAddRowDialogComp));
