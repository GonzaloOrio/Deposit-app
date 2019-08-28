import { Routes } from '@angular/router';
import { StatisticsComponent } from '../deposit-expenditure/statistics/statistics.component';
import { DepositExpenditureComponent } from '../deposit-expenditure/deposit-expenditure.component';
import { DetailComponent } from '../deposit-expenditure/detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'deposit-expenditure', component: DepositExpenditureComponent },
  { path: 'detail', component: DetailComponent }
];
