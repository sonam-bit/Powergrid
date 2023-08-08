import { CanActivateFn } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { GuardService } from '../services/guard/guard.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class authguardGuard implements CanActivate {
  constructor(
      private authService: GuardService,
      private router: Router) { }
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean| UrlTree | Promise<boolean | UrlTree> {
      var isAuthenticated = this.authService.getAuthStatus();
      if (!isAuthenticated) {
          this.router.navigate(['/login']);
      }
      return isAuthenticated;
  }
};
