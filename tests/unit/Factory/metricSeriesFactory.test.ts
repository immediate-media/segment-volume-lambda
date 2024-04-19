import metricSeriesFactory from "../../../src/Factory/metricSeriesFactory";
import {GAUGE} from "@datadog/datadog-api-client/dist/packages/datadog-api-client-v2/models/MetricIntakeType";

describe('metricSeriesFactory', () => {
    it('should build a gauge metric series', () => {
        const points = [
            {
                value: 100,
                timestamp: 1000000000
            }
        ];
        const source = 'segment';
        const source_name = 'Segment';

        const series = metricSeriesFactory.buildGaugeMetricSeries(points, source, source_name);

        expect(series.metric).toEqual('segment.event.volume.gauge');
        expect(series.type).toEqual(GAUGE);
        expect(series.points).toEqual(points);
        expect(series.tags).toEqual(['source:segment','sourcename:Segment']);
    });
});
