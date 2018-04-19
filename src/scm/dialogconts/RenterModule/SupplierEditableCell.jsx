import React,{Component} from "react";
import {Table, Input, Popconfirm,Radio,Select } from '../../../base/components/AntdComp';

class SupplierEditableCell extends Component {
     constructor(props) {
    super(props);
}
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    RadioValues:this.props.RadioValues,
    selected:this.props.selected,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value;
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  onChange = (e) => {
     let value= e.target.value==1?'0':'1';
      this.setState({ value });
  }
  selectChange=(value)=>{
      this.setState({ value });
      
  }
  RadioChange=(RadioValues)=>{
   
  }
  render() {
    const { value, editable,fleg,RadioValues,selected} = this.state; 
  
        switch (this.props.fleg) {
            case "1":
                return (
                     editable?
                    <div>
                        <Radio onChange={e => this.onChange(e)} value={value}/>
                    </div>:
                    <div>
                        
                        {RadioValues==1?
                            <a href="#" onClick={this.RadioChange(RadioValues)}><Radio checked disabled/></a>:
                            <a href="#" onClick={this.RadioChange(RadioValues)}><Radio checked={false} disabled/></a>
                        }
                        
                    </div>
                )
                break;

            case "2":
                return(
                    editable?
                    <div>
                        <Input
                            value={value}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>:
                    <div className="editable-row-text">
                         {value.toString() || ' '}
                    </div>
                )
                break;
                 case "3":
                return(
                    editable?
                    <div>
                        <Select style={{width:100}} defaultValue={value} onChange={this.selectChange}>
                            {
                             
                                window.ENUM.getEnum(selected).map(selected => {
                                    return <Select.Option value={selected.catCode.toString()} key={selected.catCode}>{selected.catName}</Select.Option>
                                })
                           
                            }
                        </Select>
                    </div>:
                    <div className="editable-row-text">
                       { value?
                         
                               window.ENUM.getEnum(selected, value) : value.toString() || ' '
                            }
                    </div>
                )
                break;
            default:
                return (
                   <div className="editable-row-text">
                        {value.toString() || ' '}
                    </div>
                    
                )
                break;
        }

  }
}
export default SupplierEditableCell;