/**
 * Created by MW on 2017/3/20.
 */
import React,{Component} from "react";


class PageLoadingComp extends Component{
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return (
            this.props.loading ? (
                <div className="page-loading">
                    <div className="animationload">
                        <div className="osahanloading"></div>
                    </div>
                </div>
            ): null
        )
    }
}

export default PageLoadingComp;
