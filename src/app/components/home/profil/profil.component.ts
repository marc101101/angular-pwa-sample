import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  @ViewChild('save') saveButton: ElementRef;

  public user: any;
  public dataIsAvailable: boolean = false;
  public button_text: string = 'Speichern';

  constructor(
    private userService:UserService, 
    private _location: Location,
    private renderer: Renderer2) { }

  /**
   * Requests user's data to edit them.
   */
  ngOnInit():void {
    this.userService.getUserMe().subscribe(response => {    
      this.user = response;
      this.dataIsAvailable = true; 
    });
  }

  /**
   * On submit sends updated data to server.
   */
  onSubmit():void {
    this.userService.updateUserMe(this.user).subscribe(response => {
      if(response.name != "HttpResponseError"){
        this.renderer.addClass(this.saveButton.nativeElement, 'is-primary-save');
        this.button_text = 'Speichern erfolgreich';
      }  
    });
  }

  /**
   * Reset button after successful submit.
   */
  resetButton():void {
    this.renderer.removeClass(this.saveButton.nativeElement, 'is-primary-save');
    this.button_text = 'Speichern';
  }

  /**
   * Route back to last page.
   */
  backClicked():void {
    this._location.back();
  }

}
