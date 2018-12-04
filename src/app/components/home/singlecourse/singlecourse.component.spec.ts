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
import { FormsModule } from '@angular/forms';
import { SingleCourseComponent } from './singlecourse.component';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';


/**
  * Test should test all four methods of contact.component.ts
  * ngOnInit() / checkLogin() / checkAlreadyApplied() / apply()
**/
describe('SingleCourseComponent', () => {

  let coursesByCourseIdModel = {
    "ANM_DATUM": Date.now(),
    "KURS_NAME": "Testname",
    "KURS_ID": 1,
    "KURS_BESCHREIBUNG": "Testbeschreibung",
    "ORT_STRASSE": "Straße 1",
    "KURS_BEGINN_UHRZEIT": Date.now(),
    "KURS_REFERENT_ID": 1,
    "location": {
      "ORT_STRASSE": "",
      "ORT_PLZ": "",
      "ORT_ORTSNAME": ""
    },
    "KURS_TEIL_MAX": "",
    "KURS_TEIL_MIN": "",
    "KURS_ANZAHLTERMINE": "",
    "KURS_MITZUBRINGEN": "",
    "KURS_PREIS": "",
    "KURS_ANMFRIST": "",
    "KURS_ENDE_UHRZEIT": "",
    "teacher": {
      "TEIL_VORNAME": "",
      "TEIL_NACHNAME": ""
    }
   };

  let userCoursesModel = [
    {
      "KURS_ID": 1,
      "ANM_DATUM": Date.now()
    },
    {
      "KURS_ID": 2,
      "ANM_DATUM": Date.now()
    }
  ];
 
  var fixture;
  var component;
  var userService: UserService;
  var coursesService: CoursesService;
  var authService: AuthService;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCourseComponent ],
      imports: [ HttpClientModule, RouterTestingModule, SharedModule, FormsModule ],
      providers: [          
        AlertService, 
        CommunicationService, 
        CoursesService,
        AuthService,
        UserService, 
        {
          provide: ActivatedRoute, 
          useValue: { 
            params: Observable.of({ id: 'test-id' })
          }
        }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCourseComponent);
    component = fixture.componentInstance;
    coursesService = fixture.debugElement.injector.get(CoursesService);
    userService = fixture.debugElement.injector.get(UserService);
    authService = fixture.debugElement.injector.get(AuthService);
  }));

  it('SingleCourseComponent: should successfuly be able to create a SingleCourseComponent and check ngOnInit', () => {
    //set preconditions 
    component.activatedRoute.params.value.id = "test-id";
    spyOn(coursesService, "getCoursesByCourseId").and.returnValue(Observable.of(coursesByCourseIdModel));
    spyOn(userService, "getCoursesByUser").and.returnValue(Observable.of(userCoursesModel));
    spyOn(authService, "isLoggedIn").and.returnValue(Observable.of(coursesByCourseIdModel));
    //call testing method
    component.ngOnInit();
    //check results
    fixture.detectChanges();
    expect(component.singleCourse).toBe(coursesByCourseIdModel);
    expect(component.button_text).toBe("Abmelden");
    expect(component.showButton).toBe(true);
    expect(component.showButton).toBe(true);
    expect(component.dataIsAvailable).toBe(true);
    expect(fixture.componentInstance instanceof SingleCourseComponent).toBe(true, "should create SingleCourseComponent");
  });

  it('SingleCourseComponent: should successfuly apply', fakeAsync(() => {
    //set preconditions 
    component.singleCourse = {"KURS_ID": 1};   
    spyOn(coursesService, "getCoursesByCourseId").and.returnValue(Observable.of(coursesByCourseIdModel));
    spyOn(userService, "getCoursesByUser").and.returnValue(Observable.of(userCoursesModel));
    spyOn(authService, "isLoggedIn").and.returnValue(Observable.of(coursesByCourseIdModel));
    spyOn(coursesService, "applyToCourse").and.returnValue(Observable.of(coursesByCourseIdModel));
    //call testing method
    component.ngOnInit();
    fixture.detectChanges();
    component.apply();
    //check results
    fixture.detectChanges();
    expect(component.button_text).toBe("Anmelden erfolgreich");    
  }));

  it('SingleCourseComponent: should successfuly signOff', fakeAsync(() => {
    //set preconditions 
    component.singleCourse = {"KURS_ID": 1};
    spyOn(coursesService, "getCoursesByCourseId").and.returnValue(Observable.of(coursesByCourseIdModel));
    spyOn(userService, "getCoursesByUser").and.returnValue(Observable.of(userCoursesModel));
    spyOn(authService, "isLoggedIn").and.returnValue(Observable.of(coursesByCourseIdModel));
    spyOn(coursesService, "signOffToCourse").and.returnValue(Observable.of(coursesByCourseIdModel));
    //call testing method
    component.ngOnInit();
    fixture.detectChanges();
    component.signOff();
    //check results
    fixture.detectChanges();
    expect(component.button_text).toBe("Abmelden erfolgreich");    
  }));

});
