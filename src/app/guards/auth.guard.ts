import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const user = this.authenticationService.userValue;
        if (user) {
            // check if route is restricted by role
            const { roles } = route.data;
            // console.log("from can active",user.roles,roles)
            // if(!roles.includes(user.roles))
            // {console.log("HELLO")}
            if (roles && !roles.some(r=>user.roles.includes(r))) {
                // role not authorized so redirect to home page
                // console.log("from can active",user,roles)
                this.router.navigate(['/']);
                return false;
            }

            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
  }
  
}
