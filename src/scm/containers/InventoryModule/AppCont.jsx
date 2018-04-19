import React, {Component} from "react";
import LayoutTop from '../../components/InventoryModule/LayoutTopComp';
import LayoutSider from '../../components/InventoryModule/LayoutSiderComp';
import TabsCont from './TabsCont';
import PageLoadingCont from './PageLoadingCont';

import {Layout, Menu} from '../../../base/components/AntdComp';
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;

export default class AppCont extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            pageLoading: true,
            collapsed: false,
            mode: 'inline'
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                pageLoading: false
            })
        }, 10);
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
                <PageLoadingCont />
                <Layout>
                    <div className="ew-layout-header">
                        <LayoutTop />
                    </div>
                    <Layout>
                        <Sider
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                        >
                            <LayoutSider mode={this.state.mode}/>
                        </Sider>
                        <Layout className="ew-layout-content">
                            <Content>
                                <TabsCont />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

