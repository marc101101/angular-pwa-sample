import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfilComponent } from './profil.component';
import { SharedModule } from '../../../sharedModule/shared.module';
import { UserService } from '../../../services/user.service';
import { of } from 'rxjs';
import { By } from "@angular/platform-browser";

/**
  * Test should test all four methods of profil.component.ts
  * ngOnInit() / onSubmit() / resetButton() 
**/
describe('ProfilComponent', () => {
  let userModel = {
    "TEIL_EMAIL":"test@test.de",
    "TEIL_ORT": "Regensburg",
    "TEIL_BLZ": "1010101",
    "TEIL_IBAN": "1010101"
  };

  var fixture;
  var component;
  var userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilComponent ],
      imports: [ FormsModule, HttpClientModule, RouterTestingModule, SharedModule ],
      providers: [ UserService, AlertService ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
  }));

  it('ProfilComponent: should successfuly be able to create a ProfilComponent', () => {
    expect(fixture.componentInstance instanceof ProfilComponent).toBe(true, "should create ProfilComponent");
  });

  //test ngOnit methods and check its effects by mocking userService method getUserMe
  it("ProfilComponent: ngOnit() sets user and dataIsAvailable values correctly", fakeAsync(() => {
    //set preconditions 
    spyOn(userService, "getUserMe").and.returnValue(of(userModel));
    //call testing method
    component.ngOnInit();
    //check results
    fixture.detectChanges();
    expect(component.user).toBe(userModel);
    expect(component.dataIsAvailable).toBe(true);
  }));

  //test onSubmit methods and check its effects by mocking userService method updateUserMe
  it("ProfilComponent: onSubmit() change button styles and set button_text", () => {   
    //set preconditions 
    spyOn(userService, "updateUserMe").and.returnValue(of(userModel));
    component.dataIsAvailable = true;
    component.user = userModel;
    //call testing method
    component.onSubmit();
    //check results
    fixture.detectChanges();
    let debugUlElement = fixture.debugElement.query(By.css('button'));
    expect(debugUlElement.classes["is-primary-save"]).toBe(true);
    expect(component.button_text).toBe("Speichern erfolgreich");
  });

  //test onSubmit methods and check its effects by mocking userService method updateUserMe
  it("ProfilComponent: resetButton() change button styles and set button_text", () => {   
    //set preconditions 
    component.button_text = "Speichern erfolgreich";
    component.dataIsAvailable = true;
    component.user = userModel;
    //call testing method
    component.resetButton();
    //check results
    fixture.detectChanges();
    let debugUlElement = fixture.debugElement.query(By.css('button'));
    expect(debugUlElement.classes["is-primary-save"]).toBe(false);
    expect(component.button_text).toBe("Speichern");
  });

});
