import React,{Component} from "react";
import {Modal} from '../../../base/components/AntdComp';
class InstantSidebarWrapComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            className:"instant-sidberwarp-right-pic-dt"
        }
    }
    title = () => {
        return <div className="instant-sidberwarp-title">
            <span className="instant-sidberwarp-materialCode">{"物料编码："+this.props.materialCode}</span>
            {window.ENUM.getEnum("inventoryStatus").map(inventoryStatus => {
                if(this.props.status==inventoryStatus.catCode){
                    return (
                        <span className='instant-sidberwarp-status' key={inventoryStatus.catCode}>状态：<span className={this.getCatCodeClassName(inventoryStatus.catCode)}>{inventoryStatus.catName}</span></span>
                    )
                }
            })}
        </div>
    }
   getCatCodeClassName(catCode){
        switch(catCode){
            case "0":
                return "instant-sidberwarp-right-pic-use";
            case "1":
                return "instant-sidberwarp-right-pic-distribute";
            case "4":
                return "instant-sidberwarp-right-pic-die";
            default:    
                return null;
        }
   }
    componentDidMount() {
        const instantsidberwarpwrap = document.getElementsByClassName("instant-sidberwarp-wrap");
        if(instantsidberwarpwrap.length>0){
            instantsidberwarpwrap[0].parentNode.firstChild.style.backgroundColor = 'rgba(255,255,255,0)';
        }
    }
    render (){
        let {dataSource,materialCode,sidebarVisiable,id,handleCancel} = this.props;
        return (
                <Modal 
                    title={this.title()}
                    visible={sidebarVisiable}
                    width={642}
                    footer={null}
                    className="instant-sidberwarp-modal"
                    onCancel={handleCancel}
                    wrapClassName="instant-sidberwarp-wrap"
                    maskClosable={false}
                >
                {
                    dataSource.map(data=>{
                        if(id==data.id){
                            return (
                                <div className="instant-sidberwarp-info" key={data.id}>
                                    <div className="instant-sidberwarp-left">
                                        <p><span>物料名称：</span>{data.materialName}</p>
                                        <p><span>规格：</span>{data.materialSpec}</p>
                                        <p><span>型号：</span>{data.materialModel}</p>                                            
                                        <p><span>仓库：</span>{data.warehouseName}</p>
                                    </div>
                                    <div className="instant-sidberwarp-right">
                                        <p><span>仓位：</span>{data.freightSpaceName}</p>
                                        <p><span>批次号：</span>{data.batchCode}</p>
                                        <p><span>库存数量：</span>{data.amount}</p>
                                    </div>
                                </div>
                            )}
                        })
                    }
                </Modal>
        )
    }
}

export default InstantSidebarWrapComp;
