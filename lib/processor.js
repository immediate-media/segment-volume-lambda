const { segmentClient } = require('../lib/Client/segmentClient');
const { chunkEventVolumes } = require('../lib/Helper/chunkEventVolumes');
const processor = async () => {
    try {
        const volumes = await segmentClient.getVolumes();
        for (const volume of volumes.data.result) {
            console.log(chunkEventVolumes.chunk(volume.series));
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = { processor };
