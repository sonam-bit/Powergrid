import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private base_url: string = environment.APIEndpoint;
  constructor(private http: HttpClient
  ) { }
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  loginUser(param:any): Observable<any> {
    return this.http.post<any>(this.base_url + 'login', param, {
      headers: this.reqHeader,
    });
  }
}
