import React, { Component, PropTypes } from "react";
import {message} from './AntdComp';;
import { shouldComponentUpdate } from '../consts/Utils';

class MapComp extends Component {
    constructor(props, context) {
        super(props, context);
        const value = this.props.value || {};
        this.state = {
            map: null,
            coordinate: {
                lng: value.lng || 116.404,
                lat: value.lat || 39.915,
            },
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.search !== this.props.search) {
            this.setPlace(nextProps.search)
        }
        if ('value' in nextProps && nextProps.value != this.props.value) {
            const coordinate = nextProps.value;
            if (coordinate) this.setState({ coordinate }, this.theLocation);
        }
    }

    componentDidMount() {
        this.setState({
            map: this.createBMap(this.props.id)
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    triggerChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(Object.assign({}, this.state.coordinate, changedValue));
        }
    }
    createBMap = (id) => {
        let { lng, lat} = this.state.coordinate;
        let map = new BMap.Map(id, { enableMapClick: false }),
            point = new BMap.Point(lng, lat);
        map.centerAndZoom(point, 14);
        map.enableScrollWheelZoom(); 
        // this.theLocation(map);
        return map
    }
    marker = (poi) => {
        let marker = new BMap.Marker(poi);
        marker.disableDragging();
        return marker
    }
    theLocation = (map=this.state.map) => {
        let { lng, lat } = this.state.coordinate;
        map.clearOverlays();
        if (lng && lat) {
            var new_point = new BMap.Point(lng, lat);
            var marker = this.marker(new_point);
            map.addOverlay(marker); 
            map.panTo(new_point);
            var opts = {
                width: 0,
                height: 0,
            };
            var geoc = new BMap.Geocoder();
            geoc.getLocation(new_point, (rs) => {
                var addComp = rs.addressComponents;
                var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                var infoWindow = new BMap.InfoWindow(address, opts);
                map.openInfoWindow(infoWindow, new_point);
            });
        }
    }
    theBrowser = (m) => {
        const map = m || this.state.map;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition((r) => {
            if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
                this.triggerChange({
                    lng: r.point.lng,
                    lat: r.point.lat,
                })
            }
        }, { enableHighAccuracy: true })
    }
    setPlace = (search) => {
        let { map } = this.state;
        map.clearOverlays();
        const myFun = () => {
            let points = local.getResults().getPoi(0);
            // console.log('local.getResults()',local.getResults());
            // this.props.getResults(local.getResults().vr)
            if (points) {
                this.triggerChange({
                    lng: points.point.lng,
                    lat: points.point.lat,
                });
                message.success('定位成功！');
            } else {
                this.triggerChange({
                    lng: null,
                    lat: null,
                });
                message.error('地址无效，请重新搜索！');
            }
        }
        const local = new BMap.LocalSearch(map, { 
            onSearchComplete: myFun
        });
        if (search) {
            local.search(search);
        } 
    }
    render() {
        return (
            <div id={this.props.id} ></div>
        )
    }
};


MapComp.defaultProps = {
    id: 'location',
};
MapComp.propTypes = {
    id: PropTypes.string,
};

export default MapComp;


// Example

{/*<FormItem className= "map" wrapperCol= {{ span: 24 }} >
{
    this.getFD('map', {
            initialValue: {
                lng: 116.404,
                lat: 39.915,
            },
    })(<MapComp search={this.state.address} />)
}
</FormItem >*/}