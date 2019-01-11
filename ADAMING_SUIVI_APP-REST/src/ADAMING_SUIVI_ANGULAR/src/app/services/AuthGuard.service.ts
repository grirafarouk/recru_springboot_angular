import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { USER_NAME, TOKEN_NAME } from '../helper/auth.constant';
import { NAVIGATION_RULES } from '../helper/application.constant';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private authenticationService:AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem(USER_NAME) && !this.authenticationService.isTokenExpired(localStorage.getItem(TOKEN_NAME))) {
            return true;
        }
        this.router.navigate([NAVIGATION_RULES.login.url], { queryParams: { returnUrl: state.url }});
        return false;
    }   
}