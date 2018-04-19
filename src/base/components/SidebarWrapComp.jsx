import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Sidebar from './SidebarComp'
import { shouldComponentUpdate } from '../consts/Utils';

export default class SidebarWrap extends Component {
    appendMaskIntoDoc() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <Sidebar {...this.props}>
                {this.props.children}
            </Sidebar>,
            this.container
        )
    }

    componentDidMount() {
        this.container = document.createElement('div')
        document.body.appendChild(this.container)
        this.appendMaskIntoDoc()
    }

    componentDidUpdate() {
        this.appendMaskIntoDoc()
    }

    componentWillUnmount() {
        document.body.removeChild(this.container)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    render() {
        return null
    }
}


// Example


{/*<Sidebar maskClosable={true}
    side_visible={sidebar_visiable}
    onClose={() => SidebarVisiable(false)}
>
    <div>...</div>
</Sidebar>*/}