import React,{Component} from "react";
import {Icon,Menu,Dropdown,Spin} from '../../base/components/AntdComp.js';
import NavbarComp from './NavbarComp';
import actions from '../actions/LayoutTopAct'
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'
import { connect } from 'react-redux'
var {PropTypes} = React;

class LayoutTopComp extends Component{
    constructor(prop){
        super(prop);
    }
    componentDidMount(){
       this.props.PersonalInfo()
    }
    showPersonCenter=()=>{
        switch (this.props.dataSource.acctType){
            case 0:
                return <Menu.Item key="menu_1"><a href={`${prefix}${prefixCh}setting.html`}>个人中心</a></Menu.Item>;
            case 1:
                return null;
            case 2:
                return null;
        }
    }
    getMenu=()=>{
        return (
            <Menu>
                {this.showPersonCenter()}
                <Menu.Item key="menu_2"><a href={`${prefix}${prefixCh}R/setting/company`}>企业设置</a></Menu.Item>
                <Menu.Item key="menu_3"><a href="###" onClick={this.props.Logout}>退出</a></Menu.Item>
            </Menu>
        )
    }
    getAdminTip(){
         let hasMessage = this.props.dataSource.hasMsg ? <i className={`c2m-pt-red-bell-message`}></i> : null;
        if(this.props.dataSource.acctType === 1){
            return(
                <div className="admin-tip">
                    {
                        hasMessage
                    }
                    <i className={`c2mfont c2m-pt-bell`}></i> <a href={`${prefixCh}R/setting/adminremind`}>消息</a>
                </div>
            )
        }
    }
    render(){
        let {dataSource} = this.props;
        return (
            <div className='header-toolbar'>
                <div className='header-toolbar-logo'>
                    <div className="header-toolbar-logo-text">
                        <span className="img">
                            <i className="c2mfont c2m-company-logo"></i>
                        </span>
                        <span>{dataSource.companyName}</span>
                    </div>
                    <div className="header-nav">
                        <NavbarComp />
                    </div>
                </div>
                <div className='header-toolbar-right'>
                    {
                        this.getAdminTip()
                    }
                    <div className="help">
                        <i className="anticon anticon-question-circle"></i> <a>帮助</a>
                    </div>
                    <Dropdown overlay={this.getMenu()}>
                        <a className='user'>
                            <span className='img'><img src={dataSource.profilePhoto||prefixCh+"img/touxiang.png"} width="30" height="30" /></span>
                            <span>{dataSource.empName} <Icon type="down" /></span>
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => state.LayoutTopRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    PersonalInfo: () => { dispatch(actions.PersonalInfo())},
    Logout: () => { dispatch(actions.Logout())}
})

export default connect(mapStateToProps, mapDispatchToProps)(LayoutTopComp);