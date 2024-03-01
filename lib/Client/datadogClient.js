import { client, v2 } from "@datadog/datadog-api-client";

const axios = require('axios');
const configuration = client.createConfiguration()

const datadogClient = {
    sendGaugeMetric: async () => {

    }
};

const getHeaders = () => {
    return {
        'Authorization': `Bearer ${process.env.DATADOG_API_KEY}`,
        'Content-Type': 'application/json'
    }
}

module.exports = { segmentClient };
