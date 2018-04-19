import React,{Component} from "react";
import { connect } from 'react-redux';
import SelectorAct from '../actions/SelectorAct';
import TreeAct from '../actions/TreeAct';
import { default as Selector } from '../../base/components/selector-transfer';
// import MemberAct from '../actions/MemberAct';

class SelectorTransferCont extends Component{
    constructor(prop){
        super(prop);
    }
    getUsersByDep = (selectedKeys) => {
        // this.refs.rightitem.
        //      refs.searchInput.
        //      refs.sInput.
        //      refs.input.value="";
        this.props.fetchDataUsers(selectedKeys);
    }
    getDepartment = () => {
        this.props.getDepartments();
        // this.dispatch(MemberAct.filterMemberStruct(SelectorAct.fetchDataOrgan(),-1));
    }
    selectedTree = (key,e) => {
        let {record,isClicked} = e.node.props;
        this.props.selectedTree(record);
        if(!isClicked)
            this.getUsersByDep(key);
    }
    updateSeleced = (item, isAdd) => {
        this.props.updateSeleced(item,isAdd);
    }
    searchSeleced = (value) => {
       this.props.searchSeleced(value);
    }
    handleSubmit = (selecedData) => {
        this.props.handleSubmit(selecedData).then((res)=>{
            if(res.status === "2000" && this.props.autoClose){
                this.props.handleCancelD();
            }
        });
    }
    getComp = () => {
        if(this.props.visible){
            return (
                <Selector
                    {...this.props}
                    selectedTree={this.selectedTree}
                    getDepartment={this.getDepartment}
                    updateSeleced={this.updateSeleced}
                    searchSeleced={this.searchSeleced}
                    getUsersByDep={this.getUsersByDep}
                    handleSubmit={this.handleSubmit}
                />
            )
        }else{
            return null;
        }
    }
    render(){      
        return (
            <div>
                {this.getComp()}
            </div>
        )
    }
}
SelectorTransferCont.defaultProps = {
    autoClose: true,
    selecedItem:[],
    SubmitComplete: ()=>{}
}
SelectorTransferCont.propTypes = {
    /**
     * @title 是否提交成功后自动关闭弹出框
     */
    autoClose: React.PropTypes.bool,
    /**
     * @title 当前选中项
     */
    selecedItem: React.PropTypes.array,
    /**
     * @title 提交成功之后
     */
    SubmitComplete: React.PropTypes.func
}

const mapStateToProps = (state) => state.SelectorRedu


const mapDispatchToProps = (dispatch) => ({
    emptyData:() => {dispatch(SelectorAct.emptyData())},
    searchSeleced:(value) => { dispatch(SelectorAct.searchSeleced(value))},
    checkAllSeleced:(isAdd) =>{ dispatch(SelectorAct.checkAllSeleced(isAdd)) },
    updateSeleced:(item, isAdd) => {dispatch(SelectorAct.updateSeleced(item,isAdd));},
    fetchDataUsers:(key) =>{ dispatch(SelectorAct.fetchDataUsers(key))},
    selectedTree:(record) =>{ dispatch(SelectorAct.selectedTree(record))},
    getDepartments: () =>{dispatch(SelectorAct.fetchDataOrgan())},
    handleCancelD:()=>{dispatch(SelectorAct.visibleDialog(false))}
})

export default connect(mapStateToProps,mapDispatchToProps)(SelectorTransferCont);

