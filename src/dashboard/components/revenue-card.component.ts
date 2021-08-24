import { Component } from '@angular/core';

@Component({
  selector: 'app-revenue-card',
  template: `
    <nz-card
      style="height: 100%"
      [nzBodyStyle]="{padding: '16px'}">
      <div nz-row nzJustify="space-between">
        <h2 style="font-size: 16px">{{'profit_loss' | translate}}</h2>
        <i nz-icon nzType="dollar-circle" nzTheme="outline" style="color: #99A3A4; font-size: 18px"></i>
      </div>
      <div>
        <h1 style="display: inline; margin-right: 5px">0.8449</h1>
        <span style="color: #99A3A4">$20</span>
      </div>
      <div>
        <p style="display: inline; color: #DB3333; margin-right: 10px">-2.35%</p>
        <span style="color: #99A3A4">{{'this_week' | translate}}</span>
      </div>
    </nz-card>
  `,
  styles: [`
    h1, h2, h3, h4, h5, h6, p {
      margin: 0px;
    }
  `]
})

export class RevenueCardComponent {
  constructor() {
  }
}
