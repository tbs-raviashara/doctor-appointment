import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  public checkFormChangePassword: boolean = true;
  public title: any;
  public changepswdForm: FormGroup;
  public forgotpswdForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public router: Router, public route: ActivatedRoute) {
    this.changepswdForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
        validator: this.MatchPassword // Inject the provider method
      });

    this.forgotpswdForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
        validator: this.MatchPassword // Inject the provider method
      });


    this.route.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (this.router.getCurrentNavigation().extras.state) {
          this.title = 'Forgot Password';
          this.checkFormChangePassword = false;
        } else {
          this.title = 'Change Password';
          this.checkFormChangePassword = true;
        }
      }
    });
  }

  MatchPassword(AC: AbstractControl) {
    const newPassword = AC.get('newPassword').value // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value // to get value in input tag
    if (newPassword !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      AC.get('confirmPassword').setErrors(null);
    }
  }
}
