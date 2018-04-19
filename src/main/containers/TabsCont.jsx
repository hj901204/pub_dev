import React,{Component} from "react";
import { connect } from "react-redux";
import { Tabs, Button,Breadcrumb } from '../../base/components/AntdComp';
import { removeTabs } from '../../base/consts/Utils';
import TabsAct from '../actions/TabsAct';

//职位管理
import PositionCont from './PositionCont';
//部门管理
import DepartmentCont from './DepartmentCont';
//员工管理
import MemberManageCont from './MemberManageCont';
//权限容器
import AuthorityCont from './AuthorityCont';
//地址管理
import AddressCont from './AddressCont';
//站点管理
import SiteCont from './SiteCont';
//基础数据
import BaseDataCont from './BaseDataCont';
//其他测试容器
import MainCont from './MainCont';
import ImportEmployeeCont from './ImportEmployeeCont';

const TabPane = Tabs.TabPane;
class TabsCont extends Component{
    constructor(prop){
        super(prop);
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    remove = (targetKey) => {
        removeTabs(targetKey,this.props);
    }
    getContent= (tab) =>{
        switch (tab.key) {
            case "position":
                return <PositionCont />
            case "department":
                return <DepartmentCont />
            case 'ImportEmployeeCont':
                return <ImportEmployeeCont />
            case "address":
                return <AddressCont />
             case "site":
                return <SiteCont />
 			case "basedata":
                return <BaseDataCont />
            case "member":
                return <MemberManageCont />
            case "authority":
                return <AuthorityCont />
            default:
                return null;
        }
    }
    render(){
        const { tabs, activeKey, tabChange,tabsData } = this.props;
        let _breadcrums = undefined;
        if (activeKey) {
            _breadcrums = tabsData[activeKey].breadcrum;
        }
        return (
            <div>
                <div className="ew-breadcrumb">
                    <div className="breadcrum-inner">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>你所在的位置</Breadcrumb.Item>
                            {
                                _breadcrums != undefined ? _breadcrums.map((item, index) => {
                                    return (<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
                                }) : null
                            }
                        </Breadcrumb>
                    </div>
                </div>
                <div className="ew-tabs">
                    <Tabs
                        animated={false}
                        hideAdd
                        onChange={tabChange}
                        activeKey={activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                        >
                        {
                            tabs.map(pane => 
                                <TabPane tab={pane.title} key={pane.key}>
                                    {this.getContent(pane)}
                                </TabPane>
                            )
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state.TabsRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    tabChange: (activeKey) => {
        dispatch(TabsAct.TabChange(activeKey));
    },
    tabRemove: (key,activeKey) =>{
        dispatch(TabsAct.TabRemove(key,activeKey));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(TabsCont);