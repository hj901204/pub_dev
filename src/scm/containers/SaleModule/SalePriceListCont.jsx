import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin} from '../../../base/components/AntdComp';
import TabsAct from '../../actions/TabsAct';
import SalePriceListAct from '../../actions/SaleModule/SalePriceListAct'
import SalePriceListComp from '../../components/SaleModule/SalePriceListComp'
//import MaterialBaseComp from '../../components/MaterialModule/MaterialBaseComp'
class SalePriceListCont extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            searchPm: {
                page: 1,
                pageSize: 10,
                searchValue: '',
                searchKey: '',
            }
        };

    }
    tablePaging = (pageNum) => {
        let { tabLoading, SalePriceList } = this.props;
        if (!tabLoading){
            if (typeof pageNum === "number") {
                this.state.searchPm.page = pageNum;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...pageNum };
            };
        let { page, pageSize, searchKey, searchValue } = this.state.searchPm;
        let pm = { page, pageSize, [searchKey]: searchValue };
           SalePriceList(pm).then(json => {
                if (json.status === 2000) {
                } else if (json.status === 4351) {

                };
            });
        }
    }
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
    onSelect = (val) => {
        this.setState({
            searchPm: {
                ...this.state.searchPm,
                searchKey: val
            }
        })

    }
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
        let {orderCode , priceName, orderStatus,startTime } = this.state.searchPm;
        return (
            <div>
                <SalePriceListComp {...this.props}
                    SearchVal={orderCode || priceName || orderStatus || startTime}
                    status={status}
                    tablePaging={this.tablePaging}
                    onSearch={this.onSearch}
                    //onSelect={this.onSelect}
                    onClear={this.onClear} 
                />
            </div>
        )
    }
}
const mapStateToProps = (state) =>  {   
       return state.SalePriceRedu.toJS();
};

const mapDispatchToProps = (dispatch) => ({
    SalePriceList: (pm) => dispatch(SalePriceListAct.SalePriceList(pm)),
    materialLoading:()=>dispatch(SalePriceListAct.materialLoading(true)),
    AddModul:()=>dispatch(TabsAct.TabAdd({
            title:"新建销售价格清单",
            key:"salePriceAdd"
     })),
    EditModul:()=>dispatch(TabsAct.TabAdd({
             title:"编辑销售价格清单",
             key:"salePriceEdit"
      })),
     MaterialViewClick:()=>dispatch(TabsAct.TabAdd({
             title:"销售价格清单详情",
             key:"salePriceDetail"
      })),
     SupplierBaseLoading:()=>dispatch(SalePriceListAct.supplierBaseLoading(true)),
     delMaterial:(orderCode)=>dispatch(SalePriceListAct.delMaterial({orderCode})),
      GetCodeRule:()=>dispatch(SalePriceListAct.GetCodeRule({businessIndex:37})),
    // getCurrencyList:(pm,type)=>dispatch(MaterialAct.getCurList(pm,type)),
     getEditData:(orderCode)=>dispatch(SalePriceListAct.getSupplierData({orderCode})),
    // MaterialIsDisable:(orderCode,status)=>dispatch(MaterialAct.MaterialIsDisable({orderCode,status})),
    // supplierEditData:(data)=>dispatch(MaterialAct.supplierEditData(data)),
})

export default connect( mapStateToProps, mapDispatchToProps )(SalePriceListCont)