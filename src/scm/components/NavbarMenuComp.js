/**
 * Created by MW on 2017/3/15.
 */
import React, {Component} from 'react';
import {Layout}  from '../../base/components/AntdComp';
import {Scrollbars} from 'react-custom-scrollbars';


export default class NavbarMenuComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeGroup:[],
            currentRootMaxDep:999
        }

        this.scrollContainer = {
            className:"scroll-container",
            style:{
                width: 440,
                height:318
            },
            autoHide:true,
            autoHideTimeout:10,
            renderTrackVertical:function (obj) {
                return <div  className="scroll-vertical-bar"></div>;
            }
            // renderTrackHorizontal:function () {
            //     return <div  className="scroll-horizontal-bar"></div>;
            // }
        }
    }
    componentWillMount(){
        if(this.props.tree[0]){
            this.state = {
                treeGroup:[
                    this.props.tree
                ],
                currentRootMaxDep:this.props.tree[0].maxDep
            }

            this.initSelect(this.props.tree[0]);
        }
    }


    initSelect=(treeNode)=>{

        if(this.isChildren(treeNode,"menuList")){
            this.handleOnMouseOver(null,treeNode)
            this.initSelect(treeNode.menuList[0]);
        }
    }


    isChildren =(treeNode,childrenKey)=>{
        return treeNode[childrenKey] && treeNode[childrenKey] .length > 0 ? true: false;
    }


    handleOnMouseOver = (e, currentItem) => {


        if(currentItem.level === 0){
            this.setState({
                currentRootMaxDep:currentItem.maxDep
            })
        }


        if (this.isChildren(currentItem,"menuList")) {
            //判断是否2级菜单

            let level = currentItem.menuList[0].level;

            this.state.treeGroup[level] = currentItem.menuList;

            let sliceLevelMax = level + 1;



            let newTreeGroup = this.state.treeGroup.slice(0, sliceLevelMax);

            this.setState({
                treeGroup: newTreeGroup
            });
        }else {
            let level = currentItem.level + 1;

            let newTreeGroup = this.state.treeGroup.slice(0, level);

            this.setState({
                treeGroup: newTreeGroup
            });
        }
    }


    handleOnMouseOut = (e, item) => {
    /*    if (!this.refs["container-elment"].contains(e.relatedTarget)) {
            let newTreeGroup = this.state.treeGroup.slice(0, 1);
            this.setState({
                treeGroup: newTreeGroup
            });
        }*/
    }

    renderTreeMap = () => {
        return this.state.treeGroup.map((menuContent, index) => {
            if(!(menuContent.length > 0)) return false;

            if(menuContent[0].level >= this.state.currentRootMaxDep && this.state.currentRootMaxDep > 1){

                return (
                    <ul  key={"menuContent_" +menuContent[0][this.props.resourceCode]+ index}  className="ant-cascader-menu last-menu"onMouseOut={(e) => this.handleOnMouseOut(e)}>
                        <Scrollbars{...this.scrollContainer}>
                            {
                                menuContent.map((item, index) => {
                                    return (
                                        <div key={"item_" + item[this.props.keyCode]}
                                             onMouseOver={ (e) => this.handleOnMouseOver(e, item) }
                                             onMouseOut={(e) => this.handleOnMouseOut(e) }
                                             className="menu-last-item"
                                             title="Jiangsu">{item[this.props.valueCode]}</div>
                                    )
                                })
                            }
                        </Scrollbars>
                    </ul>
                )

            }else {
                return (
                    <ul  key={"menuContent_" +menuContent[0][this.props.resourceCode]+ index}  className="ant-cascader-menu"onMouseOut={(e) => this.handleOnMouseOut(e)}>
                        {
                            menuContent.map((item, index) => {
                                return (
                                    <li key={"item_" + item[this.props.keyCode]}
                                        onMouseOver={ (e) => this.handleOnMouseOver(e, item) }
                                        onMouseOut={(e) => this.handleOnMouseOut(e) }
                                        className="ant-cascader-menu-item ant-cascader-menu-item-expand"
                                        title="Jiangsu">{item[this.props.valueCode]}</li>
                                )
                            })
                        }
                    </ul>
                )
            }


        });

    }
    render() {
        return (
            <Layout className="navbar-container-item">
                <div className="navbar-container-warp">
                    <div className="ant-cascader-menus  ant-cascader-menus-placement-topLeft">
                        <div  ref="container-elment">
                            {
                                this.renderTreeMap()
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

NavbarMenuComp.defaultProps = {
    tree:[],
    keyCode:"resourceCode",
    valueCode:"resourceName",
}

