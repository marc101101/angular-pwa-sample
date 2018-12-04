import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { AlertService } from '../../services/alert.service';

@Component({
  moduleId: module.id,
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {
  message: any;
  private subscription: Subscription;
  public navStatus = true;

  constructor(private alertService: AlertService) {}

  /**
   * Subscription on alert service.
   * Display alert message.
   */
  ngOnInit() {
    if (this.alertService.getStatusText()) {
      this.message = {text: this.alertService.getStatusText()};
    }
    this.subscription = this.alertService.getMessage().subscribe(message => {     
      try {
        if(message.text == "clear"){
          this.message = null;       
        }      
        else{
          this.message = message; 
        }       
      } catch (error) {}
    });   
  }
}
