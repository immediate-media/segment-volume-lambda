import { v2 } from "@datadog/datadog-api-client";
import {GAUGE} from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/models/MetricIntakeType";

interface DatadogGauge {
    getSeries: (points: v2.MetricPoint[], source: string) => v2.MetricSeries;
}

const datadogGauge: DatadogGauge = {
    getSeries: (points: v2.MetricPoint[], source: string): v2.MetricSeries => {
        let series = new v2.MetricSeries();
        series.metric = 'segment.event.volume.gauge';
        series.type = GAUGE;
        series.points = points;
        series.tags = [`source:${source}`];
        return series;
    }
};

export default datadogGauge;
