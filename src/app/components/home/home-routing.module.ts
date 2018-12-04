import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { HomeComponent } from './home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProfilComponent } from './profil/profil.component';
import { CoursesComponent } from './courses/courses.component';
import { SingleCourseComponent } from './singlecourse/singlecourse.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';

/**
 * All definied routes home view.
 * Auth guard is protecting each route.
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'kategorien',
        component: CategoriesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'aktuelles',
        component: CategoriesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'kurs-uebersicht/:id',
        component: CoursesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'kurs/:id',
        component: SingleCourseComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'kontakt',
        component: ContactComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'kontakt/:id',
        component: ContactComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profil',
        component: ProfilComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class HomeRoutingModule { }