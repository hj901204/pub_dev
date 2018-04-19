import React,{Component} from "react";
import { Form, Input, Button ,Select,Tabs , Modal,message,Dropdown, Menu,Icon,Spin} from '../../../base/components/AntdComp';
import TableComp from "../../../base/components/TableComp"
import TooltipComp from '../../../base/components/TooltipComp'
import { formatNullStr } from '../../../base/consts/Utils'
import moment from "moment";
const FormItem = Form.Item;
const Option = Select.Option;


const columns = [
    {
    title: '行号',
    dataIndex: 'lineNumber',
    key: 'lineNumber',
     render:(text)=>{
        return <span className="lineNum">{text}</span>
    },
    width: '5%',
    className:"lineNum-header"
    }, {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    width: '15%',
    }, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    render:(text)=>{
        return <TooltipComp attr={{text:text, wid: 82, placement: 'bottom'}} />
    },
     width: '14%',
    }, {
    title: '规格',
    dataIndex: 'materialSpec',
    key: 'materialSpec',
    width: '11%',
     render:(text)=>{
        return <TooltipComp attr={{text:text, wid: 82, placement: 'bottom'}} />
    },
    }, {
    title: '型号',
    dataIndex: 'materialModel',
    key: 'materialModel',
    width: '11%',
     render:(text)=>{
        return <TooltipComp attr={{text:text, wid: 82, placement: 'bottom'}} />
    },
    }, {
    title: '批量价格',
    dataIndex: 'batchPrice',
    key: 'batchPrice',
    render: (txt, record, index) => {
        txt = txt && Number(txt).toFixed(2);
       return `${record.currencySymbol}${txt}`
    },
     width: '10%',
    }, {
    title: '税率',
    dataIndex: 'taxRate',
    key: 'taxRate',
    render: (txt, record, index) => {
        txt = Number(txt).toFixed(2);
        return `${txt}%`
    },
     width: '8%',
    }, {
    title: '批量价格含税',
    dataIndex: 'totalAmount',
    key: 'totalAmount', 
    render: (txt, record, index) => {
        txt = txt && Number(txt).toFixed(2);
       return `${record.currencySymbol}${txt}`
    },
     width: '11%',
    }
    , {
    title: '数量',
    dataIndex: 'materialQty',
    key: 'materialQty',  
    render: (txt, record, index) => txt && Number(txt).toFixed(2),
     width: '10%',
    }, {
    title: '单位',
    dataIndex: 'materialUnitName',
    key: 'materialUnitName',
     width: '5%',
}];

class PurchasePriceViewComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            sendLoading:false,
            text:"收起",
            putAway:"展开更多隐藏信息",
            infoClassName:"sale-carryout-info sale-carryout-info-show",
            putAwayClassName:"sale-carryout-info-down sale-carryout-info-down-hide",
            count:0,
            index:0,
            recallDisable:true,
            visible:false,
            submitText:"",
            recallVisible:false,
            recallText: "",
            copyVisible:false,
            copyText: "",
            checkVisible: false,
            checkText: ""
        }
    }

    DistributeTablePaging = (page) => {
        let {paging} = this.props.view;
        paging = {...paging,current:page};
    }
    getCatCodeClassName(catCode){
        switch(catCode){
            case "0":
                return "sale-carryout-title-save";
            case "1":
                return "sale-carryout-title-Distribute";
            case "2":
                return "sale-carryout-title-ship";
            case "3":
                return "sale-carryout-title-close";
            case "4":
                return "sale-carryout-title-Distribute";
            case "5":
                return "sale-carryout-title-close";
            case "6":
                return "sale-carryout-title-Distribute";
            default:    
                return null;
        }
   }
   infoHandle = () =>{
       this.setState({
            count:this.state.count+1,
       })
       if(this.state.count%2==0){
           let putAway = this.state.putAway;
            this.setState({
                text:"收起",
                infoClassName:"sale-carryout-info sale-carryout-info-show",
            })
            if(putAway=="收起更多隐藏信息"){
                this.setState({
                    index:this.state.index+1,
                    putAway:"展开更多隐藏信息",
                    putAwayClassName:"sale-carryout-info-down sale-carryout-info-down-hide"                    
                })
            }
       }else{
        this.setState({
            text:"展开",
            infoClassName:"sale-carryout-info sale-carryout-info-hide",
        })
       }
   }
   putAwayHandle = () =>{
        this.setState({
            index:this.state.index+1,
    })
    if(this.state.index%2==0){
            this.setState({
                putAway:"收起更多隐藏信息",
                putAwayClassName:"sale-carryout-info-down sale-carryout-info-down-show"
            })
    }else{
        this.setState({
            putAway:"展开更多隐藏信息",
            putAwayClassName:"sale-carryout-info-down sale-carryout-info-down-hide"
        })
    }
   }
   submitOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  submitCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  recallOk = (e) => {
    let {detail} = this.props.view;    
    this.setState({
        recallVisible: false,
    });
    this.props.PurchasePriceRecall({ orderCode: detail.orderCode, orderStatus: detail.orderStatus }).then(json => {
        if (json.status === 2000) {
            this.props.TabsRemove();
            this.props.PurchasePriceList({ page: 1, pageSize: 10 });
        }
    })       
    
  }
  recallCancel = (e) => {
    this.setState({
        recallVisible: false,
    });
  }
  checkOk = (e) => {
     let {detail} = this.props.view;
    this.setState({
      checkVisible: false,
     });
    this.props.PurchasePriceSubmit({ orderCode: detail.orderCode, orderStatus: detail.orderStatus }).then(json => {
        if (json.status == 2000) {
            message.success("数据提交成功!");
            this.props.TabsRemove();
            this.props.PurchasePriceList({ page: 1, pageSize: 10 });
        }else if (json.status = 6011) {
            this.setState({
                visible: true,
                submitText:"当前供应商有待审核的采购价格清单，不能再次提交！"
            });
        } else {
            message.error(json.message[0].msg);
        }
    }) 
  }
  checkCancel = (e) => {
    this.setState({
      checkVisible: false,
    });
  }
   handleSubmit = () =>{
        let {detail} = this.props.view;
        let nowTime = moment(moment().format('YYYY-MM-DD')).valueOf();
        let startTime =moment(detail.startTime).valueOf();
        let endTime =moment(detail.endTime).valueOf(); 
        if(startTime<nowTime||endTime<=startTime){
            this.setState({
                visible: true,
                submitText:"生效日期应大于等于当前日期，失效日期应大于生效日期，请检查！"
              });
        } else {
            this.props.PurchasePriceCheckStatus(detail.supplierCode).then(json => {
                if (json.status === 2000) {
                    this.props.PurchasePriceSubmit({orderCode:detail.orderCode,orderStatus:detail.orderStatus}).then(json => {
                        if (json.status == 2000) {
                            message.success("数据提交成功!");
                            this.props.TabsRemove();
                            this.props.PurchasePriceList({ page: 1, pageSize: 10 });
                        } else if (json.status = 6011) {
                            this.setState({
                                visible: true,
                                submitText:"当前供应商有待审核的采购价格清单，不能再次提交！"
                            });
                        } else {
                            message.error(json.message[0].msg);
                        }
                    })
                }else if (json.status == 6000) {
                    this.setState({
                        checkVisible: true,
                        checkText:"当前供应商存在已生效的价格清单，当前价格清单提交审批后会替代原价格清单！"
                      });
                } else {
                    message.error(json.message[0].msg);
                }
            })
        }
   }
    handleRecall = () =>{
        this.setState({
            recallVisible: true,
            recallText:"是否要撤回此单据？"
          });
    }
    handleCopy = () => {
        let {OpenAddPurchasePrice, PurchasePriceCopy, tabs} = this.props; 
        tabs = tabs.map(item=>item.key);
        if (tabs.includes('addPurchasePrice')) {
            this.setState({
                copyVisible: true,
                copyText:"新建页面已打开并且数据未保存，若要继续复制此单据，此单据内容将会覆盖原有数据？"
            });
        } else {
            OpenAddPurchasePrice();
            let newData = JSON.parse(JSON.stringify(this.props.view.detail))
            newData.isTaxValue = [];
            if (newData.includeTaxFlag==1) {
                newData.isTaxValue.push("includeTaxFlag");
            }
            newData.orderStatus = 0;
            newData.list.map(item => {
                item.lineNumber = '';
                return item
            })
            this.props.PurchasePriceCopy(newData);
        }
    }
    copyOk = (e) => {   
        this.setState({
            copyVisible: false,
        });
        this.props.OpenAddPurchasePrice();
        let newData = JSON.parse(JSON.stringify(this.props.view.detail))
            newData.isTaxValue = [];
            if (newData.includeTaxFlag==1) {
                newData.isTaxValue.push("includeTaxFlag");
            }
            newData.orderStatus = 0;
            newData.list.map(item => {
                item.lineNumber = '';
                return item
            })
            this.props.PurchasePriceCopy(newData);
  }
  copyCancel = (e) => {
    this.setState({
        copyVisible: false,
    });
  }
    handleChange = (value) => {
        switch (value) {
            case 'submit':
                this.handleSubmit()
                break;
            case 'recall':
                this.handleRecall()
                break;
            case 'copy':
                this.handleCopy()
                break;
            default:
        }
    };
    handleEdit = (orderCode) => {
        this.props.OpenEditPurchasePrice();
        this.props.PurchasePriceCode(orderCode);
    }
    onClick = (obj) => {
        this.handleChange(obj.key);
    }
    render(){
        let {getFieldDecorator} = this.props.form;
        let {loading,detail,viewList,paging} = this.props.view;
        let menu = (
            <Menu onClick={this.onClick}>
                {detail.orderStatus==0||detail.orderStatus==4||detail.orderStatus==6 ?<Menu.Item key="submit" disabled={false}>提交</Menu.Item>:<Menu.Item key="submit" disabled={true}>提交</Menu.Item>}                
                {detail.orderStatus==1?<Menu.Item key="recall" disabled={false}>撤回</Menu.Item>:<Menu.Item key="recall" disabled={true}>撤回</Menu.Item>}
                {detail.orderStatus == 2 ? <Menu.Item key="copy" disabled={false}>复制</Menu.Item> : <Menu.Item key="copy" disabled={true}>复制</Menu.Item>}
                <Menu.Item key="print">打印</Menu.Item>
            </Menu>
        );
        return (
            <div className="sale-carryout-box">
                <Spin spinning={loading}>
                <Form onSubmit={this.sendSubmit}>
                <div className="sale-carryout-title">
                    <div className="sale-carryout-title-info">
                        <p>采购价格清单号：{formatNullStr(detail.orderCode)}</p>
                        <span>
                            {window.ENUM.getEnum("ProOrderStatus").map(ProOrderStatus => {
                                if(ProOrderStatus.catCode==detail.orderStatus){
                                        return <span key={ProOrderStatus.catCode}>单据状态：<span className={this.getCatCodeClassName(ProOrderStatus.catCode)}>{ProOrderStatus.catName}</span></span>
                                }
                            })}
                            <span>价格清单名称：{formatNullStr(detail.priceName)}</span>
                            <span>供应商：{formatNullStr(detail.supplierName)}</span>
                        </span>
                    </div>
                    <div>
                        {detail.orderStatus == 0 || detail.orderStatus == 4 || detail.orderStatus == 6?
                            <Button 
                            type="primary"  
                            loading={this.state.sendLoading} 
                            onClick={()=>this.handleEdit(detail.orderCode)}>
                                <span className="c2mfont c2m-bianji sale-carryout-title-info-edit"></span>编辑</Button>
                            :null
                        }
                        <Dropdown overlay={menu}><Button type="default" className="select-btn">更多操作 <Icon type="down" /></Button></Dropdown>
                        {this.state.visible?<Modal
                            title="提交"
                            visible={this.state.visible}
                            onOk={this.submitOk}
                            onCancel={this.submitCancel}
                        >
                        {this.state.submitText}
                        </Modal>:null}
                        {this.state.recallVisible ? <Modal
                            title="撤回"
                            visible={this.state.recallVisible}
                            onOk={this.recallOk}
                            onCancel={this.recallCancel}
                            >
                            {this.state.recallText}
                        </Modal>:null}
                        {this.state.copyVisible ? <Modal
                            title="复制"
                            visible={this.state.copyVisible}
                            onOk={this.copyOk}
                            onCancel={this.copyCancel}
                            >
                            {this.state.copyText}
                        </Modal> : null}
                        {this.state.checkVisible ? <Modal
                            title="提交"
                            visible={this.state.checkVisible}
                            onOk={this.checkOk}
                            onCancel={this.checkCancel}
                            >
                            {this.state.checkText}
                        </Modal>:null}        
                    </div>
                </div>
                <div className="sale-carryout-doc-no" onClick={this.infoHandle}>{this.state.text}</div>
                <div className={this.state.infoClassName}>
                    <div className="sale-carryout-info-up">
                        <div className="sale-carryout-info-item">
                            <h3>价格条件</h3>
                            <p><span>价格清单名称：</span>{formatNullStr(detail.priceName)}</p>
                            <p><span>生效日期：</span>{formatNullStr(detail.startTime)}</p>
                            <p><span>截止日期：</span>{formatNullStr(detail.endTime)}</p>
                        </div>
                        <div className="sale-carryout-info-item">
                            <h3>供应商信息</h3>
                            <p><span>供应商编码：</span>{formatNullStr(detail.supplierCode)}</p>
                            <p><span>供应商名称：</span>{formatNullStr(detail.supplierName)}</p>
                        </div>
                        <div className="sale-carryout-info-item sale-carryout-info-item-other">
                            <h3>其他信息</h3>
                            <p><span>币种：</span>{formatNullStr(detail.currencyName)}</p>
                            <p><span>税率：</span>{window.ENUM.getEnum("bool2", detail.includeTaxFlag.toString())}&nbsp;&nbsp;默认{formatNullStr(detail.taxRate)}%</p>
                            <div className="production-carryout-info-putaway-info">
                                <a onClick={this.putAwayHandle}>{this.state.putAway}</a>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.putAwayClassName}>
                        <p><span className="sale-carryout-info-down-title sale-carryout-info-down-price-title">备注：</span><span>{formatNullStr(detail.remark)}</span></p>

                    </div>
                </div>   
            </Form>
                    <div className="sale-carryout-tabs">
                    <TableComp
                            {...this.props}
                            pageOnChange={this.DistributeTablePaging}
                            paging={paging}
                            dataSource = {viewList}
                            cols={columns}
                            rowKey={"lineNumber"}
                            // scroll={{ x: 1583 }}
                            
                        />
                    </div>
                </Spin>
            </div>
        )
    }
}
export default Form.create()(PurchasePriceViewComp)