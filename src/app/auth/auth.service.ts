import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubscription: Subscription = new Subscription();
  private user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore, private store: Store<AppState>) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log('fbUser', fbUser);
      if (fbUser) {
        this.userSubscription = this.afDB
          .doc(`${fbUser.uid}/user`)
          .valueChanges()
          .subscribe((userData: any) => {
            const newUser = new User(userData);
            this.store.dispatch(new SetUserAction(newUser));
            this.user = newUser;
          });
      } else {
        this.user = null;
        this.userSubscription.unsubscribe();
        // this.store.dispatch(new SetUserAction(null));
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const user: User = {
          name: name,
          email: res.user.email,
          uid: res.user.uid
        };

        this.afDB
          .doc(`${user.uid}/user`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new DeactivateLoadingAction());
          });
      })
      .catch(error => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire({
          title: 'Error al crear usuario',
          text: error.message,
          type: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  login(email: string, password: any) {
    this.store.dispatch(new ActivateLoadingAction());
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.store.dispatch(new DeactivateLoadingAction());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire({
          title: 'Error en el login',
          text: error.message,
          type: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  isUserAuth() {
    return this.afAuth.authState.pipe(
      map((fbUser: firebase.User) => {
        if (fbUser == null) {
          // const resetUser = new User(null);
          this.store.dispatch(new SetUserAction(null));
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

  getUser() {
    return { ...this.user };
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      // const resetUser = new User(null);
      this.store.dispatch(new UnsetUserAction());
    });
    this.router.navigate(['/login']);
  }
}
