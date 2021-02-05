import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingController } from '../../../../node_modules/@ionic/angular';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class LoaderModule {
  constructor(public loader: LoadingController) {}

  showLoader() {
    this.loader
      .create({
        mode: "ios",
        spinner: "crescent"
      })
      .then((loader: any) => {
        loader.present();
      });
  }

  hideLoader() {
    this.loader.dismiss();
  }
}
