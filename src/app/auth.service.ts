import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService { 
  user$: Observable<auth.User|any> ;
  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.user||null;
  }
  async login() {
    try {
      const result = await this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider());
      console.log(result);
    } catch (error) {
      // window.alert(error.message);
    }
  }
  logout() {
    this.afAuth.signOut();
  }
}
