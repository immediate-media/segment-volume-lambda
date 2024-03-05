import segmentClient from "./Client/segmentClient";
import datadogClient from "./Client/datadogClient";
import metricSeriesFactory from "./Factory/metricSeriesFactory";
import eventVolume from "./Transformer/eventVolume";

const processor = async () => {
    try {
        const volumes = await segmentClient.getVolumes();
        console.log(volumes);
        for (const volume of volumes.data.result) {
            let ddBody = metricSeriesFactory.buildGaugeMetricSeries(eventVolume.convertToMetricPoints(volume.series), volume.source.id);
            console.log(ddBody);
            datadogClient.sendGaugeMetric(ddBody);
        }
    } catch (error) {
        console.error(error);
    }
};

export { processor };
