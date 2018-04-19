import React, { Component, PropTypes } from "react";
import { Button, Upload, Progress } from '../../../base/components/AntdComp.js';
import FormModalComp from '../../../base/components/FormModalComp';
import { Urls } from '../../../base/consts/Urls';
import { prefix, prefix_route, prefixPub, prefixCh } from '../../../base/consts/UrlsConfig'
import { jsonHead } from '../../../base/services/ReqApi'
import ImportSupplierComp from './ImportSupplierComp';

class ImportSupplierViewComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
            importFile: {
                fileUrl: "",
            },
            fileList: [],
            beginUpDisabled: true,
            uploadDialogButton: "upload-dialog-button",
        }
        this.files = {
            name: 'file',
            action: Urls.COMMON_UPLOAD_FILE,//'http://10.99.2.70:9098/pub/common/uploadfile',//Urls.COMMON_UPLOAD_FILE,
            onChange: this.handleChange,
            showUploadList: { showPreviewIcon: false, showRemoveIcon: false },
            accept: ".xls,.xlsx",
            headers: {
                authorization: 'authorization-text',
                tokenId: jsonHead.tokenId,
            },
            data: {
                module: "importexcle"
            }
        }
    }
    handleChange = (info) => {
        if (info.file.status == "done") {
            this.setState({
                importFile: {
                    ...this.state.importFile,
                    fileUrl: info.file.response.data.fileURL,
                },
                beginUpDisabled: false,
                uploadDialogButton: "",

            })
        }
        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        this.setState({ fileList: fileList })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onOk(this.state.importFile)
    }
    getFooter = () => ([
        <Button key="submit" type="primary" size="large" className={this.state.uploadDialogButton}
            loading={this.props.loading}
            onClick={this.handleSubmit}
            disabled={this.state.beginUpDisabled}
        >
            {this.props.okText}
        </Button>
    ])

    getComp = () => {
        return (
            <div className="upload-dialog">
                <div className="upload-tiitle">
                    <p>请选择需要导入的文件</p>
                    <a href="http://10.99.2.217/importexcel/1yKJg8vC1uY504170354968.xlsx">下载《供应商导入模版》</a>
                </div>
                <div className="dialog-inner">
                    <Upload {...this.files} fileList={this.state.fileList}>
                        <Button type="upload" className="upload-through">选择文件</Button>
                    </Upload>
                    {this.props.progressVisible ?
                        <Progress percent={this.props.percent} strokeWidth={8} /> : null
                    }

                </div>
                <div className="upload-alert">
                    <p className="upload-alert-title">温馨提示：</p>
                    <p>1.文件后缀格式为xls或者xlsx</p>
                    <p>2.文件大小必须保证在10M以内，每次导入数据不超过1000条</p>
                </div>
                <ImportSupplierComp {...this.props} />
            </div>
        )

    }
}

ImportSupplierViewComp.defaultProps = {
    title: '批量导入',
    okText: '开始导入',
    width: 690,
    maskClosable: true,
    disable: true

}
export default ImportSupplierViewComp;
