import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { environment } from '../../environments/environment';
import { UserData } from '../models/UserData';
import { AlertService } from './alert.service';
import { map, catchError } from 'rxjs/operators';
import { log } from 'util';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public authStatus: boolean = false;
  private url: string = environment.apiUrl;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(public http: HttpClient, public alertService: AlertService, public router: Router) { }

  /**
   * Checks current login status.
   * Checks if token is still available and not expired
   * Uses by Auth Guard to check routing policies.
   */
  isLoggedIn(): Observable<boolean>{   
    if(this.jwtHelper.isTokenExpired(localStorage.getItem('token'))){
      this.navToLogin();
      this.authStatus = false;
    }
    else{
      this.authStatus = true;
    }

    if(!this.authStatus){
      this.navToLogin();
    }
    return of(this.authStatus);
  }

  /**
   * Routes in case of unauthorized site request back to login view.
   */
  navToLogin():void{
    this.authStatus = false;
    this.router.navigate(['/login']).catch(error => {
      console.log(error);       
    });    
  }

  /**
   * 
   * @param user data entered on login scren (username / password)
   * Requests / Checks login data and receives in good case a JWT Token from backend.
   */
  login(user:UserData): Observable<any>{
    return this.http.post(this.url + "/auth", {email: user.mail, password: user.password}).pipe(
      map((res: Response) => {
        this.authStatus = true;
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.alertService.push(err);
        return of(err);
      })
    )
  }

  /**
   * Removes token from local storage.
   */
  logout(): void{
    localStorage.removeItem('token');
    this.authStatus = false;
  }

}
