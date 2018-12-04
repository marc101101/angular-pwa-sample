import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  private url: string = environment.apiUrl;

  /**
   * Authorization header with in auth.serivce requested JWT token.
   */
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': localStorage.getItem('token')
    })
  };

  constructor(public http: HttpClient, public alertService: AlertService) { }
    
  postContactFeedback(feedback: any): Observable<any>{   
    return this.http.post(this.url + "/contact/", feedback ,this.httpOptions).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.alertService.push(err);
        return of(err);
      })
    )
  }  
  
}
