const { segmentClient } = require('../lib/Client/segmentClient');
const { datadogClient } = require('../lib/Client/datadogClient');
const { chunkEventVolumes } = require('../lib/Helper/chunkEventVolumes');
const { datadogGauge } = require('../lib/model/datadogGauge');
const processor = async () => {
    try {
        const volumes = await segmentClient.getVolumes();
        console.log(volumes);
        for (const volume of volumes.data.result) {
            let ddBody = datadogGauge.getRequestBody(chunkEventVolumes.chunk(volume.series), volume.source.id);
            console.log(ddBody);
            datadogClient.sendGaugeMetric(ddBody);
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = { processor };
