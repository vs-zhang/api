import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
} from 'react-google-maps';


class Map extends Component {
  static propTypes = {
    location: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
      radius: PropTypes.number,
      name: PropTypes.string,
    }).isRequired,
    heroes: PropTypes.arrayOf(PropTypes.shape({
      cityname: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      coordinate: PropTypes.array.isRequired,
      distance: PropTypes.number.isRequired,
    })).isRequired,
  };

  constructor(props) {
    super(props);
    this.handleMapLoad = ::this.handleMapLoad;
  }

  getMeters = i => (i * 1609.344);

  handleMapLoad(map) {
    if (map) {
      const bounds = this.circle.getBounds();
      map.fitBounds(bounds);
    }
  }
  render() {
    const MainGoogleMap = withGoogleMap((props) => {
      const options = {
        fillColor: 'red',
        fillOpacity: 0.20,
        strokeColor: 'red',
        strokeOpacity: 1,
        strokeWeight: 1,
      };
      return (
        <GoogleMap
          ref={props.onMapLoad}
          defaultZoom={5}
          defaultCenter={{ lng: -71.038887, lat: 42.364506 }}
          onClick={props.onMapClick}
        >
          {props.markers.map(marker => (
            <Marker
              {...marker}
              onRightClick={() => props.onMarkerRightClick(marker)}
            />
          ))}
          {props.center && (
            <Circle
              ref={(circle) => { this.circle = circle; }}
              center={props.center}
              radius={props.radius}
              options={options}
            />
          )}
        </GoogleMap>
      );
    });

    const { location, heroes } = this.props;
    const { radius, longitude, latitude } = location;
    const center = {
      lat: latitude,
      lng: longitude,
    };
    const markers = _.map(heroes, hero => (
      {
        position: {
          lng: hero.coordinate[0],
          lat: hero.coordinate[1],
        },
        key: hero.cityname,
        defaultAnimation: 2,
      })
    );
    return (
      <div className="main">
        <MainGoogleMap
          ref={(container) => { this.container = container; }}
          containerElement={
            <div className="wrapper-container" />
          }
          mapElement={
            <div className="map-container" />
          }
          center={center}
          radius={this.getMeters(radius)}
          onMapLoad={this.handleMapLoad}
          markers={markers}
        />
      </div>
    );
  }
}

export default Map;
