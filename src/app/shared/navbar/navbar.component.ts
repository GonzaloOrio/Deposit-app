import { Component, OnInit } from '@angular/core';
import { User } from '../../auth/user.model';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  userSubscription: Subscription = new Subscription();
  user: User;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.userSubscription = this.store
      .select('auth')
      .pipe(filter(auth => auth != null))
      .subscribe(auth => {
        console.log('auth es::', auth);

        this.user = auth.user;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
