import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private base_url: string = environment.APIEndpoint;
  constructor(private http: HttpClient, private sessionService: SessionService) { }
  reqHeader = new HttpHeaders({
    'Accept': 'application/json',
  });
  getallIssues(): Observable<any> {
    return this.http.post<any>(this.base_url + 'getallIssues', {
       headers: this.sessionService.setTokenHeader(),
    } );
  }

  filterallRows(param:any): Observable<any>{
    return this.http.post<any>(this.base_url + 'filterallRows', param, {
       headers: this.reqHeader,
     } );
  }
  changeStatus(param:any): Observable<any>{
    return this.http.post<any>(this.base_url + 'changeStatus', param, {
      headers: this.reqHeader,
    });
  }
  setremark(param:any): Observable<any>{
    return this.http.post<any>(this.base_url + 'setremark', param,{
      headers: this.reqHeader,
    });
  }
  getImg(param:any): Observable<any> {
    return this.http.post(this.base_url + 'getImg', param, {
      headers: this.reqHeader,
    });
  }
}
