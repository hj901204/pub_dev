import React,{Component} from "react";
import { connect } from "react-redux";
import TabsAct from '../actions/TabsAct';
import { Menu, Icon } from '../../base/components/AntdComp';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LayoutSider extends Component{
    constructor(prop){
        super(prop);
    }
    handleClick =(e)=>{
        this.props.tabAdd(e);
    }
    render(){
        const {mode} = this.props;
        if(this.props.openKeys.length>0)
        return (
            <Menu 
                defaultOpenKeys={this.props.openKeys}
                selectedKeys={[this.props.activeKey]}
                onClick={this.handleClick}
                mode={mode}>
                <SubMenu key="organi" title={<span><Icon type="mail" /><span className="nav-text">组织架构</span></span>}>
                    <Menu.Item key="department" title="部门">部门</Menu.Item>
                    <Menu.Item key="position" title="职位">职位</Menu.Item>
                </SubMenu>
                <Menu.Item key="member" title="员工管理"><span><Icon type="appstore" /><span className="nav-text">员工管理</span></span></Menu.Item>
                <Menu.Item key="authority" title="权限管理"><span><Icon type="appstore" /><span className="nav-text">权限管理</span></span></Menu.Item>
                <SubMenu key="system" title={<span><Icon type="setting" /><span className="nav-text">系统设置</span></span>}>
                    <Menu.Item key="address" title="地址管理">地址管理</Menu.Item>
                    <Menu.Item key="site" title="站点管理">站点管理</Menu.Item>
                    <Menu.Item key="basedata" title="基础数据">基础数据</Menu.Item>
                </SubMenu>
            </Menu>
        )
        else return <span></span>;
    }
}
const mapStateToProps = (state) => {
    return state.TabsRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    tabAdd:(e) => {
        dispatch(TabsAct.TabAdd({
            title:e.item.props.title,
            key:e.key
        }));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(LayoutSider);