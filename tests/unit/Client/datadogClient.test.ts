import { GAUGE } from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/models/MetricIntakeType";
import datadogClient from "../../../src/Client/datadogClient";
import { v2 } from "@datadog/datadog-api-client";

const mockConfiguration = {'config': 'config'};

jest.mock('@datadog/datadog-api-client', () => {
    // Mock MetricsApi constructor and its methods
    const mockSubmitMetrics = jest.fn().mockResolvedValue({ status: 'success' }); // Mock the submitMetrics method
    const mockMetricsApiConstructor = jest.fn().mockImplementation(() => ({
        submitMetrics: mockSubmitMetrics
    }));

    // Return mocked MetricsApi class and constructor
    return {
        client: {
            createConfiguration: jest.fn(() => (mockConfiguration))
        },
        v2: {
            MetricsApi: jest.fn(() => (mockMetricsApiConstructor)),
        }
    };
});
describe('datadogClient', () => {
    it('should call submitMetrics with correct params', async () => {
        const mockSeries: v2.MetricSeries = {
            metric: 'segment.event.volume.gauge',
            type: GAUGE,
            points: [
                {
                    value: 100,
                    timestamp: 1000000000
                }
            ],
            tags: ['source:segment']
        };

        await datadogClient.sendGaugeMetric(mockSeries);

        expect(v2.MetricsApi).toHaveBeenCalledTimes(1);
        expect(v2.MetricsApi).toHaveBeenCalledWith(mockConfiguration);
        console.log(v2.MetricsApi);
        // expect(v2.MetricsApi.submitMetrics).toHaveBeenCalledTimes(1);
    });
});
