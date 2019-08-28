import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { DepositExpenditure } from './deposit-expenditure.model';
import { AuthService } from '../auth/auth.service';
import { SetItemsAction, UnsetItemsAction } from './deposit-expenditure.actions';

@Injectable({
  providedIn: 'root'
})
export class DepositExpenditureService {
  itemsListenerSubscription: Subscription = new Subscription();
  getItemsSubscription: Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initItemsListener() {
    this.itemsListenerSubscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.getItems(auth.user.uid);
        // console.log('user', auth.user);
      });
  }

  private getItems(uid: string) {
    this.getItemsSubscription = this.afDB
      .collection(`${uid}/deposit-expenditure/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(elem => {
            return {
              uid: elem.payload.doc.id,
              ...elem.payload.doc.data()
            };
          });
        })
      )
      .subscribe((items: any[]) => {
        this.store.dispatch(new SetItemsAction(items));
      });
  }

  cancelItemSubscriptions() {
    this.itemsListenerSubscription.unsubscribe();
    this.getItemsSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  addDepositExpenditure(depExpData: DepositExpenditure) {
    const user = this.authService.getUser();
    return this.afDB
      .doc(`${user.uid}/deposit-expenditure`)
      .collection('items')
      .add({ ...depExpData });
  }

  deleteItem(uid: string) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/deposit-expenditure/items/${uid}`).delete();
  }
}
