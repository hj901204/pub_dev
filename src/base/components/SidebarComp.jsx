import React, { Component } from 'react'
import { getScrollBarSize } from '../consts/Utils';

class SidebarComp extends Component {
    constructor(prop) {
        super(prop);
        if (this.props.side_visible) {
            this.removeScrollingEffect();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.side_visible) {
            if (!prevProps.side_visible) {
                this.addScrollingEffect();
            }
        } else {
            this.removeScrollingEffect();
        }
    }

    maskClose = (e) => {
        e.stopPropagation();
        if (this.props.maskClosable)
            this.props.onClose(this, e);
    }

    checkScrollbar() {
        let fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
            const documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        if (this.bodyIsOverflowing) {
            this.scrollbarWidth = getScrollBarSize();
        }
    }
    addScrollingEffect() {
        this.checkScrollbar();
        document.body.style.paddingRight = `${this.scrollbarWidth}px`;
        document.body.style.overflow = 'hidden';
    }
    removeScrollingEffect() {
        document.body.style.paddingRight = '';
        document.body.style.overflow = '';
    }
    render() {
        const props = this.props;
        return (
            <div className={props.side_visible ? "sidebar show-menu" : "sidebar"}>
                <div className={props.className}>
                    <div className="menu-wrap">
                        {props.side_visible ? <div className="ew-sidebar">{props.children}</div> : null}
                    </div>
                    <div className="ant-modal-mask" onClick={this.maskClose}></div>
                </div>
            </div>
        )
    }
}

SidebarComp.defaultProps = {
    className:"",
    maskClosable: true,
    onClose: () => { },
}

SidebarComp.propTypes = {
    className: React.PropTypes.string,
    maskClosable: React.PropTypes.bool, 
    onClose: React.PropTypes.func,
}

export default SidebarComp
