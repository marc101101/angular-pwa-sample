import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from '../services/alert.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    AlertComponent
  ],
  providers: [
      AlertService
  ],
  exports: [AlertComponent],
})
export class SharedModule { }