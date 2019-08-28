import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepositExpenditure } from '../deposit-expenditure.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Label } from 'ng2-charts';

import { AppItemsState } from '../deposit-expenditure.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit, OnDestroy {
  private itemsSubscription: Subscription = new Subscription();
  items: DepositExpenditure[] = [];

  totalDeposit: number;
  totalExpenditure: number;

  percentDeposit: number;
  percentExpenditure: number;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Gastos'];
  public doughnutChartData: any = [];

  constructor(private store: Store<AppItemsState>) {}

  ngOnInit() {
    this.itemsSubscription = this.store.select('items').subscribe(data => {
      this.resetCountersData(data.items);
    });
  }

  resetCountersData(items: DepositExpenditure[]) {
    this.totalDeposit = 0;
    this.totalExpenditure = 0;
    this.percentDeposit = 0;
    this.percentExpenditure = 0;
    // this.items = [...data.items];
    items.map((item: DepositExpenditure) => {
      if (item.type === 'deposit') {
        this.percentDeposit++;
        this.totalDeposit += item.amount;
      } else {
        this.percentExpenditure++;
        this.totalExpenditure += item.amount;
      }
    });

    this.doughnutChartData = [this.totalDeposit, this.totalExpenditure];
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }
}
