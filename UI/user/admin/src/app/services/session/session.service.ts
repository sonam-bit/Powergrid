import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  set(key: string, value: string) {
    return sessionStorage.setItem(key, value);
  }
  get(key: string) {
    return sessionStorage.getItem(key);
  }
  remove(key: string) {
    return sessionStorage.removeItem(key);
  }
  clear() {
    return sessionStorage.clear();
  }
  setTokenHeader() {
    var token = this.get('token');
    if (token) {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + token);
      return headers;
    }
    else {
      return null!;
    }
  }
  setTokenHeaderImage() {
    var token = this.get('token');
    if (token) {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + token);
      headers = headers.set('Accept', 'application/json');
      return headers;
    }
    else {
      return null!;
    }
  }
}
