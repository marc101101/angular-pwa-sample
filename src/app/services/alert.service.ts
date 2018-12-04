import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/observable/of';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = true;
  private status_message = '';

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = true;
        } else {
          // clear alert
          this.status_message = '';
          this.subject.next();
        }
      }
    });
  }

  success(message: object, keepAfterNavigationChange = true) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: this.mapMessage(message) });
  }

  error(message: object, keepAfterNavigationChange = true) {    
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: this.mapMessage(message) });
  }

  setErrorMessage(message: string, keepAfterNavigationChange = true) {   
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  clearMessage() {
    this.subject.next();
  }

  getStatusText(): string {
    if (this.status_message) {
      return this.status_message;
    }
  }

  mapMessageLogin(response): string {
    if (response.status === 401 && response._body === '{"error":"invalid_client"}') {
      return 'Wrong username or password!';
    } else if (response.status === 403) {
      return 'User not allowed!';
    } else {
      return this.mapMessage(response);
    }
  }

  /**
   * 
   * @param response Forwared error message from rest service.
   * Maps reponse code to german error message.
   */
  mapMessage(response): string {
    if (response.status === 400 && response.json().hasOwnProperty('message')) {
      const body = response.json();
      if (body.hasOwnProperty('error') && body.error === 'PATTERN') {
        return 'HTTP Status ' + response.status + '.';
      } else {
        return response.json().message;
      }
    } else if (response.status === 401) {
      return 'Email oder Password falsch.';
    } else if (response.status === 403) {
      return 'Benutzer nicht berechtig!';
    } else if (response.status === 405) {
      return 'Aufruf nicht erlaubt!';
    } else if (response.status === 409) {
      return 'Sie sind bereits angemeldet!';
    } else if (response.status === 503) {
      this.keepAfterNavigationChange = true;
      this.status_message = response.status + '\n' + 'Service nicht erreichbar.';
      this.router.navigate(['/error']);
      return;
    } else if (response.status === 500) {
      this.keepAfterNavigationChange = true;
      this.status_message = response.status + '\n' + 'Internal Server Error.';
      this.router.navigate(['/error']);
      return;
    } else {
      if(response.name = "HttpResponseError"){
        return 'Verbindung unterbrochen.'
      }
      if (response === undefined || response === 0 || response.statusText === '') {
        return 'Verbindungsfehler!';
      }
      return 'HTTP Status ' + response.status + '.';
    }
  }

  /**
   * 
   * @param err Forwared error message from rest service.
   * @param login_page Checks if message is published by login service.
   * Publishes message to subject on which alert directive is subscribed on.
   */
  push(err, login_page = false) {
    if (err instanceof Error) {
      // display error message for dev
      this.subject.next({ type: 'error', text: this.mapMessage(err) });
    } else {
      if (login_page) {
        
        this.subject.next({ type: 'error', text: this.mapMessageLogin(err) });
      } else {
        this.subject.next({ type: 'error', text: this.mapMessage(err) });
      }
    }
    return of(null);
  }
}
