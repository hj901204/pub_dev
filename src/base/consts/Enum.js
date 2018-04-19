const bool3 = [
    {
        "catCode": "0",
        "catName": "是"
    }, {
        "catCode": "1",
        "catName": "否"
    }
];

const dataStatus = [
    {
        "catCode": "0",
        "catName": "已保存"
    },
    {
        "catCode": "1",
        "catName": "已启用"
    },
    {
        "catCode": "2",
        "catName": "已禁用"
    },
];
const dataClass = [
    {
        "catCode": "0",
        "catName": "系统预设"
    },
    {
        "catCode": "1",
        "catName": "用户自建"
    },

];
const proOrderSource = [
    {
        "catCode": "1",
        "catName": "自建",
    },
    {
        "catCode": "2",
        "catName": "MPS建议",
    },
    {
        "catCode": "3",
        "catName": "外部系统",
    },
    {
        "catCode": "4",
        "catName": "系统生成",
    },
    {
        "catCode": "5",
        "catName": "生产订单下推",
    }
];
const ProOrderStatus = [
    {
        "catCode": "0",
        "catName": "已保存",
    },
    {
        "catCode": "1",
        "catName": "已提交",
    },
    {
        "catCode": "2",
        "catName": "已批准",
    },
    {
        "catCode": "3",
        "catName": "已关闭",
    },
    {
        "catCode": "4",
        "catName": "已驳回",
    },
    {
        "catCode": "5",
        "catName": "已锁定",
    },
    {
        "catCode": "6",
        "catName": "已撤回",
    }
];
const PurchasePriceStatus = [
    {
        "catCode": "null",
        "catName": "全部",
    },
    {
        "catCode": "0",
        "catName": "已保存",
    },
    {
        "catCode": "1",
        "catName": "已提交",
    },
    {
        "catCode": "2",
        "catName": "已批准",
    },
    {
        "catCode": "3",
        "catName": "已关闭",
    },
    {
        "catCode": "4",
        "catName": "已驳回",
    },
    {
        "catCode": "6",
        "catName": "已撤回",
    }
];
const pushdownStatus = [
    {
        "catCode": "0",
        "catName": "未下推"
    }, {
        "catCode": "1",
        "catName": "已下推"
    }
];
const contactStauts = [
    {
        "catCode": "1",
        "catName": "已启用"
    },
    {
        "catCode": "2",
        "catName": "已禁用"
    },

];

