import axios from 'axios';
import segmentClient from '../../../src/Client/segmentClient';

const result = [
    {
        source: {id: 'abc'},
        series: [
            {time: '2024-01-01T11:00:00Z', count: 1},
            {time: '2024-01-01T11:01:00Z', count: 2},
        ]
    }
];

jest.mock('axios');

jest.useFakeTimers().setSystemTime(new Date('2024-01-01T12:00:00Z'));

describe('segmentClient', () => {
    describe('when request succeeds', () => {
        it('gets expected data from segment', async () => {
            // Mock axios.get to resolve with data
            axios.get = jest.fn().mockResolvedValue({ data: { result: result } });

            // Call the function that makes the axios request
            const volumes = await segmentClient.getVolumes();

            // Expect axios.get to have been called with the correct parameters
            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(
                'https://eu1.api.segmentapis.com/events/volume?granularity=minute&startTime=2024-01-01T11:00:00.000Z&endTime=2024-01-01T12:00:00.000Z&groupBy[]=sourceId',
                { headers: { 'Authorization': `Bearer ${process.env.SEGMENT_API_KEY}`, 'Content-Type': 'application/json' } }
            );

            // Expect the volumes to match the expected result
            expect(volumes).toEqual({ result: result });
        });
    });

    describe('when request fails', () => {
        it('logs the error', async () => {

            // Mock axios.get to throw an error
            const errorMessage = 'Failed to fetch data';
            axios.get = jest.fn().mockRejectedValue(new Error(errorMessage));

            // Spy on console.error
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

            await segmentClient.getVolumes();

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', errorMessage);

            // Restore the original implementation of console.error
            consoleErrorSpy.mockRestore();
        });
    });
});
