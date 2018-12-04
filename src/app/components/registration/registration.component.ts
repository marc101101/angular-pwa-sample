import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../../models/RegisterUser';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent{

  public state: number = 0;
  public user: RegisterUser = new RegisterUser("", "", "", "", this.parseDate(new Date(Date.now())), 0, this.parseDate(new Date(Date.now())), this.parseTime(new Date(Date.now())), "", "", "", "", "", "", 0, "");
  public agb_state: boolean = false;
  public dse_state: boolean = false;
  public login: boolean = false;
  public birthday: any = {
    day: 0,
    month: 0,
    year: 0
  }

  constructor(public userService:UserService, public alertService:AlertService) { }

  /**
   * On submit the method checks if the entered user data is correct.
   * Sends request to backend to register new user.
   */
  onSubmit(): void{
    if(this.validateUser()){
      this.alertService.setErrorMessage("clear");
        this.userService.registerUser(this.user).subscribe(response => {
          if(response.name != "HttpResponseError"){
            this.login = true;             
          }
        });
    }    
  }

  /**
   * 
   * @param date Given date.
   * Parses given date into fitting date format.
   */
  parseDate(date:Date): string{
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + String(date.getDate());      
  }

  /**
   * 
   * @param date Given date.
   * Parses given date into fitting time format.
   */
  parseTime(date:Date): string{
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
  }

  /**
   * Parses given brithdate into fitting date format.
   */
  parseBirthDate(): void{
    let dayOfBirth = new Date(Date.parse(this.birthday.year + " " + this.birthday.month + " " + this.birthday.day));
    this.user.teil_geburtsdatum = this.parseDate(dayOfBirth);
  }

  /**
   * Validates that all required data is given.
   */
  validateUser(): boolean{
    this.parseBirthDate();

    if(!this.agb_state || !this.dse_state){
      this.alertService.setErrorMessage("Akzeptiere bitte die AGBs und DSE.");
      this.state = 4;
      return false;
    }

    if(!this.validateEmail(this.user.teil_email)){
      this.alertService.setErrorMessage("Bitte Mail ausfüllen.");
      this.state = 2;
      return false;
    }

    if(this.user.teil_geburtsdatum.includes("NaN")){
      this.alertService.setErrorMessage("Bitte Datum ausfüllen.");
      this.state = 2;
      return false;
    }
    
    if(this.user.teil_vorname == "" || this.user.teil_nachname == ""){
      this.alertService.setErrorMessage("Bitte Vor- und Nachname ausfüllen.");
      this.state = 0;
      return false;
    }
    
    return true;
  }

  /**
   * 
   * @param email Given email of user.
   * Validates if the given email fullfills the required mail format.
   */
  validateEmail(email):boolean {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  /**
   * 
   * @param start start number
   * @param end end number
   * Is needed for entering calender data over select.
   * View calls method to get months (1-12) and years (1930 - 2018)
   */
  generate(start: number, end: number){
    let returnValue = [];
    for (let index = start; index < end +1; index++) {
      returnValue.push(index);      
    }
    
    return returnValue;
  }

}
