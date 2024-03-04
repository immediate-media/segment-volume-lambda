import { v2 } from "@datadog/datadog-api-client";
import * as process from "process";

interface EventVolume {
    time: string;
    count: number;
}

const eventVolume = {
    convertToMetricPoints: (eventVolumes: EventVolume[]): v2.MetricPoint[] => {
        const points: v2.MetricPoint[] = [];

        for (const volume of eventVolumes) {
            if(volume.count === 0) {
                continue;
            }

            points.push({
                timestamp: new Date(volume.time).getTime() / 1000, // Convert to seconds
                value: volume.count
            });
        }

        return points;
    }
};

export { eventVolume };
