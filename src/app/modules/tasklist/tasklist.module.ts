import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TasklistPageRoutingModule } from './tasklist-routing.module';

import { TasklistPage } from './tasklist.page';
import { TaskFormComponent } from './taskform/taskform.component';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { CustomTimePipe } from '../../pipes/custom-time.pipe';
import { CustomFilterPipe } from '../../pipes/custom-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    IonicModule,
    TasklistPageRoutingModule
  ],
  declarations: [
    TasklistPage, 
    TaskFormComponent, 
    CustomDatePipe, 
    CustomTimePipe, 
    CustomFilterPipe
  ],
  exports: [
    CustomDatePipe,
    CustomTimePipe,
    CustomFilterPipe
  ]
})
export class TasklistPageModule {}
