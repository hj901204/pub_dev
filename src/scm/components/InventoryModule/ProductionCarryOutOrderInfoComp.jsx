import React,{Component} from "react";
import TableComp from "../../../base/components/TableComp"
import TooltipComp from '../../../base/components/TooltipComp'
const columns = [{
    title: '行号',
    dataIndex: 'lineNum',
    key: 'lineNum',
    width: 54,
    fixed: 'left',
    render:(text)=>{
        return <span className="lineNum">{text}</span>
    },
    className:"lineNum-header"
    },{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width:82,
    fixed:"left"
    }, {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    width:180,
    fixed:'left'
    }, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    fixed:'left',
    render:(text)=>{
        return <TooltipComp attr={{text:text, wid: 156, placement: 'bottom'}} />
    }
    }, {
    title: '规格',
    dataIndex: 'materialSpec',
    key: 'materialSpec',
    }, {
    title: '型号',
    dataIndex: 'materialModel',
    key: 'materialModel',
    }, {
    title: '计划数量',
    dataIndex: 'planAmount',
    key: 'planAmount',
    }, {
    title: '基本单位',
    dataIndex: 'materialUnitName',
    key: 'materialUnitName',
    }, {
    title: '已分配数量',
    dataIndex: 'allocatedAmount',
    key: 'allocatedAmount',
    }
    , {
    title: '已发货数量',
    dataIndex: 'shippedAmount',
    key: 'shippedAmount',
    }, {
    title: '未清数量',
    dataIndex: 'outstandingAmount',
    key: 'outstandingAmount',
    }, {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    fixed: 'right',
    className:"operate-header"
}];

class ProductionCarryOutOrderInfoComp extends Component{
    constructor(props,context){
        super(props,context);
        columns[1].render= (text,record,index) =>{
            return window.ENUM.getEnum("outDetailStatus").map(outDetailStatus => {
                if(outDetailStatus.catCode==text){
                    return <span key={index}>{outDetailStatus.catName}</span>
                }
            })
        }
        columns[columns.length - 1].render=(text,record,index)=>{
            let data = {outCode:record.outCode,lineNum:record.lineNum}
            if(Number(record.planAmount)>Number(record.allocatedAmount)){
                return <span onClick={()=>props.distributeBtn(data)} className="c2mfont c2m-fenpei sale-order-distribute" title="分配"></span>
            }else{
                return <span>--</span>
            }
         }
        this.OrderPagePm = {page:1,pageSize:10}
    }
    OrderInfoTablePaging = (page) => {
        const { orderTableLoading, carryOutOrderInfoList ,outCode} = this.props; 
        if (!orderTableLoading){
            if (typeof page === "number") {
                this.OrderPagePm.page = page;
                this.OrderPagePm.outCode = outCode;
            } else {
                this.OrderPagePm = { ...this.OrderPagePm, ...page, outCode:outCode };
            };
            carryOutOrderInfoList(this.OrderPagePm);
        }
    }
    render(){
        return (
            <div>
                <TableComp
                    {...this.props}
                    pageOnChange={this.OrderInfoTablePaging}
                    paging={this.props.OrderPaging}
                    dataSource = {this.props.orderInfoData} 
                    cols={columns}
                    rowKey={"id"}
                    scroll={{ x: 1583 }}
                    loading={this.props.orderTableLoading}
                />
            </div>
        )
    }
}
export default ProductionCarryOutOrderInfoComp