import segmentClient from "../Client/segmentClient";
import datadogClient from "../Client/datadogClient";
import metricSeriesFactory from "../Factory/metricSeriesFactory";
import eventVolume from "../Transformer/eventVolume";
import {SegmentClientError} from "../Client/Error/segmentClientError";

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
                await datadogClient.sendGaugeMetric(ddBody);
            }
        } catch (error) {
            // @ts-ignore
            console.log(error.toString());
            let message = '';
            switch (true) {
                case error instanceof SegmentClientError:
                    message = error.name + ' : ' + error.message;
                    break;
                default:
                    message = 'Error processing volumes: ' + String(error);
                    break;
            }
            console.error(message);
        }
    }
};

export default processor;
