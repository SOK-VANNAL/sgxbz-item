import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <nz-card
      style="height: 100%"
      [nzBodyStyle]="{padding: '16px'}">
      <div nz-row nzJustify="space-between">
        <h2 style="font-size: 16px">{{'user' | translate}}</h2>
        <i nz-icon nzType="info-circle" nzTheme="outline" style="color: #99A3A4; font-size: 18px"></i>
      </div>
      <div nz-row nzAlign="middle">
        <i nz-icon nzType="user" nzTheme="outline" style="font-size: 42px"></i>
        <h2 style="font-size: 32px">110</h2>
      </div>
      <div>
        <p style="display: inline; color: #33DB36; margin-right: 10px">+25</p>
        <span style="color: #99A3A4">{{'new_user' | translate}}</span>
      </div>
    </nz-card>
  `,
  styles: [`
    h1, h2, h3, h4, h5, h6, p {
      margin: 0px;
    }
  `]
})

export class UserCardComponent {
  constructor() {
  }
}
