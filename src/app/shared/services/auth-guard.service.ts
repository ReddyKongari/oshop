import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route:any, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map((user: any) => {
      if (user) return true;

      this.router.navigate(['/login'], { queryParams: {         
        returnUrl: state.url
       } });
      return false;
    }))
  }
}
