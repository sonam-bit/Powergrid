import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SessionService } from '../session/session.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 
  private base_url: string = environment.APIEndpoint;
  constructor(private http: HttpClient,private sessionService: SessionService) {  }
  reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  reqHeader1 = new HttpHeaders({
    'Accept': 'application/json',
  });

  getUserDetails(param: { user_id: any; }): Observable<any> {
    return this.http.post(this.base_url + 'getuser', param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
   uploadPdf(param: FormData): Observable<any> {
    return this.http.post(this.base_url + 'uploadPdf', param, {
      headers: this.sessionService.setTokenHeader(),
    });
    
  }
  setProfileData(data: string) {
    data = JSON.stringify(data);
    this.sessionService.set('profileData', data);
  }
  getIssues(param:any): Observable<any>{
    return this.http.post(this.base_url+ 'getHistory' , param, {
      headers: this.sessionService.setTokenHeader(),
    });
  }
  getImg(param:any): Observable<any> {
    return this.http.post(this.base_url + 'getImg', param, {
      headers: this.reqHeader,
    });
  }

  filterRows(param:any):Observable<any>{
    return this.http.post(this.base_url + 'filter', param, {
      headers: this.reqHeader1,
    })
  }
  
  getIssueStatus(param:any):Observable<any>{
    return this.http.post(this.base_url + 'getIssueStatus', param,{
      headers: this.reqHeader1,
    })
  }

}
