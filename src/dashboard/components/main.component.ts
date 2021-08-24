import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-main',
  template: `
    <nz-tabset [nzSelectedIndex]="1"  [nzTabBarExtraContent]="extraTemplate" style="border: 1px solid whitesmoke; padding: 20px 40px; height: 100%; background: white;">
      <nz-tab></nz-tab>
      <nz-tab [nzTitle]="tap1">
        <ng-template #tap1 let-visible="visible">
          <i nz-icon nzType="bar-chart" nzTheme="outline"></i>
          <span>{{'bar_graph' | translate}}</span>
        </ng-template>
        <div echarts [options]="barChartOption"></div>
      </nz-tab>
      <nz-tab [nzTitle]="tap2">
        <ng-template #tap2 let-visible="visible">
          <i nz-icon nzType="line-chart" nzTheme="outline"></i>
          <span>{{'line_graph' | translate}}</span>
        </ng-template>
        <div echarts [options]="lineChartOption"></div>
      </nz-tab>
    </nz-tabset>
    <ng-template #extraTemplate>
      <div style="margin-bottom: 10px">
        <app-filter-input storageKey="dashboard-search"></app-filter-input>
      </div>
    </ng-template>
  `,
  styles: [`
    h1, h2, h3, h4, h5, h6, p {
      margin: 0px;
    }
  `]
})

export class MainComponent{
  constructor() {
  }
  barChartOption: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: 'Counters',
      type: 'bar',
      barWidth: '60%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }]
  };

  lineChartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '3%',
      containLabel: true
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };
}
