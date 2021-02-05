
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Camera } from "@ionic-native/camera/ngx";
import { Crop } from "@ionic-native/crop/ngx";
import { NgCalendarModule } from "ionic2-calendar";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { Contacts } from '@ionic-native/contacts/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import * as firebase from "firebase";
firebase.initializeApp(environment.firebase);
import { Push } from "@ionic-native/push/ngx";

/** Service */
import { AuthService } from "./service/auth/auth.service";
import { FirebaseCRUDService } from "./service/curd/firebase-crud.service";

/** Modules */
import { AlertModule } from "./Module/alert/alert.module";
import { LoaderModule } from "./Module/loader/loader.module";
import { ActionSheetModule } from "./Module/action-sheet/action-sheet.module";
import { HttpClientModule } from "node_modules/@angular/common/http";

/** Pipes */
import { PipesModule } from './pipes/pipes.module';
import { EventDetailsPageModule } from './pages/Modal/event-details/event-details.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  exports: [FormsModule],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    LoaderModule,
    ActionSheetModule,
    HttpClientModule,
    AngularMultiSelectModule,
    NgCalendarModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule,
    EventDetailsPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    FirebaseCRUDService,
    AppVersion,
    Camera,
    Crop,
    Contacts,
    Base64,
    Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
