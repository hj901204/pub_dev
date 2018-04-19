/**
 * Created by MW on 2017/4/20.
 * 新建销售出库单
 */
import React, {Component} from 'react';
import {Form, Spin} from '../../../base/components/AntdComp'
import NewSalesStoreHouseInfoComp from './NewSalesStoreHouseInfoComp'
import NewSalesStoreHouseTableComp from './NewSalesStoreHouseTableComp'

let FormItem = Form.Item;

class NewSalesStoreHouse extends Component{
    constructor(props) {
        super(props)

    }

    saveInfo = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.props.saveInfo(Object.assign(values,{sourceOrderType:12}));
            }
        })
    }

    render() {

        return(
            <div className="new-sales-store-house">
                <Spin spinning = {this.props.loading}>
                    <Form>
                        <FormItem >
                            <NewSalesStoreHouseInfoComp {...this.props} {...this.props.form} saveInfo = {this.saveInfo}/>
                        </FormItem>
                    </Form>
                    <NewSalesStoreHouseTableComp {...this.props} {...this.props.form} />
                </Spin>
            </div>
        )
    }
}

let NewSalesStoreHouseComp = Form.create()(NewSalesStoreHouse);

export default NewSalesStoreHouseComp