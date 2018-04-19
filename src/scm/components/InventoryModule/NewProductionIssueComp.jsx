/**
 * Created by MW on 2017/4/20.
 * 新建上产发料单
 */
import React, {Component} from 'react';
import {Form, Spin} from '../../../base/components/AntdComp'
import NewProductionIssueInfoComp from './NewProductionIssueInfoComp'
import NewProductionIssueTableComp from './NewProductionIssueTableComp'

let FormItem = Form.Item;

class NewProductionIssue extends Component{
    constructor(props) {
        super(props)

    }

    saveInfo = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.props.saveInfo(Object.assign(values,{sourceOrderType:14}));
            }
        })
    }

    render() {

        return(
            <div className="new-sales-store-house">
                <Spin spinning = {this.props.loading}>
                    <Form>
                        <FormItem>
                            <NewProductionIssueInfoComp {...this.props} {...this.props.form} saveInfo = {this.saveInfo}/>
                        </FormItem>
                    </Form>
                    <NewProductionIssueTableComp {...this.props} {...this.props.form} />
                </Spin>
            </div>
        )
    }
}

let NewProductionIssueComp = Form.create()(NewProductionIssue);

export default NewProductionIssueComp