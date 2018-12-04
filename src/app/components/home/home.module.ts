import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoriesComponent } from './categories/categories.component';
import { ProfilComponent } from './profil/profil.component';
import { HomeRoutingModule } from './home-routing.module';
import { AuthService } from '../../services/auth.service';
import { HomeComponent } from './home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { CommunicationService } from './shared/communication.service';
import { UserService } from '../../services/user.service';
import { SharedModule } from '../../sharedModule/shared.module';
import { AlertService } from '../../services/alert.service';
import { CategoryService } from '../../services/category.service';
import { CoursesComponent } from './courses/courses.component';
import { CoursesService } from './shared/courses.service';
import { SingleCourseComponent } from './singlecourse/singlecourse.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';

/**
 * Sub module, which is excluded because only this enables preloading strategy to work.
 * Contains all necessary components and services.
 */
@NgModule({
  declarations: [
    CategoriesComponent,
    ProfilComponent,
    CoursesComponent,
    SingleCourseComponent,
    ContactComponent,
    MenuComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [
      AuthService,
      UserService,
      AlertService,
      CommunicationService,
      CategoryService,
      CoursesService
  ],
  exports: [MenuComponent],
})
export class HomeModule { }