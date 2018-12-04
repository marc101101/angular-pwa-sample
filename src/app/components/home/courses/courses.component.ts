import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CommunicationService } from '../shared/communication.service';
import { log } from 'util';
import { UserService } from '../../../services/user.service';
import { CoursesService } from '../shared/courses.service';

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  @ViewChild('backgroundElement') backgroundElement: ElementRef;

  public dataIsAvailable: boolean = false;
  public courses: Array<any> = [];
  public headerText: string = "";
  public category: string = "";
  public current_color: string;

  constructor(
  public coursesService: CoursesService,
  public categoryService: CategoryService,
  public userService: UserService,
  private activatedRoute: ActivatedRoute,
  public comService: CommunicationService,
  public renderer: Renderer2) {}

  /**
   * Checks which kin of course view is required.
   * Sends request depending on what is required.
   */
  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params) => {   
      this.renderer.removeClass(this.backgroundElement.nativeElement, this.current_color);
      if(params.id == "me"){
        this.requestCoursesByUser();
      }
      else{
        if(params.id == "highlights"){
          this.requestCoursesByHighlights();
        }
        else{
          if(params.id == "lastminute"){
            this.requestCoursesBylastMinute();
          }
          else{
            this.requestCoursesByCategory(params.id);
            this.comService.getInfo().subscribe(response => { 
              if(response.color != undefined){
                this.current_color = response.color;
                this.renderer.addClass(this.backgroundElement.nativeElement, response.color);
              }
            }); 
          }
        }
      }    
    });
  }

  /**
   * Request courses of user.
   */
  requestCoursesByUser():void{
    this.headerText = "Meine";
    this.courses = [];
    this.userService.getCoursesByUser().subscribe(responseUser =>{            
      responseUser.forEach(element => {
        this.coursesService.getCoursesByCourseId(element.KURS_ID).subscribe(responseCourse => {
          responseCourse.ANM_DATUM = element.ANM_DATUM;          
          this.courses.push(responseCourse);
        });
      });
      if(responseUser.name != "HttpResponseError"){
        this.dataIsAvailable = true;  
      }
    });
  }

  /**
   * Request courses of category.
   */
  requestCoursesByCategory(courseId: string):void{
    this.headerText = "";
    this.categoryService.getAllCategories().subscribe(response => {
      response.forEach(element => {
        if(element.RUB_ID == courseId){
          this.headerText = element.RUB_NAME;
        }
      });
    });
    this.courses = [];
    this.categoryService.getCoursesByCategoryId(courseId).subscribe(response =>{ 
      this.courses.push(response);  
      if(response.name != "HttpResponseError"){
        this.dataIsAvailable = true;  
        this.courses = response;
      }
    });
  }

  /**
   * Request highlighted courses.
   */
  requestCoursesByHighlights():void{
    this.headerText = "Highlights";
    this.courses = [];
    this.coursesService.getCoursesByHighlight().subscribe(response =>{          
      this.courses.push(response);  
      if(response.name != "HttpResponseError"){
        this.dataIsAvailable = true;  
        this.courses = response;
      }
    });
  }

  /**
   * Request lastminute courses.
   */
  requestCoursesBylastMinute():void{
    this.headerText = "Last Minute";
    this.courses = [];
    this.coursesService.getCoursesByLastMinute().subscribe(response =>{          
      this.courses.push(response);  
      if(response.name != "HttpResponseError"){
        this.dataIsAvailable = true;  
        this.courses = response;
      }
    });
  }

}
