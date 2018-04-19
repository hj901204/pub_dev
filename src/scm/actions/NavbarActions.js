/**
 * Created by MW on 2017/3/17.
 */

import { ReqApi } from '../../base/services/ReqApi'
import { Urls} from '../../base/consts/urls';

const actions = {
    childrenKey:"menuList",
    isChildren:(treeNode,childrenKey)=>{
        return treeNode[childrenKey] && treeNode[childrenKey] .length > 0 ? true: false;
    },
    treeIterator:(tree,level,childrenKey,fn,bool = true)=>{
        tree.map((treeNode,index)=>{
            let hasChildren = actions.isChildren(treeNode,childrenKey);
            if(hasChildren){
                if(fn(treeNode,level,childrenKey,hasChildren)){
                    actions.treeIterator(treeNode[childrenKey],level+1,childrenKey,fn);
                }
            }else {
                fn(treeNode,level,childrenKey,hasChildren);
            }
        })
    },
    getNavBarMenusTree:()=>{
        return ReqApi.get({
            url: Urls.LOGIN_GETMENUES
        }).then((json)=>{
            if(json.status === 2000){
                let tree = json.data.list;
                tree.map((moduleItem,index)=>{
                    actions.formatNavbarMenus(moduleItem[actions.childrenKey]);
                });
            }
            return json;
        });
    },
    formatNavbarMenus: (resourceTree) => {
        let rooTreeNode = null;
        actions.treeIterator(resourceTree,0,actions.childrenKey,function (treeNode,level,childrenKey,hasChildren) {
            treeNode["level"] = level;
            if(treeNode["level"] == 0){
                rooTreeNode = treeNode;
                rooTreeNode["maxDep"] = 0;
            }

            if(!hasChildren){
                rooTreeNode["maxDep"] = treeNode.level > rooTreeNode["maxDep"] ? treeNode.level :rooTreeNode["maxDep"];
          /*      console.log(rooTreeNode.resourceName+"_____"+rooTreeNode["maxDep"]);*/
            }
            return true;
        });
        return resourceTree;
    }




}

export default actions