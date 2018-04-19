import React, { Component, PropTypes } from "react";
import { Modal, Spin, Button } from './AntdComp';;
import { shouldComponentUpdate } from '../consts/Utils';


class ModalComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            newKey: Math.random(),
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible) {
            this.setState({
                newKey: Math.random(),
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    handleSubmit = () => {
        this.props.handleSubmit && this.props.handleSubmit();
    }
    handleCancel = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.props.handleCancel && this.props.handleCancel(e);
        }
    }
    getFooter = () => ([
        <Button key="submit" type="primary" size="large"
            loading={this.props.loading}
            onClick={this.handleSubmit}
        >
            {this.props.okText || "确定"}
        </Button>,
        <Button key="cancel" type="ghost" size="large"
            loading={this.props.loading}
            onClick={this.handleCancel}
        >
            {this.props.cancelText || "取消"}
        </Button>,
    ])
    getComp = () => { }

    render() {
        const { loading } = this.props;
        return (
            <Modal {...this.props}
                key={this.state.newKey}
                onCancel={this.handleCancel}
                footer={this.getFooter()}
            >
                <Spin spinning={loading}>
                    {this.getComp()}
                </Spin>
            </Modal>
        );
    }
}

ModalComp.defaultProps = {
    loading: false,
}
ModalComp.propTypes = {
    loading: PropTypes.bool,
}

export default ModalComp;


//Example

/*export default class ExampleComp extends ModalComp {
    handleSubmit = () => {
        // your submit func write here
        // or form props.handleSubmit
    }
    getComp = () => {
        // your react node write here
        return <div>...</div>
    }
}
ExampleComp.defaultProps={
    title: 'title',
    okText: 'okText',
    width: 600,
    maskClosable: true,
}
*/