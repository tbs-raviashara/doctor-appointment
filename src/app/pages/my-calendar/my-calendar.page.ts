import { FirebaseCRUDService } from "../../service/curd/firebase-crud.service";
import { Component } from "@angular/core";
import { MenuController, NavController } from "@ionic/angular";
import * as moment from "moment";
import { NavigationExtras } from "@angular/router";
import { ActionSheetModule } from "../../Module/action-sheet/action-sheet.module";
@Component({
  selector: "app-my-calendar",
  templateUrl: "./my-calendar.page.html",
  styleUrls: ["./my-calendar.page.scss"]
})
export class MyCalendarPage {
  public day_Date: any = "";
  public eventSource: any;
  viewTitle;
  isToday: boolean;
  calendar = {
    mode: "month",
    currentDate: new Date()
  };

  constructor(
    public menuCtrl: MenuController,
    public apiService: FirebaseCRUDService,
    public actionSheet: ActionSheetModule,
    public navCtrl: NavController
  ) {
    this.menuCtrl.enable(true);
  }

  ionViewWillEnter() {
    this.apiService.readAppointment().subscribe((success: any) => {
      this.eventSource = [];
      for (const data of success) {
        let changeDateFormat: any = moment(
          data.payload.doc.data()["date"]
        ).format("YYYY-MM-DD");
        const newData = {
          id: data.payload.doc.id,
          cno: data.payload.doc.data()["cno"],
          date: data.payload.doc.data()["date"],
          endTime: new Date(
            changeDateFormat + " " + data.payload.doc.data()["endTime"]
          ),
          location: data.payload.doc.data()["location"],
          mail: data.payload.doc.data()["mail"],
          notes: data.payload.doc.data()["notes"],
          patient_name: data.payload.doc.data()["patient_name"],
          receiverID: data.payload.doc.data()["receiverID"],
          senderID: data.payload.doc.data()["senderID"],
          startTime: new Date(
            changeDateFormat + " " + data.payload.doc.data()["startTime"]
          ),
          status: data.payload.doc.data()["status"],
          title: data.payload.doc.data()["title"],
          type: data.payload.doc.data()["type"],
          allDay: false
        };
        this.eventSource.push(newData);
      }
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    this.viewTitle = moment(ev.selectedTime).format("MMMM DD");
    this.day_Date = ev.events;
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  async morTask(val: any) {
    this.actionSheet.showRDActionsheet((return_val: any) => {
      if (return_val === "delete") {
        this.actionSheet.showDeleteActionsheet(
          "Delete " + val.type === "Sender" ? val.title : val.patient_name,
          returnDelVal => {
            if (returnDelVal === "Yes") {
              this.apiService.deleteAppointment(
                localStorage.getItem("userID"),
                val.id
              );

              this.apiService.deleteAppointment(
                val.receiverID,
                val.id
              );
            }
          }
        );
      } else if (return_val === "view") {
        this.navCtrl.navigateForward("/history");
      }
    });
  }
}
