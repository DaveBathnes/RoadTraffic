// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Mapbox GL
import ReactMapboxGl, { ZoomControl, Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
	minZoom: 5,
	maxZoom: 18,
	scrollZoom: true,
	interactive: true,
	dragRotate: true,
	attributionControl: true
});

class TrafficMap extends Component {

	state = {
	}

	componentDidMount = () => {
	}

	render() {
		const { position, zoom, pitch, bearing, fit_bounds, traffic_points } = this.props;

		return (
			<Map
				style='style.json'  // eslint-disable-line react/style-prop-object
				center={position}
				zoom={zoom}
				maxZoom={17}
				pitch={pitch}
				bearing={bearing}
				fitBounds={fit_bounds}
				containerStyle={{ top: 0, bottom: 0, right: 0, left: 0, height: '100vh', width: '100vw', position: 'absolute' }}
			>
				<Layer
					type="circle"
					id="traffic-points-layer"
					layout={{}}
					paint={{}}
				>
					{traffic_points.map(tp => {
						return <Feature key={tp.count_point_id} coordinates={[tp.longitude, tp.latitude]} properties={tp} />
					})}
				</Layer>
				<ZoomControl position="bottom-right" />
			</Map>
		);
	}
}

TrafficMap.propTypes = {
}

export default TrafficMap;