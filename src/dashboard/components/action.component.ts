import { Component } from '@angular/core';

@Component({
  selector: 'app-action',
  template: `
    <nz-card
      style="height: 100%"
      [nzBodyStyle]="{padding: '20px 16px'}">
      <div nz-row nzJustify="space-between">
        <h2 style="font-size: 16px">{{'user_activity' | translate}}</h2>
        <i nz-icon nzType="audit" nzTheme="outline" style="color: #99A3A4; font-size: 18px"></i>
      </div>
      <nz-divider style="margin: 18px 0"></nz-divider>
      <div>
        <h4 style="font-weight: bold;">{{'transaction' | translate}}</h4>
        <ul>
          <li>
            <a>
              <i nz-icon nzType="file-text" nzTheme="outline"></i>
              <span>{{'invoice' | translate}}</span>
            </a>
          </li>
          <li>
            <a>
              <i nz-icon nzType="dollar-circle" nzTheme="outline"></i>
              <p style="display: inline; margin-left: 5px">{{'payment' | translate}}</p>
            </a>
          </li>
          <li>
            <a [routerLink]="['/product/item']">
              <i nz-icon nzType="shopping-cart" nzTheme="outline"></i>
              <p style="display: inline; margin-left: 5px">{{'item' | translate}}</p>
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 style="font-weight: bold">{{'report' | translate}}</h4>
        <ul>
          <li>
            <a>
              <i nz-icon nzType="dollar-circle" nzTheme="outline"></i>
              <p style="display: inline; margin-left: 5px">
                {{'gain_loss_amount' | translate}}
              </p>
            </a>
          </li>
          <li>
            <a>
              <i nz-icon nzType="credit-card" nzTheme="outline"></i>
              <p style="display: inline; margin-left: 5px">{{'due_amount' | translate}}</p>
            </a>
          </li>
          <li>
            <a>
              <i nz-icon nzType="container" nzTheme="outline"></i>
              <p style="display: inline; margin-left: 5px">{{'sale_summary_by_date' | translate}}</p>
            </a>
          </li>
          <li>
            <a>
              <i nz-icon nzType="stock" nzTheme="outline"></i>
              <p style="display: inline; margin-left: 5px">{{'stock' | translate}}</p>
            </a>
          </li>
        </ul>
      </div>
    </nz-card>
  `,
  styles: [`
    h1, h2, h3, h4, h5, h6, p {
      margin: 0px;
    }
    ul {
      margin: 0px;
      padding: 0px;
      list-style: none
    }
  `]
})

export class ActionComponent {
  constructor() {
  }
}
