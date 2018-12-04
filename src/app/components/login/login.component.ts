import {
  Component,
  OnInit
} from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { UserData } from '../../models/UserData';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { log } from 'util';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public model: UserData = new UserData("", "");  
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private authSerive: AuthService, private router:Router) {}

  /**
   * Checks if user is already logged in and forwards him to the category overview.
   */
  ngOnInit() {
    this.authSerive.isLoggedIn().subscribe(response => {
      if(response){
        this.router.navigate(['/home/kategorien']);
      }
    });
  }


  /**
   * On submition of the user data tries to forward the user to the category overview.
   */
  onSubmit() {
    this.authSerive.login(this.model).subscribe(response => {
      // login successful if there's a jwt token in the response   
      if (response.token && !this.jwtHelper.isTokenExpired(response.token)) {
        // store jwt token in local storage to keep user logged in between page refreshes
        
        localStorage.setItem('token', response.token);  

        this.router.navigate(['/home/kategorien']);
      }
    });
  }

}