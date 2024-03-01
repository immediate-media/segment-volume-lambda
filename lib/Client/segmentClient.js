const util = require('util');
const axios = require('axios');

const apiUrl = 'https://eu1.api.segmentapis.com';

const segmentClient = {
    getVolumes: async () => {
        const currentTime = new Date();

        const pathFormat = `/events/volume?granularity=minute&startTime=%s&endTime=%s&groupBy[]=sourceId`;
        const path = util.format(
            pathFormat,
            toISO8601(new Date(currentTime.getTime() - (60 * 60 * 1000))),
            toISO8601(currentTime)
        );

        try {
            const response = await axios.get(apiUrl + path, { headers: getHeaders() });
            return response.data; // Return the data
        } catch (error) {
            console.error('Error:', error);
            throw error; // Rethrow the error to propagate it
        }
    }
};

const toISO8601 = (date) => {
    return date.toISOString();
}

const getHeaders = () => {
    return {
        'Authorization': `Bearer ${process.env.SEGMENT_API_KEY}`,
        'Content-Type': 'application/json'
    }
}

module.exports = { segmentClient };
