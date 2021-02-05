import { Component } from "@angular/core";
import { NavParams, ModalController } from 'node_modules/@ionic/angular';

@Component({
  selector: "app-event-details",
  templateUrl: "./event-details.page.html",
  styleUrls: ["./event-details.page.scss"]
})
export class EventDetailsPage {
  public scheduleData: any;
  constructor(public nav: NavParams, public modalCtrl: ModalController) {
    this.scheduleData = this.nav.get("param");
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
