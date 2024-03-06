import { GAUGE } from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/models/MetricIntakeType";
import datadogClient from "../../../src/Client/datadogClient";
import { client, v2 } from "@datadog/datadog-api-client";
import { ApiException } from "@datadog/datadog-api-client/dist/packages/datadog-api-client-common";

// Mock the Datadog API client
jest.mock("@datadog/datadog-api-client", () => {
    const metricsApiInstance = {
        submitMetrics: jest.fn(async () => { return { status: 'success' } })
    }

    return {
        v2: {
            MetricsApi: jest.fn(() => metricsApiInstance)// Mock MetricsApi constructor
        },
        client: {
            createConfiguration: jest.fn().mockReturnValue({
                apiKey: 'test',
                appKey: 'test'
            })
        }
    }
});

describe('datadogClient', () => {
    describe('when request succeeds', () => {
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

            // Mock the submitMetrics method
            const metricsApiInstance = new v2.MetricsApi(client.createConfiguration());

            await datadogClient.sendGaugeMetric(mockSeries);
            expect(metricsApiInstance.submitMetrics).toHaveBeenCalledTimes(1);
            expect(metricsApiInstance.submitMetrics).toHaveBeenCalledWith({ body: { series: [mockSeries] } });
        });
    });

    describe('when request fails', () => {
        it('should log the error', async () => {
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

            // Mock the submitMetrics method to throw an error
            const errorMessage = 'Failed to submit metrics';
            const metricsApiInstance = new v2.MetricsApi(client.createConfiguration());
            metricsApiInstance.submitMetrics = jest.fn().mockRejectedValue(new ApiException(403, errorMessage));
            (v2.MetricsApi as jest.Mock).mockImplementation(() => metricsApiInstance);

            // Spy on console.error
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

            await datadogClient.sendGaugeMetric(mockSeries);

            // Verify console.error is called with the correct error message
            expect(consoleErrorSpy).toHaveBeenCalledWith('Error submitting metrics:', errorMessage);

            consoleErrorSpy.mockRestore();
        });
    });
});
