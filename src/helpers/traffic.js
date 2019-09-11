// Axios for making requests
import axios from 'axios';

import * as MapboxGL from 'mapbox-gl';

const config = require('./config.json');

export function getLocalAuthorities(callback) {
    axios.get(config.cors_proxy + ((config.api + 'local-authorities')), { headers: { origin: 'localhost' } })
        .then(response => {
            if (response && response.data && response.data.data) {
                callback(response.data.data);
            } else {
                callback([]);
            }
        })
        .catch(err => {
            callback([])
        });
}

export function getAnnualAverageDailyFlowByAuthorityAndYear(authority, year, callback) {
    axios.get(config.cors_proxy + config.api + 'average-annual-daily-flow-by-direction?filter[local_authority_id]=' + authority + '&filter[year]=' + year)
        .then(response => {
            if (response && response.data && response.data.data) {

                // Get the overall bounds
                let coords = [];
                response.data.data.forEach(tp => {
                    coords.push([tp.longitude, tp.latitude]);
                });
                let bounds = coords.reduce(function (bounds, coord) {
                    return bounds.extend(coord);
                }, new MapboxGL.LngLatBounds(coords[0], coords[0]));
                const sw = bounds.getSouthWest();
                const ne = bounds.getNorthEast();

                // Get some totals
                let totals = {
                    all_hgvs: 0,
                    all_motor_vehicles: 0,
                    buses_and_coaches: 0,
                    cars_and_taxis: 0,
                    pedal_cycles: 0,
                    two_wheeled_motor_vehicles: 0
                }

                response.data.data.forEach(tp => {
                    totals.all_hgvs = totals.all_hgvs + tp.all_hgvs;
                    totals.all_motor_vehicles = totals.all_motor_vehicles + tp.all_motor_vehicles;
                    totals.buses_and_coaches = totals.buses_and_coaches + tp.buses_and_coaches;
                    totals.cars_and_taxis = totals.cars_and_taxis + tp.cars_and_taxis;
                    totals.pedal_cycles = totals.pedal_cycles + tp.pedal_cycles;
                    totals.two_wheeled_motor_vehicles = totals.two_wheeled_motor_vehicles + tp.two_wheeled_motor_vehicles;
                });

                let percentages = {
                    all_hgvs: Math.round((totals.all_hgvs / (totals.all_motor_vehicles + totals.pedal_cycles)) * 100),
                    buses_and_coaches: Math.round((totals.buses_and_coaches / (totals.all_motor_vehicles + totals.pedal_cycles)) * 100),
                    cars_and_taxis: Math.round((totals.cars_and_taxis / (totals.all_motor_vehicles + totals.pedal_cycles)) * 100),
                    pedal_cycles: Math.round((totals.pedal_cycles / (totals.all_motor_vehicles + totals.pedal_cycles)) * 100),
                    two_wheeled_motor_vehicles: Math.round((totals.two_wheeled_motor_vehicles / (totals.all_motor_vehicles + totals.pedal_cycles)) * 100),
                }

                callback({ data: response.data.data, bounds: [[sw.lng, sw.lat], [ne.lng, ne.lat]], percentages: percentages });
            } else {
                callback({ data: [], bounds: undefined, percentages: {} });
            }
        })
        .catch(err => {
            callback({ data: [], bounds: undefined, percentages: {} });
        });
}
