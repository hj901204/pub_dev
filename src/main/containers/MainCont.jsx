import React,{Component} from "react";
import { Layout, Breadcrumb, Icon } from '../../base/components/AntdComp';
const { Header, Content,Footer } = Layout;
import LayoutTop from '../components/LayoutTopComp';
import PersonComp from '../components/PersonComp';
import PageLoadingCont from './PageLoadingCont';

class MainCont extends Component{
    constructor(prop){
        super(prop);
    }
    render(){
        return (
          <div className="ew-layout">
                <PageLoadingCont />
                <Layout>
                    <div className="ew-layout-header">
                        <LayoutTop />
                    </div>
                    <Content>
                        <PersonComp />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        CopyRight &copy; 2012-2015 京ICP备17004273号-2
                    </Footer>
                </Layout>
            </div>
        );
    }
}
export default MainCont;
