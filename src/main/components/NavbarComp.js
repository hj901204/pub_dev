/**
 * Created by MW on 2017/3/15.
 */
import React, {Component} from 'react';
import {Dropdown} from '../../base/components/AntdComp';
import {render} from "react-dom";
import Actions from "../actions/NavbarActions";
import NavbarMenuComp from "./NavbarMenuComp"


export default class NavbarComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarTree: []
        }
    }
    componentWillMount(){
        Actions.getNavBarMenusTree().then((json)=>{
            if(json.status === 2000){
                this.setState({
                    navbarTree:json.data.list
                });
            }
        })
    }

    renderPopupContainerToDom = () => {
        return  this.refs["navbar-container"];
    }

    drawOverlay =(moduleItem)=>{
        return (<NavbarMenuComp tree={moduleItem[this.props.childrenKey] || []}/>);
    }
    drawDown =()=>{
        return this.state.navbarTree.map((moduleItem,index)=>{

            if(Actions.isChildren(moduleItem,this.props.childrenKey)){
               return (
                   <Dropdown  key={"drawDropdown_"+moduleItem[this.props.keyCode]+index}  overlay={this.drawOverlay(moduleItem)} placement="bottomLeft"
                             getPopupContainer={this.renderPopupContainerToDom}>
                       <div className="navbar-menu-main">
                           <div className="navbar-menu-title">
                               <a className="navbar-menu-title navbar-menu-root" href={moduleItem.url || '#'}>
                                   {moduleItem[this.props.valueCode]}
                                   <span className="ant-select-arrow"></span>
                               </a>
                           </div>
                       </div>
                   </Dropdown>
               )
            }else {
                return (
                    <div key={"drawDropdown_"+moduleItem[this.props.keyCode]+index}  className="navbar-menu-main">
                        <a className="navbar-menu-title navbar-menu-root" href={moduleItem.url}>
                            {moduleItem[this.props.valueCode]}
                        </a>
                    </div>
                )
            }
        });
    }
    render() {
        return (
            <div className="navbar">
                <div className="navbar-bar">
                    {
                        this.drawDown()
                    }
                </div>
                <div ref="navbar-container" className="navbar-container"></div>
            </div>
        )
    }
}




NavbarComp.defaultProps ={
    childrenKey:"menuList",
    keyCode:"moduleCode",
    valueCode:"moduleName"
}
