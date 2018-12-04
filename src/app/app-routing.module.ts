import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { PageNotFoundComponent } from './components/not-found';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

/**
 * All definied routes for top layer views.
 * Sub routing anchor for /home sub components with preloading flag.
 */
const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'home',
        loadChildren: './components/home/home.module#HomeModule',
        data: {
            prelaod: true
        }
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { 
        preloadingStrategy: SelectivePreloadingStrategy 
    })],
    exports: [ RouterModule ],
    providers: [ SelectivePreloadingStrategy, { 
        provide: LocationStrategy, 
        useClass: HashLocationStrategy
    }]
})

export class AppRoutingModule { }
