import { segmentClient } from "./Client/segmentClient";
import datadogGauge from "./Model/datadogGauge";
import datadogClient from "./Client/datadogClient";
import { eventVolume } from "./Transformer/EventVolume";

const processor = async () => {
    try {
        const volumes = await segmentClient.getVolumes();
        console.log(volumes);
        for (const volume of volumes.data.result) {
            let ddBody = datadogGauge.getSeries(eventVolume.convertToMetricPoints(volume.series), volume.source.id);
            console.log(ddBody);
            datadogClient.sendGaugeMetric(ddBody);
        }
    } catch (error) {
        console.error(error);
    }
};

export { processor };
