import {Routes} from '@angular/router';
import { DashboardComponent} from './dashboard.component';

export const DASHBOARD_ROUTE: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: []
  }
];
