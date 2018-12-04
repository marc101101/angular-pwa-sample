import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

    public mobile: boolean = false;
    public calcHeight: number;
    public frameHeight: number;
    public frameWidth: number;
    public promptEvent;
    
    constructor() {}

    /**
     * Calculates sizes for Desktop View of application
     * Cecks if current device is mobile phone or desktop device
     */
    ngOnInit(){
      this.calcHeight = window.innerHeight * 0.958;
      this.frameHeight = window.innerHeight * 0.662;
      this.frameWidth = window.innerHeight * 0.400;

      var ua = navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
        this.mobile = true;
      else
        this.mobile = false;
    }

}

