import { AlertModule } from './../../Module/alert/alert.module';
import { ActionSheetModule } from './../../Module/action-sheet/action-sheet.module';
import { Component } from '@angular/core';
import { FirebaseCRUDService } from '../../service/curd/firebase-crud.service';
import { LoaderModule } from '../../Module/loader/loader.module';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: "app-history",
  templateUrl: "./history.page.html",
  styleUrls: ["./history.page.scss"]
})
export class HistoryPage {
  public historyOfAppointment: any = [];
  public showSkeleton = false;
  constructor(
    public apiService: FirebaseCRUDService,
    public loader: LoaderModule,
    public router: Router,
    public actionSheet: ActionSheetModule,
    public toast: AlertModule
  ) {}

  ionViewWillEnter() {
    this.showSkeleton = true;
    this.apiService.readAppointment().subscribe((success: any) => {
      this.historyOfAppointment = [];
      for (const data of success) {
        const newData = {
          id: data.payload.doc.id,
          cno: data.payload.doc.data()["cno"],
          date: data.payload.doc.data()["date"],
          endTime: data.payload.doc.data()["endTime"],
          location: data.payload.doc.data()["location"],
          mail: data.payload.doc.data()["mail"],
          notes: data.payload.doc.data()["notes"],
          patient_name: data.payload.doc.data()["patient_name"],
          receiverID: data.payload.doc.data()["receiverID"],
          senderID: data.payload.doc.data()["senderID"],
          startTime: data.payload.doc.data()["startTime"],
          status: data.payload.doc.data()["status"],
          title: data.payload.doc.data()["title"],
          type: data.payload.doc.data()["type"]
        };
        this.historyOfAppointment.push(newData);
        if (this.historyOfAppointment.length === success.length) {
          this.showSkeleton = false;
        }
      }
    });
  }

  deleteAppointmentData(val: any, val_receiver: any) {
    this.actionSheet.showDeleteActionsheet(
      "Delete Appointment",
      (return_val: any) => {
        if (return_val === "Yes") {
          this.apiService.deleteAppointment(
            localStorage.getItem("userID"),
            val
          );

          this.apiService.deleteAppointment(val_receiver, val);
        }
      }
    );
  }

  editAppointmentData(val: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        appointData: val
      }
    };
    this.router.navigate(["appoint"], navigationExtras);
  }

  changeStatus(val: any, val1: any) {
    val.status = val1;
    this.loader.showLoader();
    this.apiService
      .addAppointment(localStorage.getItem("userID"), val.id, val)
      .then((success: any) => {
        this.loader.hideLoader();
        this.toast.showToast(
          "Appointment " + val1 + " Successfully",
          "top",
          5000
        );
        this.changeAppointmentSender(val.id, val);
      })
      .catch(error => {
        this.loader.hideLoader();
        console.log("error", error);
      });
  }

  changeAppointmentSender(val1: any, val2: any) {
    val2.type = "Sender";
    this.apiService
      .addAppointment(val2.senderID, val1, val2)
      .then((success: any) => {
        console.log("Send");
      });
    this.getnotificationID(val2);
  }

  getnotificationID(val: any) {
    this.apiService.readToken().subscribe((success: any) => {
      if (success.length != 0) {
        const data = success.find(
          it => it.payload.doc.id === val.senderID
        );
        this.apiService.sendNotification(
          data,
          "history",
          "<b>" + val.title + "</b>" + " " + val.status +" your appointment"
        );
      }
    });
  }

  returnVal(val: any) {
    if (val === "Sender") {
      return "title";
    } else {
      return "patient_name";
    }
  }
}
