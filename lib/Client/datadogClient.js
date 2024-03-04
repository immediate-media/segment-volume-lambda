const { client, v2 } = require("@datadog/datadog-api-client");



const datadogClient = {
    sendGaugeMetric: (series) => {
        const apiInstance = new v2.MetricsApi(client.createConfiguration());

        const params = {
            body: {
                series: [
                    series
                ]
            }
        };

        console.log('Sending gauge metric to Datadog: ' + JSON.stringify(params));

        apiInstance
            .submitMetrics(params)
            .then((data) => {
                console.log(
                    "API called successfully. Returned data: " + JSON.stringify(data)
                );
            })
            .catch((error) => console.error(error));
    }
};

module.exports = { datadogClient };
