import React, { Component } from "react";
import { Modal } from '../../../base/components/AntdComp.js';

class ImportEmployeeComp extends Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
           <Modal
                title="验证失败"
                visible={this.props.import.alertVisible}
                width={442}
                footer={null}
                style={{marginTop:73}}
                onCancel={this.props.AlertCancel}
            >
                <div className="upload-dialog-alert">
                    <p>请下载错误报表，根据错误提示修复文件后重新上传</p>
                    <a href={this.props.import.errorExcelUrl}>下载错误报表</a>
                </div>
            </Modal>
            
        );
    }
}

export default ImportEmployeeComp;
