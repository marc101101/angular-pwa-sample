import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../sharedModule/shared.module';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/from';
import {Location} from "@angular/common";
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import { UserService } from '../../services/user.service';

/*
  * Test should test all four methods of courses.component.ts
  * onSubmit()
**/
describe('RegistrationComponent', () => {
  var fixture;
  var component;
  var location;
  var userService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [ FormsModule, HttpClientModule, RouterTestingModule, SharedModule ],
      providers: [ UserService, AlertService, Location ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    userService = fixture.debugElement.injector.get(UserService);
  }));

  it('RegistrationComponent: should successfuly be able to create a LoginComponent', () => {
    expect(fixture.componentInstance instanceof RegistrationComponent).toBe(true, "should create RegistrationComponent");
  });

  //test ngOnit methods and check its effects by mocking userService method getUserMe
  it("RegistrationComponent: onSubmit() with valid user routes to /#/home/kategorien", fakeAsync(() => {
    //set preconditions     
    spyOn(component, "validateUser").and.returnValue(true);
    spyOn(userService, "registerUser").and.returnValue(Observable.of("test"));
    //call testing method
    component.onSubmit();
    //check results
    fixture.detectChanges();
    expect(component.login).toBe(true);    
  }));

  //test ngOnit methods and check its effects by mocking userService method getUserMe
  it("RegistrationComponent: validateEmail() with valid mail", fakeAsync(() => {
    //check results
    expect(component.validateEmail("test@test.de")).toBe(true);    
  }));

  //test ngOnit methods and check its effects by mocking userService method getUserMe
  it("RegistrationComponent: validateEmail() with invalid mail", fakeAsync(() => {
    //check results
    expect(component.validateEmail("test&test.de")).toBe(false);    
  }));

  //test ngOnit methods and check its effects by mocking userService method getUserMe
  it("RegistrationComponent: generate() numbers between start and end", fakeAsync(() => {
    //check results
    expect(component.generate(0, 12).length).toBe(13);
    expect(component.generate(0, 99).length).toBe(100);
    expect(component.generate(-1, 98).length).toBe(100);
  }));

 
});

