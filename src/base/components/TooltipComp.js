import React, { Component } from 'react'
import { Tooltip } from './AntdComp';
import { formatNullStr } from '../consts/Utils'
class TooltipComp extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        let { attr } = this.props;
        let txt = formatNullStr(attr.text)
        return (
            <Tooltip title={txt} placement={attr.placement}>
                <div className='table-tooltip' style={{ width: attr.wid }} >{txt}</div>
            </Tooltip>
        )
    }
}

export default TooltipComp

// example: edit in table`s columns

// render: (text, index, record) => {
//         return <TooltipComp attr={{text:text, wid: 70, placement: 'left'}}/>
//     }