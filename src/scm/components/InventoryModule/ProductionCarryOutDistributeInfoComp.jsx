import React,{Component} from "react";
import TableComp from "../../../base/components/TableComp"
import { Popconfirm } from '../../../base/components/AntdComp';
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
    width: 76,
    fixed: 'left',
    }, {
    title: '物料编码',
    dataIndex: 'materialCode',
    key: 'materialCode',
    width: 149,
    fixed: 'left',
    }, {
    title: '物料名称',
    dataIndex: 'materialName',
    key: 'materialName',
    fixed: 'left',
    render:(text)=>{
        return <TooltipComp attr={{text:text, wid: 139, placement: 'bottom'}} />
    }
    }, {
    title: '仓库',
    dataIndex: 'warehouseName',
    key: 'warehouseName',
    }, {
    title: '仓位',
    dataIndex: 'freightSpaceName',
    key: 'freightSpaceName',
    }, {
    title: '批次号',
    dataIndex: 'batchCode',
    key: 'batchCode',
    }, {
    title: '数量',
    dataIndex: 'materialAmount',
    key: 'materialAmount',
    }, {
    title: '基本单位',
    dataIndex: 'materialUnitName',
    key: 'materialUnitName',
    }
    , {
    title: '创建人',
    dataIndex: 'createByName',
    key: 'createByName',
    }, {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
    }, {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    fixed: 'right',
    width: 66,
    className:"operate-header"
}];

class ProductionCarryOutDistributeInfoComp extends Component{
    constructor(props,context){
        super(props,context);
        this.DistributePagePm = {page:1,pageSize:10,outCode:props.outCode,isPage:0,status:1}
    }
    DistributeTablePaging = (page) => {
        const { distributeTableLoading, DistributeInfoList } = this.props;
        if (!distributeTableLoading){
            if (typeof page === "number") {
                this.DistributePagePm.page = page;
            } else {
                this.DistributePagePm = { ...this.DistributePagePm, ...page, isPage:0};
            };
            DistributeInfoList(this.DistributePagePm);
        }
    }
    render(){
        columns[columns.length - 1].render = (text,record,index) =>{
        let data = {id:record.id} 
           if(record.status==1){
                return ( <div>
                            <Popconfirm title="确定要删除吗?" onConfirm={()=>this.props.DistributeInfoDelete(data)} okText="确定" cancelText="取消">
                                <span className="c2mfont sale-order-distribute c2m-shanchu" title='删除'></span>
                            </Popconfirm>
                        </div>
                )
            }else{
                return <span>--</span>
            }
        }
        columns[1].render= (text,record,index) =>{
           return window.ENUM.getEnum("getAllocateInfoStatus").map(getAllocateInfoStatus => {
                if(getAllocateInfoStatus.catCode==text){
                        return <span key={index}>{getAllocateInfoStatus.catName}</span>
                }
            })
        }
        return (
           <TableComp
                {...this.props}
                pageOnChange={this.DistributeTablePaging}
                paging={this.props.distributePaging}
                dataSource = {this.props.distributeInfoData} 
                cols={columns}
                rowKey={"id"}
                scroll={{ x: 1583 }}
                loading={this.props.distributeTableLoading}
            />
        )
    }
}
export default ProductionCarryOutDistributeInfoComp