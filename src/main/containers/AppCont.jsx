import React, {Component} from "react";
import LayoutTop from '../components/LayoutTopComp';
import LayoutSider from '../components/LayoutSiderComp';
import TabsCont from './TabsCont';
import PageLoadingCont from './PageLoadingCont';
import {Layout, Menu, Breadcrumb, Icon} from '../../base/components/AntdComp';
import actions from '../actions/LayoutTopAct'
import TabsAct from '../actions/TabsAct';
import {store} from '../data/StoreConfig';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

class AppCont extends Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            pageLoading: true,
            collapsed: false,
            mode: 'inline'
        }
    }
    componentDidMount() {
        let {tab} = this.props.location.query;
        setTimeout(() => {
            this.setState({
                pageLoading: false
            })
        }, 10);
        if(tab != undefined)
            store.dispatch(TabsAct.TabInsert(tab));
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    }
    render() {
        return (
            <div className="ew-layout">
                <Layout style={{ height: '100vh',overflow: 'hidden' }}>
                    <Header className="ew-layout-header">
                        <LayoutTop {...this.props}/>
                    </Header>
                    <Layout>
                        <Sider
                            width={200}
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                        >
                            <LayoutSider mode={this.state.mode}/>
                        </Sider>
                        <Layout>
                            <Content id="ew-content" className="ew-layout-content" style={{ overflow: 'initial' }}>
                                <TabsCont />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default AppCont;

