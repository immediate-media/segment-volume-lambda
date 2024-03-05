import { client, v2 } from "@datadog/datadog-api-client";
import {ApiException} from "@datadog/datadog-api-client/dist/packages/datadog-api-client-common";

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
            console.error('Error submitting metrics:', error instanceof ApiException ? error.body : String(error));
        });
    }
};

export default datadogClient;
