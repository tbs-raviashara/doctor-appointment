import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { IonicModule } from "@ionic/angular";
import { NgCalendarModule } from "ionic2-calendar";

import { ProfilePage } from "./profile.page";

const routes: Routes = [
  {
    path: "",
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
