import React, { Component, PropTypes } from 'react';
import LeftTree from './LeftTree';
import RightItem from './RightItem';
import { Button, Row, Col} from '../AntdComp';
import ModalComp from '../ModalComp';

class Selector extends ModalComp {
    constructor(prop) {
        super(prop);
    }
    // __autoBind() {
    //     return ['onLeftSeleced','onSeleced','onRemoveSeleced','onSubmitOK','handleCancel'];
    // }
    componentWillMount(){
        this.props.getDepartment();
        // this.props.insertSeleced(this.props.selecedItem);
    }
    componentWillUnmount(){
        if(this.props.emptyData)
            this.props.emptyData();
    }
    onLeftSeleced = (selectedKeys,e)=> {
        //清空搜索框内容
        this.refs.rightitem.
             refs.searchInput.
             refs.sInput.
             refs.input.value="";
        if(e.node.props.selected){
            return;
        }
        if(!this.props.loading)
            this.props.selectedTree(selectedKeys,e);
        // //如果node已经是点击状态,不加载数据
        // if(node.node.props.isClicked){
        //     return;
        // }
    }
    onSeleced = (item, isAdd) => {
        this.props.updateSeleced(item,isAdd);
    }
    onRemoveSeleced = (item) => {
        this.props.updateSeleced(item,false);
    }
    handleSubmit = (data) => {
        if(!this.props.loading)
            this.props.handleSubmit(this.props.selecedData);
    }
    // handleCancel(){
    //     if(!this.props.loading)
    //         this.props.hideModel();
    // }
    getComp = () => {
        let props = this.props;
        let selecedNodes = props.selecedData;
        return (
            <div className='selector'>
                <div className='content'>
                <Row>
                    <LeftTree {...props} onSeleced={this.onLeftSeleced} />
                    <RightItem {...props} ref="rightitem" />
                </Row>
                <Row>
                    <Col span={24} className='seleced'>
                        {
                            selecedNodes.map(seleced =>
                                seleced?
                                <span
                                    onClick={() => this.onRemoveSeleced(seleced)}
                                    className='selecedspan'
                                    title={seleced.empName}
                                    key={seleced.empCode}>{seleced.empName}<i className="anticon anticon-close-circle"></i></span>
                                :null
                            )
                        }
                    </Col>
                </Row>
                </div>
            </div>
        )
    }
}
Selector.defaultProps = {
    title: '选人',
    showSearch: true,
    width:700,
    searchBarPlaceholder: "请输入姓名",
    wrapClassName:"selector-dialog"
}
Selector.propTypes = {
    /**
     * @title 选择框头部说明
  */
    title: React.PropTypes.string,
    /**
     * @title 是否显示搜索框
     */
    showSearch: React.PropTypes.bool,
    /**
     * @title 搜索框占位符
     */
    searchBarPlaceholder: React.PropTypes.string
}
export default Selector;
