import { EventDetailsPage } from '../../Modal/event-details/event-details.page';
import { Component } from "@angular/core";
import { FirebaseCRUDService } from "../../../service/curd/firebase-crud.service";
import { ActionSheetModule } from "../../../Module/action-sheet/action-sheet.module";
import { NavigationExtras, Router } from "@angular/router";
import { ModalController } from 'node_modules/@ionic/angular';
@Component({
  selector: "app-schedule-list",
  templateUrl: "./schedule-list.page.html",
  styleUrls: ["./schedule-list.page.scss"]
})
export class ScheduleListPage {
  public showSkeleton = false;
  public scheduleData: any = [];
  constructor(
    public apiService: FirebaseCRUDService,
    public actionSheet: ActionSheetModule,
    public router: Router,
    public modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.showSkeleton = true;
    this.apiService.read_Schedule().subscribe((success: any) => {
      this.scheduleData = [];
      success.map(res => {
        if (
          res.payload.doc.data()["userId"] === localStorage.getItem("userID")
        ) {
          let scheduleObj = {
            id: res.payload.doc.id,
            charge: res.payload.doc.data()["charge"],
            cno: res.payload.doc.data()["cno"],
            days: res.payload.doc.data()["days"],
            endDate: res.payload.doc.data()["endDate"],
            location: res.payload.doc.data()["location"],
            mail: res.payload.doc.data()["mail"],
            notes: res.payload.doc.data()["notes"],
            startDate: res.payload.doc.data()["startDate"],
            title: res.payload.doc.data()["title"],
            userId: res.payload.doc.data()["userId"]
          };
          this.scheduleData.push(scheduleObj);
          
        }
      });
      this.showSkeleton = false;
    });
  }

  moreSelect(val: any) {
    this.actionSheet.showRUDActionsheet((returnVal: any) => {
      if (returnVal === "delete") {
        this.actionSheet.showDeleteActionsheet(
          "Delete schedule with " + val.title,
          return_Val => {
            if (return_Val === "Yes") {
              this.apiService.delete_Schedule(val.id);
            }
          }
        );
      } else if (returnVal === "edit") {
        let navigationExtras: NavigationExtras = {
          state: {
            scheduleData: val
          }
        };
        this.router.navigate(["schedule"], navigationExtras);
      } else if (returnVal === "view") {
        this.viewDetails(val);
      }
    });
  }

  async viewDetails(val: any) {
    const modal = await this.modalCtrl.create({
      component: EventDetailsPage,
      componentProps: {
        param: val
      }
    });
    return await modal.present();
  }
}
