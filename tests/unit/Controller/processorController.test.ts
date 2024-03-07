import segmentClient from "../../../src/Client/segmentClient";
import datadogClient from "../../../src/Client/datadogClient";
import metricSeriesFactory from "../../../src/Factory/metricSeriesFactory";
import processor from "../../../src/Controller/processingController";

const timestampOne = '2024-01-01T11:00:00Z';
const timestampTwo = '2024-01-01T11:01:00Z';

const convertToSeconds = (timestamp: string) => new Date(timestamp).getTime() / 1000;

jest.mock("../../../src/Client/segmentClient",  () => {
    return {
        getVolumes: jest.fn(() => Promise.resolve({
            data: {
                result: [
                    {
                        source: {id: 'abc'},
                        series: [
                            {time: timestampOne, count: 1},
                            {time: timestampTwo, count: 2},
                        ]
                    },
                    {
                        source: {id: 'def'},
                        series: [
                            {time: timestampOne, count: 3},
                            {time: timestampTwo, count: 4},
                        ]
                    }
                ]
            }
        }))
    }
});

jest.mock("../../../src/Client/datadogClient");

describe("processor", () => {
    it("should call datadogClient.sendGaugeMetric with correct arguments", async () => {
        await processor.process();
        expect(segmentClient.getVolumes).toHaveBeenCalledTimes(1);

        expect(datadogClient.sendGaugeMetric).toHaveBeenNthCalledWith(1, metricSeriesFactory.buildGaugeMetricSeries([
            {timestamp: convertToSeconds(timestampOne), value: 1},
            {timestamp: convertToSeconds(timestampTwo), value: 2},
        ], 'abc'));
        expect(datadogClient.sendGaugeMetric).toHaveBeenNthCalledWith(2, metricSeriesFactory.buildGaugeMetricSeries([
            {timestamp: convertToSeconds(timestampOne), value: 3},
            {timestamp: convertToSeconds(timestampTwo), value: 4},
        ], 'def'));
    });
});
