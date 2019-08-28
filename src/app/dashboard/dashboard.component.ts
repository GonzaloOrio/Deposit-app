import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { DepositExpenditureService } from '../deposit-expenditure/deposit-expenditure.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  constructor(public depExpService: DepositExpenditureService, private store: Store<AppState>, private authService: AuthService) {}

  ngOnInit() {
    this.depExpService.initItemsListener();
  }
}