const Enum = {
    loadingMsg: "加载中,请稍后......",
    errorMsg: "未知的异常",
    routerPrefix: "/R",
    msgDuration: 3,

    //启用禁用操作
    handleStatus: [
        {
            "catCode": "1",
            "catName": "启用"
        },
        {
            "catCode": "2",
            "catName": "禁用"
        },
    ],
    // B-"1" 
    // 企业过滤：所有企业，启用企业，已禁用企业
    company: [
        {
            "catCode": "0",
            "catName": "所有企业"
        },
        {
            "catCode": "1",
            "catName": "启用企业"
        },
        {
            "catCode": "2",
            "catName": "禁用企业"
        },

    ],
    // 企业状态：启用，已禁用
    status: [
        {
            "catCode": "-1",
            "catName": "-"
        },
        {
            "catCode": "0",
            "catName": "已保存"
        },
        {
            "catCode": "1",
            "catName": "已启用"
        },
        {
            "catCode": "2",
            "catName": "已禁用"
        },

    ],
    // 是否
    bool: [
        {
            "catCode": "-1",
            "catName": "-"
        },
        {
            "catCode": "0",
            "catName": "否"
        },
        {
            "catCode": "1",
            "catName": "是"
        },

    ],
    bool2: [
        {
            "catCode": "0",
            "catName": "否"
        },
        {
            "catCode": "1",
            "catName": "是"
        },

    ],
    // D-"1"
    // 层级:部门、分公司、办事处
    deptBool: bool3,
    level: [
        {
            "catCode": "0",
            "catName": "部门"
        },
        {
            "catCode": "1",
            "catName": "分公司"
        },
        {
            "catCode": "2",
            "catName": "办事处"
        },
    ],
    // 地址类型：经营地址、收货地址，仓储地址,办公地址
    address: [
        {
            "catCode": "0",
            "catName": "经营地址"
        },
        {
            "catCode": "1",
            "catName": "收货地址"
        },
        {
            "catCode": "2",
            "catName": "仓储地址"
        },
        {
            "catCode": "3",
            "catName": "办公地址"
        },
    ],
    //供应商地址类型：收货地址，发货地址，开票地址
    supplierAddress: [
        {
            "catCode": "0",
            "catName": "收货地址"
        },
        {
            "catCode": "1",
            "catName": "发货地址"
        },
        {
            "catCode": "2",
            "catName": "开票地址"
        },
    ],
    // 籍贯
    native: [
        {
            "catCode": "0",
            "catName": "上海"
        },

    ],
    //采购价格清单
    PurchasePriceStatus,
    // F-"2"
    // "0"级数据状态包括“启用、保存、已禁用”
    dataStatus,
    // 类别分为“用户自建、系统预设”
    dataClass,
    // 地址站点状态：启用，停用，保存
    addressStatus: dataStatus,
    // 供应商--状态包括“保存、启用、禁用”
    supplierStauts: dataStatus,
    // 供应商--联系人状态包括“启用、禁用”
    contactStauts,
    // 供应商/客户  --发票类型
    invoiceType: [
        {
            "catCode": "1",
            "catName": "增值税普通发票",
        },
        {
            "catCode": "2",
            "catName": "增值税专用发票",
        }
    ],
    // 采购订单  --采购类型
    purchaseType: [
        {
            "catCode": "0",
            "catName": "库存采购",
        },
        // {
        //     "catCode": "1",
        //     "catName": "非库存采购",
        // },
        // {
        //     "catCode": "2",
        //     "catName": "服务采购",
        // }
    ],
    // 采购订单 --订单状态
    purchaseOrderStatus: [
        {
            "catCode": "0",
            "catName": "已保存",
        },
        {
            "catCode": "1",
            "catName": "已提交",
        },
        {
            "catCode": "2",
            "catName": "已审核",
        },
        {
            "catCode": "3",
            "catName": "已关闭",
        },
        {
            "catCode": "4",
            "catName": "已驳回",
        },
        {
            "catCode": "6",
            "catName": "已撤回"
        }
    ],
    //采购订单 --来源单据状态
    purchaseSourceOrderType: [
        {
            "catCode": "0",
            "catName": "自建",
        },
        {
            "catCode": "1",
            "catName": "电商",
        },
        {
            "catCode": "2",
            "catName": "MRP",
        }
    ],
    //采购订单 --是否含税
    isTax: [
        {
            "catCode": "0",
            "catName": "否",
        },
        {
            "catCode": "1",
            "catName": "是",
        }
    ],
    //生产订单 --单据来源
    proOrderSource,
    //生产订单 --优先级
    priority: [
        {
            "catCode": "1",
            "catName": "高级",
        },
        {
            "catCode": "2",
            "catName": "中等",
        },
        {
            "catCode": "3",
            "catName": "普通",
        }
    ],

    //生产订单 --订单状态
    ProOrderStatus,
    //生产订单 --订单类型
    ProOrderType: [
        {
            "catCode": "1",
            "catName": "量产",
        },
        {
            "catCode": "2",
            "catName": "试产",
        },
        {
            "catCode": "3",
            "catName": "研发",
        }
    ],
    //生产订单 --生产状态
    productionStatus: [
        {
            "catCode": "0",
            "catName": "未开工",
        },
        {
            "catCode": "1",
            "catName": "生产中",
        },
        {
            "catCode": "2",
            "catName": "已完工",
        }
    ],
    //生产订单 --销售订单弹窗查询下拉
    orderSource: [
        {
            "catCode": "orderCode",
            "catName": "销售订单号",
        },
        {
            "catCode": "customerName",
            "catName": "客户名称",
        },
        {
            "catCode": "materialCode",
            "catName": "产品编码",
        }
    ],
    //采购退货单 --明细项添加行弹窗搜索
    searchType: [
        {
            "catCode": "materialCode",
            "catName": "物料编码",
        },
        {
            "catCode": "materialName",
            "catName": "物料名称",
        }
    ],

    /*-------------------生产领料单-------------*/
    //生产领料单 --单据状态列表查询下拉
    billStatus: ProOrderStatus,
    //生产领料单 --领料状态
    pickingStatus: [
        {
            "catCode": "1",
            "catName": "未领料",
        },
        {
            "catCode": "2",
            "catName": "已领料",
        },
        {
            "catCode": "3",
            "catName": "部分领料",
        }
    ],
    //生产领料单 --类型
    type: [
        {
            "catCode": "1",
            "catName": "标准领料",
        },
        {
            "catCode": "2",
            "catName": "超领",
        }
    ],
    //生产领料单 --单据来源
    pickingSource: proOrderSource,
    /*-------------------------------------------*/

    /*-------------------生产退料单-------------*/
    //生产退料单 --单据状态列表查询下拉
    returnBillStatus: ProOrderStatus,
    //生产退料单 --退料状态
    returnStatus: [
        {
            "catCode": "0",
            "catName": "未退料",
        },
        {
            "catCode": "1",
            "catName": "部分退料",
        },
        {
            "catCode": "2",
            "catName": "已退料",
        }
    ],
    //生产退料单 --类型
    returnType: [
        {
            "catCode": "1",
            "catName": "标准退料",
        },
        {
            "catCode": "2",
            "catName": "任意退料",
        }
    ],
    //生产退料单 --单据来源
    returnSource: [
        {
            "catCode": "0",
            "catName": "自建",
        },
        {
            "catCode": "1",
            "catName": "生产订单下推",
        },
        {
            "catCode": "2",
            "catName": "外部系统",
        }
    ],

    //采购退货单明细发货，发票状态
    receivingStatus: [
        {
            "catCode": "0",
            "catName": "未结束",
        },
        {
            "catCode": "1",
            "catName": "已结束",
        }
    ],
    baseDataType: dataClass,
    //1：长度，2：质量，3：面积，4：体积，5：容量
    baseDataDimensionality: [
        {
            "catCode": "0",
            "catName": "其他"
        },
        {
            "catCode": "1",
            "catName": "长度"
        },
        {
            "catCode": "2",
            "catName": "质量"
        },
        {
            "catCode": "3",
            "catName": "面积"
        },
        {
            "catCode": "4",
            "catName": "体积"
        },
        {
            "catCode": "5",
            "catName": "容量"
        }
    ],
    baseDataStandardCoin: [
        {
            "catCode": "1",
            "catName": "Y"
        },
        {
            "catCode": "0",
            "catName": "N"
        }
    ],
    purpose: [
        {
            "catCode": "1",
            "catName": "收款"
        },
        {
            "catCode": "2",
            "catName": "付款"
        }
    ],

    /*-------------------------------------------*/
    // bom 状态
    bomStatus: dataStatus,
    // bom 类型
    bomType: [
        {
            "catCode": 0,
            "catName": "标准BOM"
        },
        {
            "catCode": 1,
            "catName": "配置BOM"
        },

    ],
    //saleOrder 单据状态
    saleStatus: ProOrderStatus,
    //saleOrder 单据类型
    businessType: [
        {
            "catCode": '0',
            "catName": "销售订单"
        }, {
            "catCode": '1',
            "catName": "电商销售"
        }
    ],
    //saleOrder 是否含税
    saleOrderIsTax: bool3,
    //saleOrder 是否赠品isDonation
    isDonation: bool3,
    //下推状态
    pushdownStatus,
    // 行状态
    lineStatus: [
        {
            "catCode": "0",
            "catName": "未关闭"
        }, {
            "catCode": "1",
            "catName": "已关闭"
        }
    ],
    // 物流状态
    logisticStatus: [
        {
            "catCode": "0",
            "catName": "未退货"
        }, {
            "catCode": "1",
            "catName": "部分退货"
        }, {
            "catCode": "2",
            "catName": "退货完成"
        }
    ],
    saleOrderStatus: ProOrderStatus,
    //1,"待确认"2,"备货中",3,"已发货",4,"已完成",5,"已拒绝",6,"已取消";
    SaleOrderStatus: [
        {
            "catCode": "0",
            "catName": "全部"
        },
        {
            "catCode": "1",
            "catName": "待确认"
        },
        {
            "catCode": "2",
            "catName": "备货中"
        },
        {
            "catCode": "3",
            "catName": "已发货"
        },
        {
            "catCode": "4",
            "catName": "已完成"
        },
        {
            "catCode": "5",
            "catName": "已拒绝"
        },
        {
            "catCode": "6",
            "catName": "已取消"
        },
    ],
    //1,"待确认"2,"备货中",3,"待收货",4,"已完成",5,"已拒绝",6,"已取消";
    PurchaseOrderStatus: [
        {
            "catCode": "0",
            "catName": "全部"
        },
        {
            "catCode": "1",
            "catName": "待确认"
        },
        {
            "catCode": "2",
            "catName": "备货中"
        },
        {
            "catCode": "3",
            "catName": "待收货"
        },
        {
            "catCode": "4",
            "catName": "已完成"
        },
        {
            "catCode": "5",
            "catName": "已拒绝"
        },
        {
            "catCode": "6",
            "catName": "已取消"
        },
    ],
    // 业务类型
    saleReturnBusinessType: [
        {
            "catCode": "0",
            "catName": "产品退货"
        }, {
            "catCode": "1",
            "catName": "电商退货"
        }
    ],
    // 是否下推
    isPushDownStatus: pushdownStatus,
    // 物料 类型
    materialType: [
        {
            "catCode": 0,
            "catName": "常规"
        },
        {
            "catCode": 1,
            "catName": "资产"
        },
        {
            "catCode": 2,
            "catName": "服务"
        }
    ],
    // 物料 状态
    materialStatusData: dataStatus,
    //物料属性
    materialPro: [
        {
            "catCode": 0,
            "catName": "外购"
        },
        {
            "catCode": 1,
            "catName": "自制"
        },
        {
            "catCode": 2,
            "catName": "委外"
        },
    ],
    materialInventoryType: [
        {
            "catCode": 0,
            "catName": "成品"
        }, {
            "catCode": 1,
            "catName": "原材料"
        }, {
            "catCode": 2,
            "catName": "半成品"
        }, {
            "catCode": 3,
            "catName": "中间品"
        }, {
            "catCode": 4,
            "catName": "虚拟件"
        }
    ],
    materialStatusSelect: [
        {
            "catCode": "0",
            "catName": "启用"
        },
        {
            "catCode": "1",
            "catName": "不启用"
        }
    ],
    materialAgreeSelect: [
        {
            "catCode": 0,
            "catName": "允许"
        },
        {
            "catCode": 1,
            "catName": "不允许"
        }
    ],
    materialProduceIssueWay: [
        {
            "catCode": 0,
            "catName": "领料"
        },
        {
            "catCode": 1,
            "catName": "倒冲"
        },
        {
            "catCode": 2,
            "catName": "不发料"
        }
    ],
    baseDataStatus: contactStauts,
    baseDataBillType: [
        {
            "catCode": "0",
            "catName": "其他入库单"
        },
        {
            "catCode": "1",
            "catName": "其他出库单"
        },
        {
            "catCode": "2",
            "catName": "盘点任务单"
        },
    ],
    //消息未读已读状态 msgStatus
    msgStatus: [
        {
            "catCode": 0,
            "catName": "未读"
        },
        {
            "catCode": 1,
            "catName": "已读"
        },
    ],
    //信息 
    msgFrom: [
        {
            "catCode": "WF",
            "catName": "审批"
        }, {
            "catCode": "HR",
            "catName": "考勤"
        }, {
            "catCode": "SCM",
            "catName": "供应链"
        }, {
            "catCode": "EC",
            "catName": "电商"
        }, {
            "catCode": "APS",
            "catName": "APS"
        }, {
            "catCode": "SYS",
            "catName": "系统"
        },
    ],




    //-----------------库存---------------start
    // 类别分为“全部、收货、发货、盘点、仓位移动从、仓位移动至、库存调整从、库存调整至、数量调整”
    operationType: [
        {
            "catCode": "-1",
            "catName": "全部"
        },
        {
            "catCode": "0",
            "catName": "收货"
        },
        {
            "catCode": "1",
            "catName": "发货"
        },
        {
            "catCode": "2",
            "catName": "盘点"
        },
        {
            "catCode": "3",
            "catName": "仓位移动从"
        },
        {
            "catCode": "4",
            "catName": "仓位移动至"
        },
        {
            "catCode": "5",
            "catName": "库存调整从"
        },
        {
            "catCode": "6",
            "catName": "库存调整至"
        },
        {
            "catCode": "7",
            "catName": "数量调整"
        },
    ],

    // 类别分为“可用、分配、预收货、待检、冻结”
    inventoryStatus: [
        {
            "catCode": "0",
            "catName": "可用"
        },
        {
            "catCode": "1",
            "catName": "分配"
        },
        {
            "catCode": "2",
            "catName": "预收货"
        },
        {
            "catCode": "3",
            "catName": "待检"
        },
        {
            "catCode": "4",
            "catName": "冻结"
        },
    ],
    //物料状态:0保存,1启用,2,禁用"
    materialStatus: [
        {
            "catCode": "0",
            "catName": "可用"
        },
        {
            "catCode": "1",
            "catName": "分配"
        },
        {
            "catCode": "2",
            "catName": "与收获"
        },
        {
            "catCode": "3",
            "catName": "待检"
        },
        {
            "catCode": "3",
            "catName": "待检"
        },
        {
            "catCode": "4",
            "catName": "冻结"
        },
    ],
    //11采购订单,12销售订单,13生产订单,14生产领料申请单,31采购退货单,32销售退货单,
    //33生产退料申请单,51采购退货出库单,52销售出库单,54生产领料出库单,69其他出库单,
    //71采购入库单,72销售退货入库单,73生产退料入库单,74生产入库单,89其他入库单"
    billType: [
        {
            "catCode": "11",
            "catName": "采购订单"
        },
        {
            "catCode": "12",
            "catName": "销售订单"
        },
        {
            "catCode": "13",
            "catName": "生产订单"
        },
        {
            "catCode": "14",
            "catName": "生产领料申请单"
        },
        {
            "catCode": "31",
            "catName": "采购退货单"
        },
        {
            "catCode": "32",
            "catName": "销售退货单"
        },
        {
            "catCode": "33",
            "catName": "生产退料申请单"
        },
        {
            "catCode": "51",
            "catName": "采购退货出库单"
        },
        {
            "catCode": "52",
            "catName": "销售出库单"
        },
        {
            "catCode": "54",
            "catName": "生产领料单"
        },
        {
            "catCode": "69",
            "catName": "其他出库单"
        },
        {
            "catCode": "71",
            "catName": "采购入库单"
        },
        {
            "catCode": "72",
            "catName": "销售退货入库单"
        },
        {
            "catCode": "73",
            "catName": "生产退料单"
        },
        {
            "catCode": "74",
            "catName": "生产入库单"
        },
        {
            "catCode": "89",
            "catName": "其他入库单"
        },
    ],

    // 类别分为“1：保存 2：部分分配 3：分配完成 4：部分发货 5：发货完成 6：关闭",”
    outDetailStatus: [
        {
            "catCode": "1",
            "catName": "已保存"
        },
        {
            "catCode": "2",
            "catName": "部分分配"
        },
        {
            "catCode": "3",
            "catName": "分配完成"
        },
        {
            "catCode": "4",
            "catName": "部分发货"
        },
        {
            "catCode": "5",
            "catName": "发货完成"
        },
        {
            "catCode": "6",
            "catName": "已关闭"
        },
    ],
    //订单状态
    orderStatus: [
        {
            "catCode": "1",
            "catName": "已保存"
        },
        {
            "catCode": "2",
            "catName": "部分预收货"
        },
        {
            "catCode": "3",
            "catName": "预收货完成"
        },
        {
            "catCode": "4",
            "catName": "部分收货"
        },
        {
            "catCode": "5",
            "catName": "收货完成"
        },
        {
            "catCode": "6",
            "catName": "已关闭"
        },
    ],

    // 源单据类型
    sourceOrderType: [
        {
            "catCode": "11",
            "catName": "采购订单"
        },
        {
            "catCode": "12",
            "catName": "销售订单"
        },
        {
            "catCode": "13",
            "catName": "生产订单"
        },
        {
            "catCode": "14",
            "catName": "生产领料申请单"
        },
        {
            "catCode": "31",
            "catName": "采购退货单"
        },
        {
            "catCode": "32",
            "catName": "销售退货单"
        },
        {
            "catCode": "33",
            "catName": "生产退料申请单"
        },
        {
            "catCode": "51",
            "catName": "采购退货出库单"
        },
        {
            "catCode": "52",
            "catName": "销售出库单"
        },
        {
            "catCode": "54",
            "catName": "生产领料单"
        },
        {
            "catCode": "69",
            "catName": "其他出库单"
        },
        {
            "catCode": "71",
            "catName": "采购入库单"
        },
        {
            "catCode": "72",
            "catName": "销售退货入库单"
        },
        {
            "catCode": "73",
            "catName": "生产退料单"
        },
        {
            "catCode": "74",
            "catName": "生产入库单"
        },
        {
            "catCode": "89",
            "catName": "其他入库单"
        },
    ],
    // 出库单据分配信息查询   1：未发货 2：已发货"
    getAllocateInfoStatus: [
        {
            "catCode": "1",
            "catName": "未发货"
        },
        {
            "catCode": "2",
            "catName": "已发货"
        },
    ],


    //  销售订单类型
    saleBusinessType: [
        {
            "catCode": 0,
            "catName": "销售订单"
        }, {
            "catCode": 1,
            "catName": "电商销售"
        }
    ],
    //  采购入库单订单详情单据类型
    takeOrderDetailsType: [
        {
            "catCode": "0",
            "catName": "自建"
        }, {
            "catCode": "1",
            "catName": "电商"
        }, {
            "catCode": "2",
            "catName": "MRP"
        }
    ],
    //  销售退货入库单据类型
    saleReturnType: [
        {
            "catCode": "0",
            "catName": "产品退货"
        }, {
            "catCode": "1",
            "catName": "电商退货"
        }
    ],
    //  生产入库单据类型
    newProductionType: [
        {
            "catCode": "1",
            "catName": "量产"
        }, {
            "catCode": "2",
            "catName": "试产"
        }, {
            "catCode": "3",
            "catName": "研发"
        }
    ],
    //  生产入库单据来源类型
    newProductionSorType: [
        {
            "catCode": "1",
            "catName": "自建"
        }, {
            "catCode": "2",
            "catName": "MPS建议"
        }, {
            "catCode": "3",
            "catName": "外部系统"
        }
    ],






    //-----------------库存---------------end
    /*--------编码规则--------*/
    //编码规则状态
    codeRuleStatus: [
        {
            "catCode": "null",
            "catName": "全部"
        },
        {
            "catCode": "0",
            "catName": "已保存"
        },
        {
            "catCode": "1",
            "catName": "已启用"
        },
        {
            "catCode": "2",
            "catName": "已禁用"
        },
    ],
    //业务对象索引
    manageIndex: [
        {
            "catCode": 4,
            "catName": "部门编码"
        }, {
            "catCode": 5,
            "catName": "职位编码"
        }, {
            "catCode": 6,
            "catName": "员工编码"
        }
    ],
    mainDataIndex: [
        {
            "catCode": 7,
            "catName": "商业伙伴编码"
        }, {
            "catCode": 8,
            "catName": "供应商编码"
        }, {
            "catCode": 9,
            "catName": "客户编码"
        }, {
            "catCode": 10,
            "catName": "物料编码"
        }, {
            "catCode": 11,
            "catName": "物料批号"
        }, {
            "catCode": 12,
            "catName": "BOM编码"
        }, {
            "catCode": 13,
            "catName": "站点编码"
        }
    ],
    businessIndex: [
        {
            "catCode": 14,
            "catName": "采购订单"
        }, {
            "catCode": 15,
            "catName": "采购退货单"
        }, {
            "catCode": 16,
            "catName": "销售订单"
        }, {
            "catCode": 17,
            "catName": "销售退货单"
        }, {
            "catCode": 18,
            "catName": "生产订单"
        }, {
            "catCode": 19,
            "catName": "生产领料申请单"
        }, {
            "catCode": 20,
            "catName": "生产退料申请单"
        }, {
            "catCode": 21,
            "catName": "生产入库申请单"
        }, {
            "catCode": 22,
            "catName": "生产订单标准用料单"
        }, {
            "catCode": 23,
            "catName": "库存交易号"
        }, {
            "catCode": 24,
            "catName": "采购入库单"
        }, {
            "catCode": 25,
            "catName": "销售退货入库单"
        }, {
            "catCode": 26,
            "catName": "生产退料单"
        }, {
            "catCode": 27,
            "catName": "调拨入库单"
        }, {
            "catCode": 28,
            "catName": "其他入库单"
        }, {
            "catCode": 29,
            "catName": "生产入库单"
        }, {
            "catCode": 30,
            "catName": "销售出库单"
        }, {
            "catCode": 31,
            "catName": "采购退货出库单"
        }, {
            "catCode": 32,
            "catName": "生产发料单"
        }, {
            "catCode": 33,
            "catName": "其他出库单"
        }, {
            "catCode": 34,
            "catName": "盘点作业单"
        }, {
            "catCode": 35,
            "catName": "库存调整单"
        }, {
            "catCode": 36,
            "catName": "采购价格清单"
        }, {
            "catCode": 37,
            "catName": "销售价格清单"
        }, {
            "catCode": 38,
            "catName": "调拨出库单"
        }, {
            "catCode": 39,
            "catName": "报价单"
        }
    ],

    //平台编码规则业务对象索引
    terraceCodeIndex: [
        {
            "catCode": 1,
            "catName": "租户编码"
        }, {
            "catCode": 2,
            "catName": "公司编码"
        }, {
            "catCode": 3,
            "catName": "OA单号"
        },
    ],

    //采购价格清单是否含税
    // purchasePriceIsTax: bool2,
     // 币种 类型
    currencyType: [
        {
            "catCode": 0,
            "catName": "RMB"
        }
    ],
    //销售价格单据状态
    orderStatusType:[
        {
            "catCode": "0",
            "catName": "已保存"
        }, {
            "catCode": "1",
            "catName": "已提交"
        },{
            "catCode": "2",
            "catName": "已批准"
        },{
            "catCode": "3",
            "catName": "已关闭"
        },{
            "catCode": "4",
            "catName": "已驳回"
        },{
            "catCode": "5",
            "catName": "已撤回"
        }
    ],
}

export { Enum };