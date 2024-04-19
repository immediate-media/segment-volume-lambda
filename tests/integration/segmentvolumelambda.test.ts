import axios from 'axios';
import { handler } from '../../src';
import * as mockSegmentResponse from '../assets/mockSegmentResponse.json';
import * as emptySegmentResponse from '../assets/emptySegmentResponse.json';
import { client, v2 } from "@datadog/datadog-api-client";
import {GAUGE} from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/models/MetricIntakeType";

jest.useFakeTimers().setSystemTime(new Date('2024-01-01T12:00:00Z'));
// Mock the request to the Segment API
jest.mock('axios');

jest.mock("@datadog/datadog-api-client", () => {
    const metricsApiInstance = {
        submitMetrics: jest.fn(async () => { return { status: 'success' } })
    }

    return {
        v2: {
            ...jest.requireActual('@datadog/datadog-api-client').v2,
            MetricsApi: jest.fn(() => metricsApiInstance)// Mock MetricsApi constructor
        },
        client: {
            ...jest.requireActual('@datadog/datadog-api-client').client,
            createConfiguration: jest.fn().mockReturnValue({
                apiKey: 'test',
                appKey: 'test'
            })
        }
    }
});

describe('handler', () => {
    it('should send data from segment into datadog successfully', async () => {
        axios.get = jest.fn().mockResolvedValue(
            mockSegmentResponse
        )

        const metricsApiInstance = new v2.MetricsApi(client.createConfiguration());

        await handler();

        const expectedSeriesOne = new v2.MetricSeries();
        expectedSeriesOne.metric = 'segment.event.volume.gauge';
        expectedSeriesOne.type = GAUGE;
        expectedSeriesOne.points = [
            {
                "timestamp": 1709640000,
                "value": 1,
            },
            {
                "timestamp": 1709640060,
                "value": 0,
            },
            {
                "timestamp": 1709640120,
                "value": 2
            },
            {
                "timestamp": 1709640180,
                "value": 2
            },
            {
                "timestamp": 1709640240,
                "value": 0
            },

        ];
        expectedSeriesOne.tags = [
            'source:redacted-source-id-bbcgf-preprod-js',
            'source_name:Good Food Pre Production Javascript'
        ];

        const expectedSeriesTwo = new v2.MetricSeries();
        expectedSeriesTwo.metric = 'segment.event.volume.gauge';
        expectedSeriesTwo.type = GAUGE;
        expectedSeriesTwo.points = [
            {
                "timestamp": 1709640000,
                "value": 1,
            },
            {
                "timestamp": 1709640060,
                "value": 0,
            },
            {
                "timestamp": 1709640120,
                "value": 0
            },
            {
                "timestamp": 1709640180,
                "value": 0
            },
            {
                "timestamp": 1709640240,
                "value": 0
            },

        ];
        expectedSeriesTwo.tags = [
            'source:redacted-source-id-bbcgf-preprod-react-native',
            'source_name:Good Food Pre Production React Native App'
        ];

        expect(metricsApiInstance.submitMetrics).toHaveBeenNthCalledWith(
            1,
            {
                body: {
                    series: [
                        expectedSeriesOne
                    ]
                }
            }
        )
        expect(metricsApiInstance.submitMetrics).toHaveBeenNthCalledWith(
            2,
            {
                body: {
                    series: [
                        expectedSeriesTwo
                    ]
                }
            }
        )
        expect(metricsApiInstance.submitMetrics).toHaveBeenCalledTimes(2);
    });

    it('sends no data to Datadog if there is no data from Segment', async () => {
        axios.get = jest.fn().mockResolvedValue(emptySegmentResponse);

        const metricsApiInstance = new v2.MetricsApi(client.createConfiguration());

        await handler();

        expect(metricsApiInstance.submitMetrics).not.toHaveBeenCalled();
    });

    it('should throw an error if the Segment API request fails', async () => {
        axios.get = jest.fn().mockRejectedValue(new Error('Failed to fetch data from Segment API'));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        await handler();

        expect(consoleErrorSpy).toHaveBeenCalledWith('SegmentClientError : Error fetching data: Failed to fetch data from Segment API');
    });

    it('should throw an error if the Datadog API request fails', async () => {
        axios.get = jest.fn().mockResolvedValue(
            mockSegmentResponse
        )

        const metricsApiInstance = new v2.MetricsApi(client.createConfiguration());
        metricsApiInstance.submitMetrics = jest.fn().mockRejectedValue(new client.ApiException(403, 'Failed to submit metrics'));
        (v2.MetricsApi as jest.Mock).mockImplementation(() => metricsApiInstance);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        await handler();

        expect(consoleErrorSpy).toHaveBeenNthCalledWith(1, "Error submitting metrics:", "Failed to submit metrics");
        expect(consoleErrorSpy).toHaveBeenNthCalledWith(2, "Error submitting metrics:", "Failed to submit metrics");
    });
});
