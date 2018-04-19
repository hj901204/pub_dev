import React, { Component, PropTypes } from "react";
import update from 'react/lib/update';
import moment from "moment";
import { Form, Input, InputNumber, Spin, Button, Modal, Row, Col, Select, Icon, DatePicker } from '../../../base/components/AntdComp';
import ModalComp from '../../../base/components/ModalComp';
import FormModalComp from '../../../base/components/FormModalComp';
import AutoSelectComp from '../../../base/components/AutoSelectComp';
import TreeSelectComp from '../../../base/components/TreeSelectComp';
import Validate from '../../../base/consts/Validate';
//Validate
const FormItem = Form.Item;
const Option = Select.Option;
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class AddMaterialComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.param = {
            materialCode: "",
            simpleCode: "",
            materialName: "",
            model: "",
            measureUnit: "",
            materialSpec: "",
            //status: 0,
            type: 0,
            materialDesc: "",
            netWeight: '',
            roughWeight: '',
            weightUnit: "",
            sizeLength: '',
            sizeWidth: '',
            sizeHeight: '',
            sizeUnit: "",
            sizeVolume: '',
            volumeUnit: "",


        };
        this.state = {
            roughWeight: false,
            netWeight: false,
            size_Length: false,
            size_Width: false,
            size_Height: false,
            sizeLength: 0,
            sizeWidth: 0,
            sizeHeight: 0,
            updateLength: false,
            updateWidth: false,
            updateHeight: false,
            visible: false,
        }
    }

    showModal = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (this.props.title == '新建物料') {
                data.receiveOrgCode = "";
                if (this.props.materialCodeRule === 0) {
                    data.materialCode = '';
                }
            }
            data.creationDate = data.creationDate ? moment(data.creationDate).format('YYYY-MM-DD') : '';

            let newData = this.param;
            for (let [key, val] of Object.entries(data)) {
              
                if (key in newData && val) {
                    newData = update(newData, {
                        [key]: {
                            $set: val
                        }
                    });
                }
            };
        
            if (!err) {
                //newData.status = 0;
                this.props.onOk && this.props.onOk(newData);

            }

        });
    }
    showComponentMsg = (componentMsg) => {
        this.props.showComponentMsg(!componentMsg);
    }


    //自动搜索单位
    currencySelectSearch = (val, type) => {
        this.props.getCurrencyList({ "meaName": val, "dimensionality": type, "page": 1, "pageSize": 10 });
    }

    handleSelectMaterial = (value) => {
        const { setFieldsValue } = this.props.form;
        this.selected = !this.selected;
        setFieldsValue({
            meaName: value.meaName,
            meaCode: value.meaCode,
        });
    };
    handleChangeMaterial = () => {
        const { setFieldsValue } = this.props.form;
        if (this.selected) {
            this.selected = !this.selected;
            return;
        }
        setFieldsValue({
            meaName: '',
            meaCode:''
        });
    };



    getMaterialCode = (e) => {
        let val = e.target.value;
        this.setState({
            materialCode: val,
        });
    }
    render() {
        let { Record, showComponentMsg, componentMsg, supplierBaseLoading, curList, materialCodeRule } = this.props;
        const { getFieldDecorator } = this.props.form;
        let sum;
        if (this.state.updateLength && !this.state.updateHeight && !this.state.updateWidth) {//1 2 2
            sum = this.state.sizeLength * Number(Record.sizeHeight) * Number(Record.sizeWidth);
        } else if (this.state.updateLength && this.state.updateHeight && !this.state.updateWidth) {//1 1 2
            sum = this.state.sizeLength * this.state.sizeHeight * Number(Record.sizeWidth);
        } else if (this.state.updateLength && this.state.updateHeight && this.state.updateWidth) {//1 1 1
            sum = this.state.sizeLength * this.state.sizeHeight * this.state.sizeWidth;
        } else if (!this.state.updateLength && this.state.updateHeight && this.state.updateWidth) {//2 1 1
            sum = Number(Record.sizeLength) * this.state.sizeHeight * this.state.sizeWidth;
        } else if (!this.state.updateLength && !this.state.updateHeight && this.state.updateWidth) { //2 2 1
            sum = Number(Record.sizeLength) * Number(Record.sizeHeight) * this.state.sizeWidth;
        } else if (this.state.updateLength && !this.state.updateHeight && this.state.updateWidth) {//1 2 1
            sum = this.state.sizeLength * Number(Record.sizeHeight) * this.state.sizeWidth;
        } else if (!this.state.updateLength && this.state.updateHeight && !this.state.updateWidth) {//2 1 2
            sum = Number(Record.sizeLength) * this.state.sizeHeight * Number(Record.sizeWidth);
        }
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        return (
            <div className='MaterialAdd'>
                <Spin spinning={supplierBaseLoading}>
                    <div className='addmaterial'>
                        <Row style={{ height: '70px', lineHeight: '70px',marginRight:'20px', }}>
                            <Col span={20} style={{ marginLeft:'20px', fontSize: '14px', fontWeight: 'bold' }} >{this.props.title}</Col>
                            <span>
                                <Button type='primary' onClick={(e) => this.handleSubmit(e)} ><i className="c2mfont c2m-baocun" style={{ paddingRight: 7, fontSize: 10 }}></i>保存</Button>
                            </span>
                        </Row>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <Form>
                            <Row>
                                <Col span={24} style={{ marginLeft:'20px', marginBottom:'20px',fontSize: '14px', fontWeight: 'bold' }} >基本信息</Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <FormItem
                                        label="物料编码"
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                        {this.getFD('materialCode', {
                                            initialValue: Record.materialCode ? Record.materialCode.toString() : (materialCodeRule===0)?'系统自动生成':null,
                                            rules: [
                                                { required: true, message: '物料编码为必填' },
                                                { message: '物料编码不能超过20字段', max: 20 }
                                            ],
                                        })(
                                            Record.status == null && materialCodeRule===1 ? <Input /> : <Input disabled />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="简码"
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                        {this.getFD('simpleCode', {
                                            initialValue: Record.simpleCode ? Record.simpleCode.toString() : null,
                                            rules: [
                                                { message: '简码不能超过20字段', max: 20 }],
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="型号"
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                        {this.getFD('model', {
                                            initialValue: Record.model ? Record.model.toString() : null,
                                            rules: [
                                                { message: '型号不能超过50字段', max: 50 }],
                                        })(
                                            Record.status == null ? <Input /> : Record.status == 0 ? <Input /> : <Input disabled />

                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <DemoBox value={100}>
                                        <FormItem
                                            label="物料名称"
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span: 12 }}
                                        >
                                            {this.getFD('materialName', {
                                                initialValue: Record.materialName ? Record.materialName.toString() : null,
                                                rules: [
                                                    { required: true, message: '物料名称为必填' },
                                                    { message: '物料名称不能超过50字段', max: 50 }],
                                            })(
                                                <Input />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label="基本单位"
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span: 12 }}
                                        >
                                            {this.getFD('measureUnit', {
                                                initialValue: Record.measureUnit ? Record.measureUnit.toString() : "",
                                                rules: [
                                                            { type: "string", message: "基本单位必填", required: true},
                                                            Validate({
                                                                type: "autoselect",
                                                                message: "请从下拉列表中选择一项！",
                                                                list: curList.all,
                                                                keyName: "meaCode",
                                                            }),
                                                        ]
                                            })(
                                                Record.status == null ? <AutoSelectComp
                                                    onSelect={this.props.handleChange}
                                                    selectedList={curList.all}
                                                    onSearch={(val) => this.currencySelectSearch(val, "")}
                                                    displayName={["meaCode", "meaName"]}
                                                    keyName={"meaCode"}
                                                //disabled={list.includes('meaCode') ? true : false}
                                                /> : Record.status == 0 ? <AutoSelectComp
                                                    selectedList={curList.all}
                                                    onSearch={(val) => this.currencySelectSearch(val, "")}
                                                    onSelect={this.props.handleChange}
                                                    displayName={["meaCode", "meaName"]}
                                                    keyName={"meaCode"}

                                                //disabled={list.includes('meaCode') ? true : false}
                                                /> : <AutoSelectComp
                                                            selectedList={curList.all}
                                                            onSearch={(val) => this.currencySelectSearch(val, "")}
                                                            //selectedList={curList}
                                                            onSelect={this.props.handleChange}
                                                            //onSearch={this.currencySelectSearch}
                                                            displayName={["meaCode", "meaName"]}
                                                            keyName={"meaCode"}
                                                            disabled

                                                        />
                                                )}
                                        </FormItem>
                                    </DemoBox>
                                </Col>
                                 <Col span={8}>
                                    <DemoBox value={100}>
                                        <FormItem
                                            label="规格"
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span: 12 }}
                                        >
                                            {this.getFD('materialSpec', {
                                                initialValue: Record.materialSpec ? Record.materialSpec.toString() : null,
                                                rules: [{ required: true, message: '规格为必填' },
                                                { message: '规格不能超过50字段', max: 50 }],
                                            })(
                                                Record.status == null ? <Input /> : Record.status == 0 ? <Input /> : <Input disabled />
                                                )}
                                        </FormItem>
                                       <FormItem
                                        label="物料类型"
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                        {this.getFD('type', {
                                            initialValue: Record.type ? Record.type + "" : "0",
                                            rules: [{ required: true, message: '物料类型必填!' }],
                                        })(
                                            <Select >
                                                {
                                                    window.ENUM.getEnum("materialType").map(materialType => {
                                                        return <Select.Option value={materialType.catCode.toString()} key={materialType.catCode}>{materialType.catName}</Select.Option>
                                                    })
                                                }
                                            </Select>
                                            )}
                                    </FormItem>
                                    </DemoBox>
                                </Col>
                                <Col span={8}>
                                    <FormItem
                                        label="备注"
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 12 }}
                                    >
                                        {this.getFD('materialDesc', {
                                            rules: [{ message: '请输入备注' }, { message: '备注不能超过200字段', max: 200 }],
                                            initialValue: Record.materialDesc || null,
                                            onChange: this.handleSelectChange,
                                        })(
                                            <Input type='textarea' style={{ height: '88px' }} >
                                            </Input>
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>

                            {/*<Row>
                                <Col span={2}></Col>
                                <Col span={22} style={{ marginBottom: '20px' }}>
                                    <a href="#" onClick={() => this.showModal()}  >点击{this.state.visible ? "隐藏" : "填写"}补充信息{this.state.visible ? <Icon type="up" /> : <Icon type="down" />}</a>
                                </Col>
                            </Row>
                            {
                                this.state.visible ?*/}
                                    <div>
                                        <Row className='weigthtop'>
                                            <Col span={24} style={{ marginLeft:'20px', marginBottom:'20px', fontSize: '14px', fontWeight: 'bold',marginTop:'30px' }} >重量</Col>
                                        </Row>
                                        <Row className='weigthStyle'>
                                            <Col span={8}>
                                                <FormItem
                                                    label="毛重"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 12 }}
                                                >
                                                    {this.getFD('roughWeight', {
                                                        initialValue: Record.roughWeight ? Record.roughWeight.toString() : null,
                                                        rules: [{ message: '毛重不能超过20字段', max: 50 }

                                                        ],
                                                    })(
                                                        <Input />
                                                        )}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem
                                                    label="净重"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 12 }}
                                                >
                                                    {this.getFD('netWeight', {
                                                        initialValue: Record.netWeight ? Record.netWeight.toString() : null,
                                                        rules: [
                                                            
                                                            { message: '净重不能超过20字段', max: 50 }
                                                        ],
                                                    })(
                                                        <Input />
                                                        )}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                               <FormItem 
                                                        label="重量单位"
                                                        labelCol={{ span: 4 }}
                                                        wrapperCol={{ span: 12 }}
                                                    >
                                                    {getFieldDecorator('weightUnit', {
                                                        initialValue: Record.weightUnit ? Record.weightUnit.toString() : "",
                                                        rules: [
                                                            { type: "string", message: "请输入重量单位",},
                                                            Validate({
                                                                type: "autoselect",
                                                                message: "请从下拉列表中选择一项！",
                                                                list: curList.weight,
                                                                keyName: "meaCode",
                                                            }),
                                                        ]
                                                    })(
                                                        <AutoSelectComp
                                                            key="select"
                                                            //width={210}
                                                            selectedList={curList.weight}
                                                            onSelect={this.props.handleChange}
                                                            onSearch={(val) => this.currencySelectSearch(val, "2")}
                                                            displayName={["meaCode", "meaName"]}
                                                            keyName={"meaCode"}
                                                        />
                                                        )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24} style={{ marginLeft:'20px',  marginBottom:'20px',fontSize: '14px', fontWeight: 'bold',marginTop:'30px' }} >尺寸</Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <FormItem
                                                    label="长"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 12 }}
                                                >
                                                    {this.getFD('sizeLength', {
                                                        initialValue: Record.sizeLength ? Record.sizeLength.toString() : null,
                                                        rules: [{ message: '长度不能超过20字段', max: 50 }
                                                        ],
                                                    })(
                                                        <Input onChange={this.sizeLength} />
                                                        )}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem
                                                    label="尺寸单位"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 12 }}
                                                >
                                                    {this.getFD('sizeUnit', {
                                                        initialValue: Record.sizeUnit ? Number(Record.sizeUnit) : "",
                                                        rules: [
                                                            { type: "string", message: "请输入尺寸单位",},
                                                            Validate({
                                                                type: "autoselect",
                                                                message: "请从下拉列表中选择一项！",
                                                                list: curList.length,
                                                                keyName: "meaCode",
                                                            }),
                                                        ]
                                                    })(
                                                        <AutoSelectComp
                                                            key="select"
                                                           // width={210}
                                                            onSelect={this.props.handleChange}
                                                            onSearch={this.currencySelectSearch}
                                                            onSearch={(val) => this.currencySelectSearch(val, "1")}
                                                            selectedList={curList.length}
                                                            displayName={["meaCode", "meaName"]}
                                                            keyName={"meaCode"}
                                                        //placeholder={this.state.size_Length||this.state.size_Width||this.state.size_Height?"请选择":""}

                                                        />
                                                        )}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem
                                                    label="体积单位"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 12 }}
                                                >
                                                    {this.getFD('volumeUnit', {
                                                        initialValue: Record.volumeUnit ? Number(Record.volumeUnit) : "",
                                                         rules: [
                                                            { type: "string", message: "请输入体积单位",},
                                                            Validate({
                                                                type: "autoselect",
                                                                message: "请从下拉列表中选择一项！",
                                                                list: curList.volume,
                                                                keyName: "meaCode",
                                                            }),
                                                        ]
                                                    })(
                                                        <AutoSelectComp
                                                            key="select"
                                                            //width={210}
                                                            onSelect={this.props.handleChange}
                                                            onSearch={(val) => this.currencySelectSearch(val, "4")}
                                                            selectedList={curList.volume}
                                                            displayName={["meaCode", "meaName"]}
                                                            keyName={"meaCode"}
                                                        //placeholder={this.state.size_Length||this.state.size_Width||this.state.size_Height?"请选择":""}
                                                        />
                                                        )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <FormItem
                                                    label="宽"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 12 }}
                                                >
                                                    {this.getFD('sizeWidth', {
                                                        initialValue: Record.sizeWidth ? Record.sizeWidth.toString() : null,
                                                        rules: [{ message: '宽度不能超过20字段', max: 50 }],
                                                    })(
                                                        <Input />
                                                        )}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem
                                                    label="体积"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 12 }}
                                                >
                                                    {this.getFD('sizeVolume', {

                                                        //initialValue: this.props.title=="物料新增"?this.state.sizeWidth*this.state.sizeHeight*this.state.sizeLength:this.state.updateLength||this.state.updateWidth||this.state.updateHeight?sum:Number(Record.sizeVolume),
                                                        initialValue: Record.sizeVolume ? Record.sizeVolume.toString() : null,
                                                        rules: [{ message: '体积不能超过20字段', max: 50 }],
                                                    })(
                                                        <Input />
                                                        )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={8}>
                                                <FormItem
                                                    label="高"
                                                    labelCol={{ span: 4 }}
                                                    wrapperCol={{ span: 12 }}
                                                >
                                                    {this.getFD('sizeHeight', {
                                                        initialValue: Record.sizeHeight ? Record.sizeHeight.toString() : null,
                                                        rules: [{ message: '高不能超过20字段', max: 50 }],
                                                    })(
                                                        <Input />
                                                        )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </div>
                                    {/*: null

                            }*/}
                        </Form>
                    </div>
                </Spin>
            </div>


        )
    }
}

export default Form.create()(AddMaterialComp);