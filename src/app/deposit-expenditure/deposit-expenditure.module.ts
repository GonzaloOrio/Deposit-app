import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { DepositExpenditureComponent } from './deposit-expenditure.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { OrderItemsPipe } from './order-items.pipe';

import { StoreModule } from '@ngrx/store';
import { itemsReducer } from './deposit-expenditure.reducer';

@NgModule({
  declarations: [DashboardComponent, DepositExpenditureComponent, StatisticsComponent, DetailComponent, OrderItemsPipe],
  imports: [CommonModule, ReactiveFormsModule, ChartsModule, SharedModule, DashboardRoutingModule, StoreModule.forFeature('items', itemsReducer)],
  exports: []
})
export class DepositExpenditureModule {}
