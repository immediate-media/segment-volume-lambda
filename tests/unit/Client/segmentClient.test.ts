import axios from 'axios';
import segmentClient from '../../../src/Client/segmentClient';

jest.mock('axios', () => {
    return {
        get: jest.fn(() => Promise.resolve({ data: { result: [] } }))
    }
});

jest.useFakeTimers().setSystemTime(new Date('2024-01-01T12:00:00Z'));

describe('segmentClient', () => {
    it('calls axios.get with correct params', async () => {
        const result = await segmentClient.getVolumes();
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
            'https://eu1.api.segmentapis.com/events/volume?granularity=minute&startTime=2024-01-01T11:00:00.000Z&endTime=2024-01-01T12:00:00.000Z&groupBy[]=sourceId',
            { headers: { 'Authorization': `Bearer ${process.env.SEGMENT_API_KEY}`, 'Content-Type': 'application/json' } }
        )
        expect(result).toEqual({ result: [] });
    });

    // Add more test cases as needed
});
