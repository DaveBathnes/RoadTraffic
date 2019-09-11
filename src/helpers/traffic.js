// Axios for making requests
import axios from 'axios';

const config = require('./config.json');

export function getLocalAuthorities(callback) {
    axios.get(config.cors_proxy + ((config.api + 'local-authorities')), { headers: { origin: 'localhost' } })
        .then(response => {
            if (response && response.data) {
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
    axios.get(config.api + 'average-annual-daily-flow-by-direction?filter[local_authority_id]=' + authority + '&filter[year]=' + year)
        .then(response => {
            if (response && response.data) {
                callback(response.data);
            } else {
                callback([]);
            }
        })
        .catch(err => callback([]));
}
