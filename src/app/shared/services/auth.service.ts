import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable,of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/auth';
@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.signOut();
  }
  get appUser$(): Observable<AppUser> {
    return this.afAuth.user.pipe(switchMap(user => {
      if (user)
        return this.userService.get(user.uid).valueChanges()
      return of(null);
    }));
  };
}
