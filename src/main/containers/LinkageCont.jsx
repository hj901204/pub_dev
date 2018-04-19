import React, {Component} from "react";
import LinkageAct from '../actions/LinkageAct';
import LinkageComp from '../components/LinkageComp';
import {connect} from 'react-redux';
class LinkageCont extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="linkage-content">
                <LinkageComp {...this.props}>
                </LinkageComp>
            </div>
        );

    }
}
const mapStateToProps = (state) => state.LinkageRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    CountryList: () => {
        dispatch(LinkageAct.CountryList())
    },
    ProvinceList: (countryCode) => {
        dispatch(LinkageAct.ProvinceList({countryCode}))
    },
    CityList: (provinceCode) => {
        dispatch(LinkageAct.CityList({provinceCode}))
    },
    CountyList: (cityCode) => {
        dispatch(LinkageAct.CountyList({cityCode}))
    },
    CleanContry: () => {
        dispatch(LinkageAct.CleanOtherRegion(["provinceSource", "citySource", "countySource"]))
    },
    CleanPrivence: () => {
        dispatch(LinkageAct.CleanOtherRegion(["citySource", "countySource"]))
    },
    CleanCity: () => {
        dispatch(LinkageAct.CleanOtherRegion(
            ["countySource"]
        ))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(LinkageCont);

