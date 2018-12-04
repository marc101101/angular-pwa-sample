import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ContactService } from '../shared/contact.service';
import { CoursesService } from '../shared/courses.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  public dataIsAvailable: boolean = false;
  public button_text: string = "Feedback senden";
  public headerText: string = "Kontakt";
  public course_feedback: boolean = false;
  public single_course;
  public contactMessage: any = {
    text: "",
    bewertung: null,
  };

  @ViewChild('send') sendButton: ElementRef;

  constructor(
    private renderer: Renderer2,
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private coursesService:CoursesService) {}

  /**
   * Reads route parameter, when given and gets course data.
   */
  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params) => {    
      if(params.id){
        this.coursesService.getCoursesByCourseId(params.id).subscribe(response =>{
          this.single_course = response;
          this.course_feedback = true;
          this.headerText = "Bewertung: " + this.single_course.KURS_NAME;          
        });
      }      
    });
  }
  
  /**
   * Depending on feedback on course or general, feedback is sent to backend.
   */
  submit():void{
    if(this.course_feedback){
      this.coursesService.postFeedbackByCourse(this.contactMessage, this.single_course.KURS_ID).subscribe(response => {
        if(response.name != "HttpResponseError"){
          this.renderer.addClass(this.sendButton.nativeElement, 'is-primary-save');
          this.button_text = 'Senden erfolgreich';
        } 
      });
    }
    else{
      this.contactService.postContactFeedback(this.contactMessage).subscribe(response => {
        if(response.name != "HttpResponseError"){
          this.renderer.addClass(this.sendButton.nativeElement, 'is-primary-save');
          this.button_text = 'Senden erfolgreich';
        }  
      });
    }
  }
}
