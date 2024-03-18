import { v2 } from "@datadog/datadog-api-client";

interface EventVolume {
    time: string;
    count: number;
}

const eventVolume = {
    convertToMetricPoints: (eventVolumes: EventVolume[]): v2.MetricPoint[] => {
        return eventVolumes.map((volume) => ({
            timestamp: new Date(volume.time).getTime() / 1000, // Convert to seconds
            value: volume.count
        }))
    }
};

export default eventVolume;
