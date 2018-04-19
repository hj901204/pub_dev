import React, { Component, PropTypes } from 'react';
import SearchInput from './SearchInput';
import { Form, Input, Button, Tree, Checkbox, Row, Col, Spin } from '../AntdComp';
const TreeNode = Tree.TreeNode;
const InputGroup = Input.Group;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

class RightItem extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      checkAll:false,
      indeterminate:false
    }
  }
  componentWillReceiveProps(nextProps){
      if(this.props.selecedCount !== nextProps.selecedCount){
          this.setState({
            indeterminate: nextProps.selecedCount>0 && nextProps.selecedCount != nextProps.currentCount,
            checkAll: nextProps.selecedCount>0?nextProps.selecedCount == nextProps.currentCount:false,
          });
      }
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //     //return this.shouldUpdateByProps(["selecedCount","currentData","searchData","loading"],nextProps);
  // }
  onSeleced=(item, e)=>{
      this.props.updateSeleced(item,e.target.checked);
  }
  onChange=(e)=>{
      this.props.checkAllSeleced(e.target.checked);
  }
  render() {
    const {searchData, currentData,loading,selecedCount}  = this.props;
    const isSearch = searchData != null;
    const options = isSearch ? searchData : currentData;
    return (
      <Col span={12} className='rightCol'>
          <SearchInput ref="searchInput" {...this.props} />
          <div className="check-inner">
              <div className='check-all'>
                  {options.length && !isSearch?<Checkbox 
                  key='check_all'
                  indeterminate={this.state.indeterminate}
                  checked={this.state.checkAll}
                  onChange={this.onChange}>全选</Checkbox>:null}
              </div>
              <div className='check-list'>
                {
                  options.map((option,index) =>
                    <Checkbox
                      checked={option.ischecked}
                      onChange={(e) => this.onSeleced(option, e)}
                      key={'check_'+option.empCode}>
                      {option.empName}
                    </Checkbox>
                  )
                }
              </div>
          </div>
      </Col>
    )
  }
}

export default RightItem