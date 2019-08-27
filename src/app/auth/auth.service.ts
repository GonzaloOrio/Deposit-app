import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log('fbUser', fbUser);
    });
  }

  createUser(name: string, email: string, password: any) {
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
          });
      })
      .catch(error => {
        Swal.fire({
          title: 'Error al crear usuario',
          text: error.message,
          type: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  login(email: string, password: any) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['/']);
      })
      .catch(error => {
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
        console.log('isUserAuth fbUser es: ', fbUser);

        if (fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
