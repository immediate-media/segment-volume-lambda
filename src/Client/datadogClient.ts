import { client, v2 } from "@datadog/datadog-api-client";

const datadogClient = {
    sendGaugeMetric: (series: v2.MetricSeries) => {
        const apiInstance = new v2.MetricsApi(client.createConfiguration());

        const params: v2.MetricsApiSubmitMetricsRequest = {
            body: {
                series: [
                    series
                ]
            }
        };

        apiInstance.submitMetrics(params).catch((error: any) => {
            console.error('Error submitting metrics:', error instanceof client.ApiException ? error.body : String(error));
        });
    }
};

export default datadogClient;
