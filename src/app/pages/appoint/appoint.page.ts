import { AlertModule } from "./../../Module/alert/alert.module";
import { FirebaseCRUDService } from "./../../service/curd/firebase-crud.service";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoaderModule } from "../../Module/loader/loader.module";
import * as moment from "moment";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
@Component({
  selector: "app-appoint",
  templateUrl: "./appoint.page.html",
  styleUrls: ["./appoint.page.scss"]
})
export class AppointPage {
  public minDate = moment().format("YYYY-MM-DD");
  public maxDate = moment()
    .add(7, "days")
    .format("YYYY-MM-DD");
  public appointForm: FormGroup;
  public appointData: any;
  public title: string;
  constructor(
    public formBuilder: FormBuilder,
    public apiService: FirebaseCRUDService,
    public loader: LoaderModule,
    public router: Router,
    public route: ActivatedRoute,
    public toast: AlertModule
  ) {
    this.appointForm = this.formBuilder.group({
      title: "",
      date: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
      location: "",
      cno: ["", [Validators.required, Validators.pattern("[0-9]{10}")]],
      mail: ["", [Validators.required, Validators.email]],
      notes: "",
      status: "Pending",
      type: "Sender",
      receiverID: "",
      senderID: localStorage.getItem("userID"),
      patient_name: ["", Validators.required]
    });
    this.route.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation().extras.state) {
        if (
          this.router.getCurrentNavigation().extras.state.appointData
            .type_create !== undefined
        ) {
          this.title = "Add";
          this.appointForm.controls["title"].setValue(
            this.router.getCurrentNavigation().extras.state.appointData.title
          );
          this.appointForm.controls["location"].setValue(
            this.router.getCurrentNavigation().extras.state.appointData.location
          );
          this.appointForm.controls["receiverID"].setValue(
            this.router.getCurrentNavigation().extras.state.appointData
              .receiverID
          );
        } else {
          this.title = "Edit";
          this.appointData = this.router.getCurrentNavigation().extras.state.appointData;
          this.appointForm.controls["title"].setValue(this.appointData.title);
          this.appointForm.controls["date"].setValue(this.appointData.date);
          this.appointForm.controls["location"].setValue(
            this.appointData.location
          );
          this.appointForm.controls["cno"].setValue(this.appointData.cno);
          this.appointForm.controls["mail"].setValue(this.appointData.mail);
          this.appointForm.controls["notes"].setValue(this.appointData.notes);
          this.appointForm.controls["receiverID"].setValue(
            this.appointData.receiverID
          );
          this.appointForm.controls["patient_name"].setValue(
            this.appointData.patient_name
          );
          const currentDate: any = moment(this.appointData.date).format(
            "MM/DD/YYYY"
          );
          this.appointForm.controls["status"].setValue(this.appointData.status);
          const mergeStarttime: any = moment(
            currentDate + " " + this.appointData.startTime
          ).format();
          const mergeEndttime: any = moment(
            currentDate + " " + this.appointData.endTime
          ).format();
          this.appointForm.controls["startTime"].setValue(mergeStarttime);
          this.appointForm.controls["endTime"].setValue(mergeEndttime);
        }
      } else {
        this.title = "Add";
      }
    });
  }

  appointFormSubmit(val: any) {
    val.value.startTime = moment(val.value.startTime).format("HH:mm");
    val.value.endTime = moment(val.value.endTime).format("HH:mm");
    this.loader.showLoader();
    let randomNum: any;
    if (this.appointData) {
      randomNum = this.appointData.id;
    } else {
      randomNum = Math.floor(100000 + Math.random() * 900000);
    }
    this.apiService
      .addAppointment(localStorage.getItem("userID"), randomNum, val.value)
      .then((success: any) => {
        this.loader.hideLoader();
        this.addAppoingonReceiver(randomNum, val);
        if (this.appointData) {
          this.toast.showToast("Appointment edit Successfully", "top", 5000);
        } else {
          this.toast.showToast("Appointment add Successfully", "top", 5000);
        }
      })
      .catch(error => {
        this.loader.hideLoader();
        console.log("error", error);
      });
  }

  addAppoingonReceiver(val: any, val1: any) {
    val1.value.type = "Receiver";
    this.apiService
      .addAppointment(val1.value.receiverID, val, val1.value)
      .then((success: any) => {
        console.log("Received");
      });
    this.getnotificationID(val1.value);
  }

  getnotificationID(val: any) {
    this.apiService.readToken().subscribe((success: any) => {
      if (success.length != 0) {
        const data = success.find(it => it.payload.doc.id === val.receiverID);
        this.apiService.sendNotification(
          data,
          "history",
          "<b>" + val.patient_name + "</b>" + " booked your appointment"
        );
      }
    });
  }
}
