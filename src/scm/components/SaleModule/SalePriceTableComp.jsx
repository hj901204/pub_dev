import React, { Component } from 'react';
import { Button, Popconfirm, message, Select,Table } from '../../../base/components/AntdComp';
import MTable from '../../../base/components/TableComp';
//import SearchComp from '../../../base/components/SearchComp';
//import SearchBarComp from '../../../base/components/SearchBarComp';
import SaleAddLineDialogCont from '../../containers/SaleModule/SaleAddLineDialogCont';
import SaleEditLineDialogCont from '../../containers/SaleModule/SaleEditLineDialogCont';

const Option = Select.Option;


const columns = [
    {
        title: '行号',
        dataIndex: 'lineNumber',
        key: 'lineNumber',
    },
    {
        title: '物料编码',
        dataIndex: 'materialCode ',
        key: 'materialCode ',
    },
    {
        title: '物料名称',
        dataIndex: 'materialName',
        key: 'materialName',
    },{
        title: '数量',
        dataIndex: 'materialQty',
        key: 'materialQty',
    },{
        title: '单位',
        dataIndex: 'materialUnit ',
        key: 'materialUnit ',
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
    }, {
        title: '型号',
        dataIndex: 'model',
        key: 'model',
    }, {
        title: '税率',
        dataIndex: 'taxRate',
        key: 'taxRate',
    }, {
        title: '批量价格含税',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
    },{    
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        
    },{    
        dataIndex: 'handle',
        title: '操作',
        
    }];

class SalePriceTableComp extends Component {
     constructor(props, context) {
        super(props, context);
        // this.state.dataSource =[];
        this.state={
            index:null,
            dataSource:[]
        }
        
          columns[0].render=(txt,record,index)=>
            <a href="#">{record.orderCode}</a>
            columns[columns.length - 1].render = (txt, record, index) =>
                <div>
                    <a href="#" onClick={()=>this.editPriceList(record,index)}>编辑 </a>
                    <Popconfirm title={
                        <div>
                            <h5>你是否确定删除这项内容</h5>
                            <p>删除后，该物料信息将被清除。</p>
                        </div>
                    }
                    onConfirm={()=>this.delPriceList(index)}
                    >
                    <a href="#">删除</a>
                        {/*{record.documentStatus==0?<a href="#">删除</a>:null}*/}
                    </Popconfirm>
                </div>
     }
     SourceCodeDilog = () => {
        this.props.SourceCodeDilog(true);
    }

    editPriceList=(record,index)=>{
        this.props.detailPriceList(record);
        this.props.SourceEditDilog(true);
        this.setState({index:index})
        
    }
    delPriceList=(index)=>{
        // delete this.state.dataSource[index];
        this.state.dataSource.splice(index,1);
        this.forceUpdate();
        //console.log(this.state.dataSource);;
    }
    // componentDidMount() {
    //      this.props.tablePaging();
    //   }
    onAddOk=(data)=>{
        this.state.dataSource.push(data);
        this.props.SourceCodeDilog(false);
        this.props.SalePriceAddDataSource(this.state.dataSource);
    }
    onEditOk=(data)=>{
        this.state.dataSource[this.state.index]=data;
        this.props.SourceEditDilog(false);
    }
    render() {
        let {onSearch,SearchVal,tablePaging, ...props} = this.props;
        return (
            <div className="material">
               <div style={{paddingLeft:40,paddingTop:20}}>
                    <Button type='primary' 
                          onClick={this.SourceCodeDilog}
                          >添加行</Button>
               </div>
               <div className="material-body">
                    {/*<MTable
                        {...props}
                        //loading={tabLoading}
                        cols={columns}
                        rowKey={"lineNumber"}
                        dataSource={dataPriceList}
                        pageOnChange={tablePaging}
                    />*/}
                    <Table dataSource={this.state.dataSource}  columns={columns} />
               </div>
               <SaleAddLineDialogCont  {...this.props} onOk={this.onAddOk}  />
               <SaleEditLineDialogCont  {...this.props} onOk={this.onEditOk}  />
            </div>
        );
    }
     
}

export default SalePriceTableComp;    