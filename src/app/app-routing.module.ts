import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthService } from "./service/auth/auth.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "my-calendar",
    pathMatch: "full",
    canActivate: [AuthService]
  },
  {
    path: "login",
    loadChildren: "./pages/Auth/login/login.module#LoginPageModule"
  },
  {
    path: "register",
    loadChildren: "./pages/Auth/register/register.module#RegisterPageModule"
  },
  {
    path: "check-otp",
    loadChildren: "./pages/Auth/check-otp/check-otp.module#CheckOtpPageModule"
  },
  {
    path: "forgot-password",
    loadChildren:
      "./pages/Auth/forgot-password/forgot-password.module#ForgotPasswordPageModule"
  },
  {
    path: "change-password",
    loadChildren:
      "./pages/Auth/change-password/change-password.module#ChangePasswordPageModule"
  },
  {
    path: "profile",
    loadChildren: "./pages/Profile/profile/profile.module#ProfilePageModule",
    canActivate: [AuthService]
  },
  {
    path: "contact",
    loadChildren: "./pages/contact/contact.module#ContactPageModule",
    canActivate: [AuthService]
  },
  {
    path: "event-details",
    loadChildren:
      "./pages/Modal/event-details/event-details.module#EventDetailsPageModule",
    canActivate: [AuthService]
  },
  {
    path: "my-calendar",
    loadChildren: "./pages/my-calendar/my-calendar.module#MyCalendarPageModule",
    canActivate: [AuthService]
  },
  {
    path: "schedule",
    loadChildren: "./pages/schedule/schedule.module#SchedulePageModule",
    canActivate: [AuthService]
  },
  {
    path: "appoint",
    loadChildren: "./pages/appoint/appoint.module#AppointPageModule",
    canActivate: [AuthService]
  },
  {
    path: "history",
    loadChildren: "./pages/history/history.module#HistoryPageModule",
    canActivate: [AuthService]
  },
  {
    path: "schedule-list",
    loadChildren: "./pages/schedule/schedule-list/schedule-list.module#ScheduleListPageModule",
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
