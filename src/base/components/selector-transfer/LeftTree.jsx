import React, { Component, PropTypes } from 'react';
import { Tree, Col } from '../AntdComp';
const TreeNode = Tree.TreeNode;

class LeftTree extends Component {
    constructor(prop) {
        super(prop);
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     // return this.shouldUpdateByProps(["sourceData","lightId"],nextProps);
    // }
    getTreeNode = (node,index) => {
        let clickId = this.props.lightId;
        let cla = 'treeNode';
        if (node) {
            let cnode = "";
            if (node.children && node.children.length > 0) {
                cnode = node
                    .children
                    .map((n,i) => this.getTreeNode(n,index+"-"+i));
            }
            return (
                <TreeNode
                    className={clickId == node.id?"tree-node-selected treeNode":"treeNode"}
                    record={node}
                    isClicked={clickId == node.id}
                    title={<span>{node.deptName}</span>}
                    key={"0-"+index}
                    deptCode={node.deptCode}>
                    {cnode}
                </TreeNode>
            )
        }

    }
    onSeleced = (selectedKeys,e) => {
        this
            .props
            .onSeleced(selectedKeys,e);
    }
    render() {
        const {sourceData,lightId} = this.props;
        return (
            <Col span={12} className='leftCol'>
                <Tree onSelect={this.onSeleced} defaultExpandedKeys={['0-0']} defaultExpandAll={true} className='tree'>
                    {this.getTreeNode(sourceData,0)}
                </Tree>
            </Col>
        )
    }
}

export default LeftTree