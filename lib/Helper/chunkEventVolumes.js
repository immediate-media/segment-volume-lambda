const chunk_size = 5; // 5 minute intervals

const chunkEventVolumes = {
    chunk: (eventVolumes) => {
        const items = [];
        // Skip the first items that don't start on a 0 or chunk_size minute
        let startIndex = 0;
        while (startIndex < eventVolumes.length && new Date(eventVolumes[startIndex].time).getUTCMinutes() % chunk_size !== 0) {
            startIndex++;
        }

        // Ignore the last items if they won't create a 5-minute chunk
        let endIndex = eventVolumes.length;
        while (endIndex > 0 && new Date(eventVolumes[endIndex - 1].time).getUTCMinutes() % chunk_size !== 0) {
            endIndex--;
        }

        eventVolumes = arrayChunk(eventVolumes.slice(startIndex, endIndex - 1), chunk_size);

        for (const volume of eventVolumes) {
            let totalCount = 0;
            for(let i = 0; i < volume.length; i++) {
                totalCount += volume[i].count;
            }
            items.push({ startTime: volume[0].time, endTime: volume[chunk_size - 1].time, count: totalCount });
        }

        return items;
    }
};

const arrayChunk = (array, size) => {
    const chunkedArray = [];
    let index = 0;

    while (index < array.length) {
        chunkedArray.push(array.slice(index, index + size));
        index += size;
    }

    return chunkedArray;
};

module.exports = { chunkEventVolumes };
