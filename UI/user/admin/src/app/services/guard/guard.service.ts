import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor() { }
  private token = sessionStorage.getItem('token');
  public getAuthStatus(): boolean {
    if (this.token) {
      if (this.tokenExpired(this.token)) {
        sessionStorage.removeItem('token');
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  public tokenExpired(token: string) {
    if (token == null) return true;
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}

