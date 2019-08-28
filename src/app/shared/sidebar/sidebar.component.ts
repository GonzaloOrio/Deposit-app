import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DepositExpenditureService } from '../../deposit-expenditure/deposit-expenditure.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription = new Subscription();

  constructor(public authService: AuthService, public depExpService: DepositExpenditureService, private store: Store<AppState>) {}

  ngOnInit() {
    this.userSubscription = this.store
      .select('auth')
      .pipe(filter(auth => auth != null))
      .subscribe(auth => {
        this.user = auth.user;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.depExpService.cancelItemSubscriptions();
  }
}
