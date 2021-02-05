import { Component } from "@angular/core";

import { Platform, Events } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { FirebaseCRUDService } from "./service/curd/firebase-crud.service";
import { Router } from "@angular/router";
import { AlertModule } from "./Module/alert/alert.module";
import { DomSanitizer } from "@angular/platform-browser";
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public version: any = "";
  public userData: any;
  public appPages = [
    {
      title: "My Calendar",
      url: "/my-calendar",
      icon: "calendar"
    },
    {
      title: "History",
      url: "/history",
      icon: "eye"
    },
    {
      title: "Find a doctor",
      url: "/contact",
      icon: "contacts"
    },
    {
      title: "Add New Schedule",
      url: "/schedule",
      icon: "add-circle-outline"
    },
    {
      title: "View Schedule",
      url: "/schedule-list",
      icon: "eye"
    },
    {
      title: "Profile",
      url: "/profile",
      icon: "person"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appVersion: AppVersion,
    public fireBase: FirebaseCRUDService,
    public router: Router,
    public alertModule: AlertModule,
    public _DomSanitizer: DomSanitizer,
    public events: Events,
    public push: Push
  ) {
    this.initializeApp();
    this.handleHardwareBackButton();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getUserData();
      if (
        this.fireBase.checkPlatform() === "android" ||
        this.fireBase.checkPlatform() === "ios"
      ) {
        this.showAppVersion();
        this.push.hasPermission().then((res: any) => {
          if (res.isEnabled) {
            this.pushSetup();
          } else {
            console.log(
              "WE do not have a permission to send push notification"
            );
          }
        });
      }
    });
    this.events.subscribe("getUserData", () => {
      this.getUserData();
    });
  }

  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: "931767616401"
      },
      ios: {
        alert: "true",
        badge: true,
        sound: "true"
      }
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on("notification").subscribe(
      (notification: any) => {
        if (notification.additionalData.foreground) {
          this.alertModule.openConfirm(
            notification.title,
            notification.message,
            "See",
            response => {
              if (response === "Success") {
                this.redirectPage(notification);
              }
            }
          );
        } else {
          this.redirectPage(notification);
        }
      },
      error => {
        console.log("Error Notification", error);
      }
    );

    pushObject.on("registration").subscribe(
      (registration: any) => {
        localStorage.setItem("notificationToken", registration.registrationId);
      },
      error => {
        console.log("Error Registration", error);
      }
    );
    pushObject.on("error").subscribe(error => console.log("Error", error));
  }

  redirectPage(notification: any) {
    if (localStorage.getItem("isLogin") === "true") {
      if (notification.additionalData.type === "history") {
        this.router.navigateByUrl("/history");
      } else if (notification.additionalData.type === "finddoctor") {
        this.router.navigateByUrl("/contact");
      }
    }
  }

  getUserData() {
    if (localStorage.getItem("isLogin") === "true") {
      this.fireBase.read_Users().subscribe((success: any) => {
        if (success.length !== 0) {
          const userData = {
            fullName:
              success[0].payload.doc.data()["profile"]["fname"] +
              " " +
              success[0].payload.doc.data()["profile"]["lname"],
            occupation: success[0].payload.doc.data()["profile"]["occupation"],
            image:
              success[0].payload.doc.data()["profile"]["image"] != ""
                ? "data:image/*;charset=utf-8;base64," +
                  success[0].payload.doc.data()["profile"]["image"]
                : "data:image/*;charset=utf-8;base64,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"
          };
          this.userData = userData;
        } else {
          this.userData = {
            fullName: "",
            occupation: "",
            image: ""
          };
        }
      });
    }
  }
  showAppVersion() {
    this.appVersion.getVersionNumber().then((val: any) => {
      this.version = val;
    });
  }

  handleHardwareBackButton() {
    this.platform.backButton.subscribe((event: any) => {
      if (this.router.url === "/login") {
        navigator["app"].exitApp();
      } else if (
        this.router.url !== "/register" &&
        this.router.url !== "/check-otp" &&
        this.router.url !== "/forgot-password" &&
        this.router.url !== "/change-password"
      ) {
        this.alertModule.openConfirm(
          "Exit App",
          "Are you sure exit App",
          "Exit",
          (returnValue: any) => {
            if (returnValue === "Success") {
              navigator["app"].exitApp();
            }
          }
        );
      }
    });
  }

  logout() {
    localStorage.setItem("isLogin", "false");
    localStorage.setItem("isToken", "false");
  }
}
