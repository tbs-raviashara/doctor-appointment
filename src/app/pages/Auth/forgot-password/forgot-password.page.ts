import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { FormsModule, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FirebaseCRUDService } from "../../../service/curd/firebase-crud.service";
import { AlertModule } from "../../../Module/alert/alert.module";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"]
})
export class ForgotPasswordPage {
  public forgotPasswordForm: FormsModule;
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public router: Router,
    public apiService: FirebaseCRUDService,
    public alert: AlertModule
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }

  forgotPasswordformSubmit(val: any) {
    this.apiService
      .forgotPassword(val.value.email)
      .then(success => {
        this.alert.openAlert(
          "Forgot Password",
          "Send password link on your email",
          "OK"
        );
        this.navCtrl.navigateForward(["login"]);
      })
      .catch((error: any) => {
        if (error.code === "auth/user-not-found") {
          this.alert.openAlert(
            "Forgot Password",
            "This email address not found",
            "OK"
          );
        }
      });
  }
}
