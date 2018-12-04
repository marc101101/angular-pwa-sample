import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { PageNotFoundComponent } from './components/not-found';
import { FormsModule }   from '@angular/forms';
import { AlertService } from './services/alert.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from './sharedModule/shared.module';
import { CategoryService } from './services/category.service';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        PageNotFoundComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,     
        RouterModule,
        SharedModule,
        ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        AuthGuard,
        AuthService,
        AlertService,
        CategoryService,
        RouterModule,
        HttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
