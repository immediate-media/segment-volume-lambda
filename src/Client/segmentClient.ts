import * as util from 'util';
import axios from 'axios';
import { SegmentClientError } from "./Error/segmentClientError";

const apiUrl: string = 'https://eu1.api.segmentapis.com';

interface SegmentClient {
    getVolumes: () => Promise<any>;
}

const segmentClient: SegmentClient = {
    getVolumes: async () => {
        const currentTime: Date = new Date();

        const pathFormat: string = `/events/volume?granularity=minute&startTime=%s&endTime=%s&groupBy[]=sourceId`;
        const path: string = util.format(
            pathFormat,
            toISO8601(new Date(currentTime.getTime() - (60 * 60 * 1000))),
            toISO8601(currentTime)
        );

        try {
            const response = await axios.get(apiUrl + path, { headers: getHeaders() });
            return response.data; // Return the data
        } catch (error) {
            throw new SegmentClientError(
                'Error fetching data: ' + ((error instanceof Error) ? error.message : String(error))
            );
        }
    }
};

const toISO8601 = (date: Date): string => {
    return date.toISOString();
}

const getHeaders = (): Record<string, string> => {
    return {
        'Authorization': `Bearer ${process.env.SEGMENT_API_KEY}`,
        'Content-Type': 'application/json'
    }
}

export default segmentClient;
