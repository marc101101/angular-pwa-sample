import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { RegisterUser } from '../models/RegisterUser';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

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

  /**
   * Get personal user data.
   */
  getUserMe(): Observable<any>{
    return this.http.get(this.url + "/user/me", this.httpOptions).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.alertService.push(err);
        return of(err);
      })
    )
  } 

  /**
   * Update personal user data.
   */
  updateUserMe(user:User): Observable<any>{
    return this.http.put(this.url + "/user/me", user, this.httpOptions).pipe(
      map((res: Response) => {
        return Object.assign(User, res);
      }),
      catchError((err: HttpErrorResponse) => {
        this.alertService.push(err);
        return of(err);
      })
    )
  }

  /**
   * Register new user.
   */
  registerUser(user:RegisterUser): Observable<any>{   
    return this.http.post(this.url + "/user", user).pipe(
      map((res: Response) => {        
        return Object.assign(User, res);
      }),
      catchError((err: HttpErrorResponse) => {
        this.alertService.push(err);
        return of(err);
      })
    )
  }

  /**
   * Get user's applied to courses.
   */
  getCoursesByUser(): Observable<any>{
    return this.http.get(this.url + "/user/me/courses", this.httpOptions).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.alertService.push(err);
        return of(err);
      })
    );
  }

}
