import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { log } from 'util';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CommunicationService } from '../communication.service';

@Component({
  moduleId: module.id,
  selector: 'menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  constructor(public router:Router, public authService: AuthService, public comService: CommunicationService) {}

  /**
   * 
   * @param path path to navigate to
   * Routes to given path.
   * If no path is given only close menu by publishing a message to the communication service.
   */
  routing(path?): void{
    this.comService.sendMessage(false);
    if(path){
      this.router.navigate([path]);    
    }
  
  }

  /**
   * Close menu by publishing a message to the communication service.
   */
  closeMenu():void{
    this.comService.sendMessage(false);
  }

  /**
   * Logout by calling auth.service method.
   * Route automatically back to login page.
   */
  signOut():void{
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
