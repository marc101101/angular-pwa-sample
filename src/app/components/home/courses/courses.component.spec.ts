import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../sharedModule/shared.module';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/from';
import { CoursesComponent } from './courses.component';
import { CommunicationService } from '../shared/communication.service';
import { UserService } from '../../../services/user.service';
import { CoursesService } from '../shared/courses.service';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute } from '@angular/router';


/**
  * Test should test all four methods of courses.component.ts
  * requestCoursesByUser() / requestCoursesByCategory()
**/
describe('CoursesComponent', () => {
  let userCoursesModel = [
    {
      "ANM_KURS_ID": 1,
      "ANM_DATUM": Date.now()
    },
    {
      "ANM_KURS_ID": 2,
      "ANM_DATUM": Date.now()
    }
  ];

  let categories = [
    {
      "RUB_ID": "test-kursId"
    }
  ]

  let coursesByCourseIdModel = {
    "ANM_DATUM": Date.now(),
    "KURS_NAME": "Testname",
    "KURS_BESCHREIBUNG": "Testbeschreibung"
  };

  var fixture;
  var component;
  var userService: UserService;
  var coursesService: CoursesService;
  var categoryService: CategoryService;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent ],
      imports: [ HttpClientModule, RouterTestingModule, SharedModule ],
      providers: [ 
        CategoryService, 
        AlertService, 
        CommunicationService, 
        UserService, 
        CoursesService, 
        {
          provide: ActivatedRoute, 
          useValue: { 
            params: Observable.of({ id: 'me' })
          }
        }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    coursesService = fixture.debugElement.injector.get(CoursesService);
    categoryService = fixture.debugElement.injector.get(CategoryService);
  }));

  it('CoursesComponent: should successfuly be able to create a CoursesComponent', () => {
    expect(fixture.componentInstance instanceof CoursesComponent).toBe(true, "should create CoursesComponent");
  });

   //test ngOnit methods and check its effects by mocking userService method getUserMe
   it("CoursesComponent /me: ngOnit() sets courses and dataIsAvailable values correctly", fakeAsync(() => {
    //set preconditions 
    component.activatedRoute.params.value.id = "me";
    spyOn(userService, "getCoursesByUser").and.returnValue(Observable.of(userCoursesModel));
    spyOn(coursesService, "getCoursesByCourseId").and.returnValue(Observable.of(coursesByCourseIdModel));
    //call testing method
    component.ngOnInit();
    //check results
    fixture.detectChanges();
    expect(component.courses[0].KURS_BESCHREIBUNG).toBe("Testbeschreibung");
    expect(component.courses[0].KURS_NAME).toBe("Testname");
    expect(component.dataIsAvailable).toBe(true);
  }));

  //test ngOnit methods and check its effects by mocking userService method getUserMe
  it("CoursesComponent /:kursId: ngOnit() sets courses and dataIsAvailable values correctly", fakeAsync(() => {
    //here a different test bed is needed because the ActivatedRoute is /1111
    component.category = "Test Category";
    component.activatedRoute.params.value.id = "test-kursId";
    //set preconditions 
    spyOn(categoryService, "getAllCategories").and.returnValue(Observable.of(categories));
    spyOn(categoryService, "getCoursesByCategoryId").and.returnValue(Observable.of([coursesByCourseIdModel]));
    //call testing method
    component.ngOnInit();
    //check results
    fixture.detectChanges();
    expect(component.courses[0].KURS_BESCHREIBUNG).toBe("Testbeschreibung");
    expect(component.courses[0].KURS_NAME).toBe("Testname");
    expect(component.dataIsAvailable).toBe(true);
  }));

   //test ngOnit methods and check its effects by mocking userService method getUserMe
   it("CoursesComponent /highlights: ngOnit() sets courses and dataIsAvailable values correctly", fakeAsync(() => {
    //here a different test bed is needed because the ActivatedRoute is /1111
    component.category = "Test Category";
    component.activatedRoute.params.value.id = "highlights";
    //set preconditions 
    spyOn(coursesService, "getCoursesByHighlight").and.returnValue(Observable.of([coursesByCourseIdModel]));
    //call testing method
    component.ngOnInit();
    //check results
    fixture.detectChanges();
    expect(component.courses[0].KURS_BESCHREIBUNG).toBe("Testbeschreibung");
    expect(component.courses[0].KURS_NAME).toBe("Testname");
    expect(component.dataIsAvailable).toBe(true);
  }));


});
