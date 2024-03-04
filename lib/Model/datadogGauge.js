const datadogGauge = {
    getRequestBody: (points, source) => {
        return {
            metric: 'segment.event.volume.gauge',
            type: 3,
            points: points.map((point) => {
                return {
                    timestamp: new Date(point.endTime).getTime() / 1000, // Convert date to seconds (POSIX time)
                    value: point.count
                };
            }),
            tags: ['source:' + source]
        };
    }
}

module.exports = { datadogGauge };
