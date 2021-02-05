import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActionSheetController } from "@ionic/angular";

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class ActionSheetModule {
  constructor(public actionSheetController: ActionSheetController) {}

  showDeleteActionsheet(header: string, returnFunc: any) {
    this.actionSheetController
      .create({
        header: header,
        mode: "ios",
        buttons: [
          {
            text: "Delete",
            role: "destructive",
            handler: () => {
              returnFunc("Yes");
            }
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          }
        ]
      })
      .then((actionSheetController: any) => {
        actionSheetController.present();
      });
  }

  showRUDActionsheet(returnFunc: any) {
    this.actionSheetController
      .create({
        mode: "ios",
        buttons: [
          {
            text: "Delete",
            role: "destructive",
            handler: () => {
              returnFunc("delete");
            }
          },
          {
            text: "Edit",
            handler: () => {
              returnFunc("edit");
            }
          },
          {
            text: "View",
            handler: () => {
              returnFunc("view");
            }
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {}
          }
        ]
      })
      .then((actionSheetController: any) => {
        actionSheetController.present();
      });
  }

  showRDActionsheet(returnFunc: any) {
    this.actionSheetController
      .create({
        mode: "ios",
        buttons: [
          {
            text: "Delete",
            role: "destructive",
            handler: () => {
              returnFunc("delete");
            }
          },
          {
            text: "View",
            handler: () => {
              returnFunc("view");
            }
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {}
          }
        ]
      })
      .then((actionSheetController: any) => {
        actionSheetController.present();
      });
  }
}
