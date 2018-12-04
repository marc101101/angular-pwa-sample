import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './alert.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

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
   * Get all categories from backend.
   */
  getAllCategories(): Observable<any>{
    return this.http.get(this.url + "/categories", this.httpOptions).pipe(
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
   * 
   * @param categoryId Category id of single category
   * Get courses of category with requested id.
   */
  getCoursesByCategoryId(categoryId: String): Observable<any>{
    return this.http.get(this.url + "/categories/" + categoryId + "/courses", this.httpOptions).pipe(
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
