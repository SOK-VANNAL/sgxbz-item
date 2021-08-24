import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-summary-card',
  template: `
    <nz-card
      style="height: 100%"
      [nzBodyStyle]="{padding: '16px'}">
      <div nz-row nzJustify="space-between" nzAlign="middle">
        <h2 style="font-size: 16px">{{'product_summary' | translate}}</h2>
        <div>
          <a nzType="primary" style="font-size: 16px">{{'add_new' | translate}}</a>
        </div>
      </div>
      <div nz-row nzAlign="middle">
        <h1 style="font-size: 32px; margin-right: 5px">126,560</h1>
        <i nz-icon nzType="shopping-cart" nzTheme="outline" style="font-size: 24px; color: #99A3A4"></i>
      </div>
      <div nz-row [nzGutter]="10">
        <div nz-col nzSpan="24">
          <div nz-row nzAlign="middle">
            <h3 style="margin-right: 10px; color: black">150</h3>
            <p style="color: #99A3A4">{{'item_type' | translate}}</p>
          </div>
        </div>
      </div>
    </nz-card>
  `,
  styles: [`
    h1, h2, h3, h4, h5, h6, p {
      margin: 0px;
    }
  `]
})
export class ProductSummaryCardComponent {
  constructor() {
  }
  @Input() data: { title: string, content: string } = { title: '', content: ''};
}
