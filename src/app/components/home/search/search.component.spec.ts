import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './search.component';
import { SharedModule } from '../../../sharedModule/shared.module';
import { UserService } from '../../../services/user.service';
import { of } from 'rxjs';
import { CoursesService } from '../shared/courses.service';
import { CommunicationService } from '../shared/communication.service';

/**
  * Test should test all four methods of profil.component.ts
  * ngOnInit() / onSubmit()
**/
describe('SearchComponent', () => {
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

  var fixture;
  var component;
  var coursesService: CoursesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ FormsModule, HttpClientModule, RouterTestingModule, SharedModule],
      providers: [ UserService, AlertService, CommunicationService ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    coursesService = fixture.debugElement.injector.get(CoursesService);
  }));

  it('SearchComponent: should successfuly be able to create a SearchComponent', () => {
    expect(fixture.componentInstance instanceof SearchComponent).toBe(true, "should create SearchComponent");
  });

  //test onSubmit methods and check its effects by mocking userService method updateUserMe
  it("SearchComponent: onSubmit() change button styles and set button_text", () => {   
    //set preconditions 
    spyOn(coursesService, "getSearchCourses").and.returnValue(of(userCoursesModel));
    component.dataIsAvailable = true;
    //component.user = userModel;
    //call testing method
    component.onSubmit();
    //check results
    fixture.detectChanges();
    //let debugUlElement = fixture.debugElement.query(By.css('button'));
    //expect(debugUlElement.classes["is-primary-save"]).toBe(true);
    expect(component.courses).toBe(userCoursesModel);
    expect(component.dataIsAvailable).toBe(true);
  });

});
