import { LoaderModule } from './../../Module/loader/loader.module';
import { Component } from '@angular/core';
import { Contacts } from '@ionic-native/contacts/ngx';
import { FirebaseCRUDService } from '../../service/curd/firebase-crud.service';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from 'node_modules/@ionic/angular';
import { EventDetailsPage } from '../Modal/event-details/event-details.page';
@Component({
  selector: "app-contact",
  templateUrl: "./contact.page.html",
  styleUrls: ["./contact.page.scss"]
})
export class ContactPage {
  public Data: any = [];
  public showSkeleton = false;
  constructor(
    public contacts: Contacts,
    public loader: LoaderModule,
    public apiService: FirebaseCRUDService,
    public router: Router,
    public modalCtrl: ModalController
  ) {
    // this.contacts
    //   .find(['displayName', 'name', 'phoneNumbers'], {
    //     filter: '',
    //     multiple: true
    //   })
    //   .then(data => {
    //     this.showContactList(data);
    //   });
    this.showRegisterList();
  }

  showContactList(val: any) {
    this.Data = [];
    val.map((e: any) => {
      if (e.phoneNumbers != null) {
        const contactdata = {
          fullname: e.displayName,
          phonenumber: e.phoneNumbers[0].value
        };
        this.Data.push(contactdata);
      }
    });
  }

  showRegisterList() {
    this.showSkeleton = true;
    this.apiService.read_Schedule().subscribe(
      (success: any) => {
        this.Data = [];
        for (let i = 0; i < success.length; i++) {
          if (
            success[i].payload.doc.data()["userId"] !==
            localStorage.getItem("userID")
          ) {
            const fullData = {
              userId: success[i].payload.doc.data()["userId"],
              title: success[i].payload.doc.data()["title"],
              startDate: success[i].payload.doc.data()["startDate"],
              endDate: success[i].payload.doc.data()["endDate"],
              notes: success[i].payload.doc.data()["notes"],
              mail: success[i].payload.doc.data()["mail"],
              location: success[i].payload.doc.data()["location"],
              days: success[i].payload.doc.data()["days"],
              cno: success[i].payload.doc.data()["cno"],
              charge: success[i].payload.doc.data()["charge"]
            };
            this.Data.push(fullData);
          }
          this.showSkeleton = false;
        }
      },
      Error => {
        console.log(Error);
      }
    );
  }

  createAppointment(val: any) {
    const appointmentDataObj = {
      receiverID: val.userId,
      title: val.title,
      location: val.location,
      type_create: "createAppointment"
    };
    const navigationExtras: NavigationExtras = {
      state: {
        appointData: appointmentDataObj
      }
    };
    this.router.navigate(["appoint"], navigationExtras);
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
