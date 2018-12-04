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
export class CoursesService {

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
   * 
   * @param search Search request.
   * Get courses by the provided search request.
   */
  getSearchCourses(search: String): Observable<any>{
    return this.http.get(this.url + "/courses?search=" + search, this.httpOptions).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {        
        this.alertService.push(err);
        return of(err);
      })
    );
  }
  
  /**
   * 
   * @param courseId ID of single course.
   * Get single course by course ID.
   */
  getCoursesByCourseId(courseId: String): Observable<any>{
    return this.http.get(this.url + "/courses/" + courseId, this.httpOptions).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.alertService.push(err);
        return of(err);
      })
    );
  }

  /**
   * Get highlighted flagged courses.
   */
  getCoursesByHighlight(): Observable<any>{
    return this.http.get(this.url + "/courses/highlights", this.httpOptions).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.alertService.push(err);
        return of(err);
      })
    );
  }

  /**
   * Get lastminute flagged courses.
   */
  getCoursesByLastMinute(): Observable<any>{
    return this.http.get(this.url + "/courses/lastminute", this.httpOptions).pipe(
      map((res: Response) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.alertService.push(err);
        return of(err);
      })
    );
  }

  /**
   * 
   * @param courseId ID of single course.
   * Apply to course with given courseId.
   */
  applyToCourse(courseId: String): Observable<any>{   
    return this.http.post(this.url + "/courses/" + courseId + "/apply", "" ,this.httpOptions).pipe(
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
   * @param courseId ID of single course.
   * Sign off course with given courseId.
   */
  signOffToCourse(courseId: String): Observable<any>{
    return this.http.post(this.url + "/courses/" + courseId + "/signoff", "", this.httpOptions).pipe(
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
   * @param feedback object that contains feedback.
   * @param courseId ID of single course.
   * Post feedback for given course to server. 
   */
  postFeedbackByCourse(feedback: any, courseId:string): Observable<any>{   
    return this.http.post(this.url + "/courses/" + courseId + "/feedback" ,feedback, this.httpOptions).pipe(
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
