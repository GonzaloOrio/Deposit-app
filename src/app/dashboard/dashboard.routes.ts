import { Routes } from '@angular/router';
import { StatisticsComponent } from '../deposit-withdraw/statistics/statistics.component';
import { DepositWithdrawComponent } from '../deposit-withdraw/deposit-withdraw.component';
import { DetailComponent } from '../deposit-withdraw/detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticsComponent },
  { path: 'deposit-withdraw', component: DepositWithdrawComponent },
  { path: 'detail', component: DetailComponent }
];
