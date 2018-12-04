import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommunicationService } from '../shared/communication.service';
import { CoursesService } from '../shared/courses.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'categories',
  templateUrl: './singlecourse.component.html',
  styleUrls: ['./singlecourse.component.scss']
})
export class SingleCourseComponent implements OnInit {
  public dataIsAvailable: boolean = false;
  public singleCourse: any;
  public button_text: string = "Anmelden";
  public showButton: boolean = false;
  public alreadyApplied: boolean = false;
  public moreInfo: boolean = false;

  @ViewChild('button') elButton: ElementRef;
  @ViewChild('backgroundElement') backgroundElement: ElementRef;

  constructor(
    private router: Router, 
    private renderer: Renderer2,
    public comService: CommunicationService,
    public userService: UserService,
    public activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public courseService: CoursesService) { }

  /**
   * Reads the given route parameters to request course data.
   * Checks category background color.
   */
  ngOnInit() {
    this.comService.sendCourseViewMessage(true);
    this.activatedRoute.params.subscribe((params: Params) => {     
      this.courseService.getCoursesByCourseId(params.id).subscribe(response =>{    
        if(response.name != "HttpResponseError"){
          this.singleCourse = response;         
          this.dataIsAvailable = true;  
          this.checkLogin();
        }
      });
    });
    this.comService.getInfo().subscribe(response => { 
      if(response.color != undefined){
        this.renderer.addClass(this.backgroundElement.nativeElement, response.color);
      }
    });   
  }

  /**
   * Checks if user is logged in.
   */
  checkLogin(){
    this.authService.isLoggedIn().subscribe(response =>{
      if(response){
        this.showButton = true;
        this.checkAlreadyApplied();
      }
    });
  }

  /**
   * Checks if user is already applied for course.
   * Changes the apperance of apply button.
   */
  checkAlreadyApplied(){
    this.userService.getCoursesByUser().subscribe(response =>{      
      response.forEach(element => {
        if(element.KURS_ID == this.singleCourse.KURS_ID){
            this.alreadyApplied = true;
            this.button_text = "Abmelden";
          }
      });      
    });
  }

  /**
   * Applies the user to given course.
   */
  apply(){
    this.courseService.applyToCourse(this.singleCourse.KURS_ID).subscribe(response =>{
      if(response.name != "HttpResponseError"){
        this.renderer.addClass(this.elButton.nativeElement, 'is-primary-save');
        this.button_text = 'Anmelden erfolgreich';
      }
    });
  }

  /**
   * Signs off the user to given course.
   */
  signOff(){
    this.courseService.signOffToCourse(this.singleCourse.KURS_ID).subscribe(response =>{
      if(response.name != "HttpResponseError"){
        this.renderer.addClass(this.elButton.nativeElement, 'is-primary-save');
        this.button_text = 'Abmelden erfolgreich';
      }
    });
  }
}
