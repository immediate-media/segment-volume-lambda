import segmentClient from "../Client/segmentClient";
import datadogClient from "../Client/datadogClient";
import metricSeriesFactory from "../Factory/metricSeriesFactory";
import eventVolume from "../Transformer/eventVolume";

interface ProcessingController {
    process: () => Promise<any>;
}

const processor: ProcessingController = {
    process: async () => {
        try {
            const volumes = await segmentClient.getVolumes();
            for (const volume of volumes.data.result) {
                let ddBody = metricSeriesFactory.buildGaugeMetricSeries(
                    eventVolume.convertToMetricPoints(volume.series),
                    volume.source.id
                );
                datadogClient.sendGaugeMetric(ddBody);
            }
        } catch (error) {
            console.error(error);
        }
    }
};

export default processor;
