import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin} from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import MaterialAct from '../../actions/MaterialModule/MaterialAct'
//import ImportEmployeeAct from '../../actions/MaterialModule/ImportEmployeeAct'
import MaterialComp from '../../components/MaterialModule/MaterialComp'
//import MaterialBaseComp from '../../components/MaterialModule/MaterialBaseComp'
import ImportViewCont from '../../dialogconts/MaterialModule/ImportViewCont'


class MaterialCont extends Component {
  constructor(props, context) {
        super(props, context);
         this.state = {
            // searchPm: {
            //     simpleCode: '', materialCode: '', materialName: '',materialSpec:'', page: 1, pageSize: 20
            // }
            searchPm: {
                page: 1,
                pageSize: 10,
                searchValue: '',
                searchKey: '',
            }
        };
    }
   tablePaging = (pageNum) => {
        let { tabLoading, MaterialList } = this.props;
        if (!tabLoading){
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
        let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
        let pm = { page, pageSize, [searchKey]: searchValue };
           MaterialList(pm).then(json => {
                if (json.status === 2000) {
                } else if (json.status === 4351) {

                };
            });
        }
    }

    // onSearch = (val) => {
    //     if (!this.props.tabLoading){
    //         this.setState({
    //             searchPm: {
    //                ...this.state.searchPm, simpleCode: val, page: 1
    //             }
    //         },() => this.tablePaging());
    //     }
    // }
    onSearch = (searchData) => {
            if (Array.isArray(searchData.val)) {
                searchData.val = `"${searchData.val[0]},${searchData.val[1]}"`;
            }
            if (!this.props.tabLoading) {
                this.setState({
                    searchPm: {
                        ...this.state.searchPm,
                        searchKey: searchData.key,
                        searchValue: searchData.val,
                    }
                }, () => this.tablePaging());
            }
        }




    // onSelect = (val) => {
    //     if (!this.props.tabLoading){
    //         val = parseInt(val);
    //         this.setState({
    //             searchPm: {
    //                 ...this.state.searchPm,
    //                 status: val,
    //                 page: 1, 
    //             }
    //         },() => this.tablePaging());
    //     }
        
    // }
     onSelect = (val) => {
        this.setState({
            searchPm: {
                ...this.state.searchPm,
                searchKey: val
            }
        })

    }

    // onClear = () => {
    //     this.setState({
    //         searchPm: {
    //             ...this.state.searchPm,  materialCode: '',simpleCode:'', materialName: '', materialSpec: '', page: 1
    //         }
    //     },() => this.tablePaging());
    // }
    onClear = () => {
        this.setState({
            searchPm: {
                ...this.state.searchPm,
                searchValue: '',
                page: 1
            }
        }, () => this.tablePaging());
    }
    render() {
        let {materialCode ,simpleCode, materialName, materialSpec } = this.state.searchPm;
        return (           
            <div>
                <MaterialComp {...this.props} 
                    SearchVal={simpleCode || materialCode || materialName || materialSpec}
                    status={status}
                    tablePaging={this.tablePaging}
                    onSearch={this.onSearch}
                    //onSelect={this.onSelect}
                    onClear={this.onClear}
                />
                <ImportViewCont {...this.props}/>
            </div>
        );
    }
}


const mapStateToProps = (state) =>  {   
       return state.MaterialRedu.toJS();
};

const mapDispatchToProps = (dispatch) => ({
    MaterialList: (pm) => dispatch(MaterialAct.MaterialList(pm)),
    materialLoading:()=>dispatch(MaterialAct.materialLoading(true)),
    SupplierBaseLoading:()=>dispatch(MaterialAct.supplierBaseLoading(true)),
    AddModul:()=>dispatch(TabsAct.TabAdd({
            title:"新建物料",
            key:"materialAdd"
     })),
    EditModul:()=>dispatch(TabsAct.TabAdd({
            title:"编辑物料",
            key:"materialEdit"
     })),
    MaterialViewClick:()=>dispatch(TabsAct.TabAdd({
            title:"物料详情",
            key:"materialView"
     })),
    delMaterial:(materialCode)=>dispatch(MaterialAct.delMaterial({materialCode})),
    getCurrencyList:(pm,type)=>dispatch(MaterialAct.getCurList(pm,type)),
    getEditData:(materialCode,type)=>dispatch(MaterialAct.getSupplierData({materialCode},type)),
    MaterialIsDisable:(materialCode,status)=>dispatch(MaterialAct.MaterialIsDisable({materialCode,status})),
    supplierEditData:(data)=>dispatch(MaterialAct.supplierEditData(data)),
    GetCodeRule:()=>dispatch(MaterialAct.GetCodeRule({businessIndex:10})),
    ImportViewVisiable: () =>dispatch(MaterialAct.ImportViewVisiable(true)),
})

export default connect( mapStateToProps, mapDispatchToProps )(MaterialCont)






 




