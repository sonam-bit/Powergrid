import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  private base_url: string = environment.APIEndpoint;
  constructor(private http: HttpClient) { }
  reqHeader = new HttpHeaders({
    'Content-type': 'application/json',
  });

  loginAdmin(param:any): Observable<any> {
    return this.http.post<any>(this.base_url + 'adminLogin', param, {
      headers: this.reqHeader,
    });
  }

 
}
