import { Component } from '@angular/core';
import * as $ from "jquery";
@Component({
  selector: 'app-check-otp',
  templateUrl: './check-otp.page.html',
  styleUrls: ['./check-otp.page.scss'],
})
export class CheckOtpPage {
  public otpArr: any = [];
  constructor() {
  }

  otpFormSubmit() {
    $('input[type=hidden][name=otpHidden]').each((i, val: any) => {
      this.otpArr.push(val.value);
    });
    let self = this;
    setTimeout(() => {
      console.log(self.otpArr.toString().replace(/,/g, ''));
    }, 1000);
  }

  otpController(event, next, prev) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus();
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    } else {
      return 0;
    }
  }

  resendCode() {
    
  }
}
