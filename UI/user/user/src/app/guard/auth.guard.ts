import { CanActivateFn } from '@angular/router';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { AuthServiceService } from '../Services/auth/auth-service.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
      private authService: AuthServiceService,
      private router: Router) { }
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean | Promise<boolean> {
      var isAuthenticated = this.authService.getAuthStatus();
      if (!isAuthenticated) {
          console.log("lost somweher");
          this.router.navigate(['/login']);
      }
      return isAuthenticated;
  }
};
