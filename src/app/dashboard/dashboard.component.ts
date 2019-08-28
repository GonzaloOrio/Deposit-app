import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { DepositExpenditureService } from '../deposit-expenditure/deposit-expenditure.service';
import { DepositExpenditure } from '../deposit-expenditure/deposit-expenditure.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription = new Subscription();
  public user: User;

  constructor(public depExpService: DepositExpenditureService, private store: Store<AppState>, private authService: AuthService) {}

  ngOnInit() {
    this.depExpService.initItemsListener();
    // this.user = this.authService.getUser();
    // this.userSubscription = this.store
    //   .select('items')
    //   // .pipe(
    //   //   filter((data: any) => {
    //   //     return data.items.length >= 1;
    //   //   })
    //   // )
    //   .subscribe(data => {
    //     this.items = [...data.items];
    //     data.items.map(item => {
    //       if (item.type === 'deposit') {
    //         this.sumDeposit += item.amount;
    //       } else {
    //         this.sumExpenditure += item.amount;
    //       }
    //     });
    //   });
  }

  ngOnDestroy() {
    // this.itemsSubscription.unsubscribe();
  }
}
