import { async, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../sharedModule/shared.module';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/from';
import {Location} from "@angular/common";
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

declare var require;
var jwt = require('jsonwebtoken');

function generateToken() {
  return jwt.sign({ id: "test" }, "test", {
    expiresIn: 86400 
  });
}
/**
  * Test should test all four methods of courses.component.ts
  * onSubmit()
**/
describe('LoginComponent', () => {
  let userModel = {
    "token": generateToken()
  };

  var fixture;
  var component;
  var authSerive: AuthService;
  var location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, HttpClientModule, RouterTestingModule, SharedModule ],
      providers: [ AuthService, AlertService, Location ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authSerive = fixture.debugElement.injector.get(AuthService);
    location = TestBed.get(Location);
  }));

  it('LoginComponent: should successfuly be able to create a LoginComponent', () => {
    expect(fixture.componentInstance instanceof LoginComponent).toBe(true, "should create LoginComponent");
  });

  //test ngOnit methods and check its effects by mocking userService method getUserMe
  it("LoginComponent: onSubmit() with valid user routes to /#/home/kategorien", fakeAsync(() => {
    //set preconditions     
    spyOn(authSerive, "login").and.returnValue(Observable.of(userModel));
    spyOn(component.router, 'navigate').and.returnValue(true);
    //call testing method
    component.onSubmit();
    //check results
    fixture.detectChanges();
    tick(50); 
    expect(localStorage.getItem("token")).toBe(userModel.token);   
    expect(component.router.navigate).toHaveBeenCalledWith(['/home/kategorien']); 
  }));
 
});

