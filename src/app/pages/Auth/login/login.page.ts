import { FirebaseCRUDService } from "./../../../service/curd/firebase-crud.service";
import { Component } from "@angular/core";
import { MenuController, NavController, Events } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertModule } from "../../../Module/alert/alert.module";
import { LoaderModule } from "../../../Module/loader/loader.module";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage {
  public loginForm: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  constructor(
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public crudService: FirebaseCRUDService,
    public alertModule: AlertModule,
    public navCtrl: NavController,
    public loader: LoaderModule,
    public events: Events
  ) {
    this.menuCtrl.enable(false);
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      remember: "false"
    });
  }

  ionViewWillEnter() {
    if (localStorage.getItem("isRemember") === "true") {
      const getData: any = JSON.parse(localStorage.getItem("userLoginDetails"));
      this.loginForm.controls["email"].setValue(getData.email);
      this.loginForm.controls["password"].setValue(getData.password);
      this.loginForm.controls["remember"].setValue(getData.remember);
    }
  }

  loginformSubmit(val: any) {
    if (val.value.remember === true || val.value.remember === "true") {
      localStorage.setItem("isRemember", "true");
    } else {
      localStorage.setItem("isRemember", "false");
    }
    localStorage.setItem("userLoginDetails", JSON.stringify(val.value));
    try {
      this.loader.showLoader();
      this.crudService
        .loginUser(val.value)
        .then((success: any) => {
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("userID", success.user.uid);
          this.loader.hideLoader();
          this.navCtrl.navigateRoot(["my-calendar"]);
          this.events.publish("getUserData");
          this.registerNotificationFCMToken(success.user.uid);
        })
        .catch((error: any) => {
          if (error.code === "auth/user-not-found") {
            this.alertModule.openAlert("Login", "Email not register", "Ok");
          } else if (error.code === "auth/wrong-password") {
            this.alertModule.openAlert(
              "Login",
              "The password is invalid",
              "Ok"
            );
          } else {
            this.alertModule.openAlert(
              "Login",
              "Oops something went wrong",
              "Ok"
            );
          }
          this.loader.hideLoader();
        });
    } catch (error) {
      this.loader.hideLoader();
      console.log("Login Error", error);
    }
  }

  registerNotificationFCMToken(val: any) {
    if (localStorage.getItem("isToken") !== "true") {
      this.crudService
        .registerToken_data(val)
        .then((success: any) => {
          localStorage.setItem("isToken", "true");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  hideShowPassword(){
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
