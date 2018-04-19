import React, { Component } from "react";
import { Modal, message } from '../../../base/components/AntdComp.js';
import { connect } from 'react-redux';
import SupplierAct from '../../actions/RenterModule/SupplierAct';
// import SupplierAct from '../actions/SupplierAct';
import ImportSupplierViewComp from '../../components/RenterModule/ImportSupplierViewComp';
// import TreeAct from '../../actions/TreeAct'

class ImportSupplierViewCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            percent: 0
        }

    }
    PercentFun = () => {
        let percent = this.state.percent;
        if (percent >= 100) {
            percent = 100;
            clearInterval(this.interval)
        } else {
            percent = this.state.percent + 20;
        }
        this.setState({ percent })
        this.props.Percent(percent)
    }
    handleSubmit = (data) => {
        this.props.UpLoadFile(data).then(json => {
            if (json.status == 2000) {
                this.interval = setInterval(this.PercentFun, 100)
                setTimeout(() => {
                    this.props.ImportViewVisiable(false)
                    this.props.ProgressVisible(false)
                    this.props.Percent(0)
                    this.setState({ percent: 0 })
                    this.props.tablePaging()
                }, 1000)
            }
        })
    }
    render() {
        const { importViewVisiable, importViewLoading, tablePaging } = this.props;
        return (
            <div>
                {importViewVisiable ?
                    <ImportSupplierViewComp
                        {...this.props}
                        onOk={this.handleSubmit}
                        visible={importViewVisiable}
                        loading={importViewLoading}
                    /> : null}
            </div>

        );
    }
}

const mapStateToProps = (state) => state.SupplierRedu.toJS()

const mapDispatchToProps = (dispatch) => ({
    ProgressVisible: (value) => { dispatch(SupplierAct.ProgressVisible(value)) },
    Percent: (number) => { dispatch(SupplierAct.Percent(number)) },
    AlertCancel: () => { dispatch(SupplierAct.AlertVisible(false)) },
    handleCancel: () => { dispatch(SupplierAct.ImportViewVisiable(false)) },
    ImportViewVisiable: (value) => { dispatch(SupplierAct.ImportViewVisiable(value)) },
    UpLoadFile: (data) => { return dispatch(SupplierAct.UpLoadFile(data)) },

})


export default connect(mapStateToProps, mapDispatchToProps)(ImportSupplierViewCont);
