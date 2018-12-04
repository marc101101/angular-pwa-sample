import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../sharedModule/shared.module';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/from';
import { CommunicationService } from '../shared/communication.service';
import { CoursesService } from '../shared/courses.service';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../shared/contact.service';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';


/**
  * Test should test all four methods of contact.component.ts
  * ngOnit() / submit()
**/
describe('ContactComponent', () => {

  let coursesByCourseIdModel = {
    "ANM_DATUM": Date.now(),
    "KURS_NAME": "Testname",
    "KURS_BESCHREIBUNG": "Testbeschreibung"
   };
 
  var fixture;
  var component;
  var coursesService: CoursesService;
  var contactService: ContactService;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ HttpClientModule, RouterTestingModule, SharedModule, FormsModule ],
      providers: [          
        AlertService, 
        CommunicationService, 
        ContactService, 
        CoursesService, 
        {
          provide: ActivatedRoute, 
          useValue: { 
            params: Observable.of({ id: 'test-id' })
          }
        }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    coursesService = fixture.debugElement.injector.get(CoursesService);
    contactService = fixture.debugElement.injector.get(ContactService);
  }));

  it('ContactComponent: should successfuly be able to create a ContactComponent and check ngOninit', () => {
    //set preconditions 
    component.activatedRoute.params.value.id = "test-id";
    //spyOn(userService, "getCoursesByUser").and.returnValue(Observable.of(userCoursesModel));
    spyOn(coursesService, "getCoursesByCourseId").and.returnValue(Observable.of(coursesByCourseIdModel));
    //call testing method
    component.ngOnInit();
    //check results
    fixture.detectChanges();
    expect(component.single_course).toBe(coursesByCourseIdModel);
    expect(component.headerText).toBe("Bewertung: " + component.single_course.KURS_NAME);
    expect(component.course_feedback).toBe(true);
    expect(fixture.componentInstance instanceof ContactComponent).toBe(true, "should create ContactComponent");
  });

  it('ContactComponent: should successfuly submit feedback for course', () => {
    //set preconditions 
    component.course_feedback = true;
    component.single_course = {"KURS_ID": 1234};
    //spyOn(userService, "getCoursesByUser").and.returnValue(Observable.of(userCoursesModel));
    spyOn(coursesService, "postFeedbackByCourse").and.returnValue(Observable.of(coursesByCourseIdModel));
    //call testing method
    component.submit();
    //check results
    fixture.detectChanges();
    expect(component.button_text).toBe("Senden erfolgreich");       
  });

  it('ContactComponent: should successfuly submit feedback for app in general', () => {
    //set preconditions 
    component.course_feedback = false;
    //spyOn(userService, "getCoursesByUser").and.returnValue(Observable.of(userCoursesModel));
    spyOn(contactService, "postContactFeedback").and.returnValue(Observable.of(coursesByCourseIdModel));
    //call testing method
    component.submit();
    //check results
    fixture.detectChanges();
    expect(component.button_text).toBe("Senden erfolgreich");    
  });

});
