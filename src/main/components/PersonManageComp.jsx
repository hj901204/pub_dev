/**
 * Created by MW on 2017/3/17.
 */
import React, {Component} from 'react';

class PersonManageComp extends Component {
    constructor(props){
        super(props)
    };

    render(){

        let {disableEmployees, organizationChart,data} = this.props;
        return(
            <ul className="person-manger-comp">
                <li className={this.props.selectDisEmployees ? 'active':''} onClick={disableEmployees}>已停用员工</li>
                <li className={this.props.selectOrgChart ? 'active':''} onClick={() => organizationChart(data)}>组织架构</li>
            </ul>

        )
    }
}

export default PersonManageComp