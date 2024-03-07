import eventVolume from "../../../src/Transformer/eventVolume";

describe('eventVolume', () => {
    it('should convert to metric points', () => {
        const eventVolumes = [
            {
                time: '2021-01-01T00:00:00Z',
                count: 100
            },
            {
                time: '2021-01-01T00:01:00Z',
                count: 0
            },
            {
                time: '2021-01-01T00:02:00Z',
                count: 94

            }
        ];

        const metricPoints = eventVolume.convertToMetricPoints(eventVolumes);

        expect(metricPoints).toEqual([
            {
                timestamp: 1609459200,
                value: 100
            },
            {
                timestamp: 1609459260,
                value: 0
            },
            {
                timestamp: 1609459320,
                value: 94
            }
        ]);
    });
});
