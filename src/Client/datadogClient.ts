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

        console.log('Sending gauge metric to Datadog: ' + JSON.stringify(params));

        apiInstance
            .submitMetrics(params)
            .then((data: v2.IntakePayloadAccepted) => {
                console.log(
                    "API called successfully. Returned data: " + JSON.stringify(data)
                );
            })
            .catch((error: any) => console.error(error));
    }
};

export default datadogClient;
