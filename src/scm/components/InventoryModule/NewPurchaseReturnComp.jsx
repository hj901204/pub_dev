/**
 * Created by MW on 2017/4/20.
 * 新建采购退货出库单
 */
import React, {Component} from 'react';
import {Form, Spin} from '../../../base/components/AntdComp'
import NewPurchaseReturnInfoComp from './NewPurchaseReturnInfoComp'
import NewPurchaseReturnTableComp from './NewPurchaseReturnTableComp'

let FormItem = Form.Item;

class NewPurchaseReturn extends Component{
    constructor(props) {
        super(props)

    }

    saveInfo = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.props.saveInfo(Object.assign(values,{sourceOrderType:31}));
            }
        })
    }

    render() {

        return(
            <div className="new-sales-store-house">
                <Spin spinning = {this.props.loading}>
                    <Form>
                        <FormItem>
                            <NewPurchaseReturnInfoComp {...this.props} {...this.props.form} saveInfo = {this.saveInfo}/>
                        </FormItem>
                    </Form>
                    <NewPurchaseReturnTableComp {...this.props} {...this.props.form} />
                </Spin>
            </div>
        )
    }
}

let NewPurchaseReturnComp = Form.create()(NewPurchaseReturn);

export default NewPurchaseReturnComp