import { v2 } from "@datadog/datadog-api-client";
import {GAUGE} from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/models/MetricIntakeType";

interface MetricSeriesFactory {
    buildGaugeMetricSeries: (points: v2.MetricPoint[], source: string) => v2.MetricSeries;
}

const metricSeriesFactory: MetricSeriesFactory = {
    buildGaugeMetricSeries: (points: v2.MetricPoint[], source: string): v2.MetricSeries => {
        console.log('Building gauge metric series for ' + source);
        let series = new v2.MetricSeries();
        series.metric = 'segment.event.volume.gauge';
        series.type = GAUGE;
        series.points = points;
        series.tags = [`source:${source}`];
        console.log(series.tags.at(0));
        return series;
    }
};

export default metricSeriesFactory;
