import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { FirebaseCRUDService } from "../../../service/curd/firebase-crud.service";
import { AlertModule } from "../../../Module/alert/alert.module";
import { LoaderModule } from "../../../Module/loader/loader.module";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage {
  public signupForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public crudService: FirebaseCRUDService,
    public alertModule: AlertModule,
    public navCtrl: NavController,
    public loader: LoaderModule
  ) {
    // this.menuCtrl.enable(false);
    this.signupForm = this.formBuilder.group(
      {
        // fname: "",
        // lname: "",
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        // phone: ["", [Validators.required, Validators.pattern("[0-9]{10}")]],
        confirmPassword: ""
      },
      {
        validator: this.MatchPassword // Inject the provider method
      }
    );
  }

  MatchPassword(AC: AbstractControl) {
    const password = AC.get("password").value; // to get value in input tag
    const confirmPassword = AC.get("confirmPassword").value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get("confirmPassword").setErrors({ MatchPassword: true });
    } else {
      AC.get("confirmPassword").setErrors(null);
    }
  }

  signupFormSubmit(val: any) {
    try {
      this.loader.showLoader();
      this.crudService
        .registerUser(val.value)
        .then((success: any) => {
          this.alertModule.openAlert(
            "Register",
            "Account successfully created",
            "OK"
          );
          this.loader.hideLoader();
          this.navCtrl.navigateBack(["login"]);
        })
        .catch((error: any) => {
          this.loader.hideLoader();
          if (error.code === "auth/email-already-in-use") {
            this.alertModule.openAlert(
              "Register",
              "Email address already register",
              "OK"
            );
          } else {
            console.log("Register Error", error);
          }
        });
    } catch (error) {
      this.loader.hideLoader();
      console.log("Register Error", error);
    }
  }
}
