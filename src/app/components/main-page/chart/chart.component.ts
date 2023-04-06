import { ChangeDetectionStrategy, Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  @Input() options: Highcharts.Options = {};
  HighCharts: typeof Highcharts = Highcharts;

  ngOnInit() {
    Highcharts.chart('highChartContainer', this.options);
  }

  ngOnChanges(changes: SimpleChanges) {
    //todo add a check here for comparing previous with current value
    Highcharts.chart('highChartContainer', this.options);
  }
}
