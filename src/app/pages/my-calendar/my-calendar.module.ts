import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgCalendarModule } from 'ionic2-calendar';
import { IonicModule } from '@ionic/angular';

import { MyCalendarPage } from './my-calendar.page';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: MyCalendarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [MyCalendarPage]
})
export class MyCalendarPageModule {}
