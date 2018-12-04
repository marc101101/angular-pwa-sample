import {
  Component,
  OnInit
} from '@angular/core';
import { Location } from '@angular/common';

import { CommunicationService } from './shared/communication.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public menuOpen: boolean = false;
  public courseView: boolean = false;

  constructor(public comService: CommunicationService, private _location: Location) {}

  /**
   * Subscribtion to communication service if menu should be open or closed.
   * Subscribtion to communication service if back arrow or burger menu in single course should be available.
   */
  ngOnInit() {
    this.comService.instruction_sub_comb.subscribe(message =>{    
      this.menuOpen = message;
    });

    this.comService.course_sub_comb.subscribe(message =>{    
      this.courseView = message;
    });
  }

  /**
   * Close and open menu.
   */
  setMenu() {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Send user back to page before.
   */
  backClicked():void {
    this._location.back();
    this.comService.sendCourseViewMessage(false);
  }

}