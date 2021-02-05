import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertController, ToastController } from "@ionic/angular";

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class AlertModule {
  constructor(
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  /**
   *
   * @param val_header - set Header
   * @param val_message - set Message
   * @param val_buttons - set Button name
   */
  async openAlert(val_header: string, val_message: any, val_buttons: string) {
    const alert = await this.alertController.create({
      header: val_header,
      message: val_message,
      buttons: [val_buttons],
      mode:'ios'
    });
    await alert.present();
  }

  /**
   *
   * @param val_header - set Header
   * @param val_message - set Message
   * @param val_buttons - set Button 'Done' cancel button show by default
   * @param func_return - return value Fail, Success
   */
  async openConfirm(
    val_header: string,
    val_message: any,
    val_buttons: any,
    func_return: any
  ) {
    const confirm = await this.alertController.create({
      header: val_header,
      message: val_message,
      mode: 'ios',
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            func_return("Fail");
          }
        },
        {
          text: val_buttons,
          handler: () => {
            func_return("Success");
          }
        }
      ]
    });
    await confirm.present();
  }

  /**
   *
   * @param val_message -set Message
   * @param val_position - set Position "bottom" | "middle" | "top"
   * @param val_duration  - set Duration
   */
  async showToast(val_message: any, val_position: any, val_duration: any) {
    const toast = await this.toastController.create({
      message: val_message,
      position: val_position,
      duration: val_duration,
      mode:'ios'
    });
    await toast.present();
  }
}
