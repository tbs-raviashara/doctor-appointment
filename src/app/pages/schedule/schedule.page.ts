import { environment } from "./../../../environments/environment";
import { FirebaseCRUDService } from "./../../service/curd/firebase-crud.service";
import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoaderModule } from "../../Module/loader/loader.module";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertModule } from "../../Module/alert/alert.module";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.page.html",
  styleUrls: ["./schedule.page.scss"]
})
export class SchedulePage {
  public scheduleForm: FormGroup;
  public scheduleData: any;
  public title: string;
  constructor(
    public formBuilder: FormBuilder,
    public apiService: FirebaseCRUDService,
    public loader: LoaderModule,
    public router: Router,
    public route: ActivatedRoute,
    public toast: AlertModule
  ) {
    this.scheduleForm = this.formBuilder.group({
      userId: localStorage.getItem("userID"),
      title: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      charge: ["", Validators.required],
      days: ["", Validators.required],
      location: ["", Validators.required],
      cno: ["", [Validators.required, Validators.pattern("[0-9]{10}")]],
      mail: ["", [Validators.required, Validators.email]],
      notes: ""
    });

    this.route.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.title = "Edit";
        this.scheduleData = this.router.getCurrentNavigation().extras.state.scheduleData;
        this.scheduleForm.controls["title"].setValue(this.scheduleData.title);
        this.scheduleForm.controls["startDate"].setValue(
          this.scheduleData.startDate
        );
        this.scheduleForm.controls["endDate"].setValue(
          this.scheduleData.endDate
        );
        this.scheduleForm.controls["charge"].setValue(this.scheduleData.charge);
        this.scheduleForm.controls["days"].setValue(this.scheduleData.days);
        this.scheduleForm.controls["location"].setValue(
          this.scheduleData.location
        );
        this.scheduleForm.controls["cno"].setValue(this.scheduleData.cno);
        this.scheduleForm.controls["mail"].setValue(this.scheduleData.mail);

        this.scheduleForm.controls["notes"].setValue(this.scheduleData.notes);
      } else {
        this.title = "Add";
      }
    });
  }

  scheduleFormSubmit(val: any) {
    this.loader.showLoader();
    if (this.scheduleData) {
      this.apiService
        .update_Schedule(this.scheduleData.id, val.value)
        .then((success: any) => {
          this.loader.hideLoader();
          this.toast.showToast("Schedule edit Successfully", "top", 5000);
          this.readToken(val.value);
        })
        .catch(error => {
          this.loader.hideLoader();
          console.log("error", error);
        });
    } else {
      this.apiService
        .create_NewSchedule(val.value)
        .then((success: any) => {
          this.toast.showToast("Schedule added Successfully", "top", 5000);
          this.loader.hideLoader();
          this.readToken(val.value);
        })
        .catch(error => {
          this.loader.hideLoader();
          console.log("error", error);
        });
    }
  }

  readToken(val: any) {
    this.apiService.readToken().subscribe((success: any) => {
      if (success.length != 0) {
        const devicesToken: any = [];
        for (let data of success) {
          if (data.payload.doc.id !== localStorage.getItem("userID")) {
            devicesToken.push(data.payload.doc.data()["token"]);
          }
        }
        console.log(devicesToken);
        if (devicesToken.length === success.length - 1) {
          const passData = {
            registration_ids: devicesToken,
            data: {
              title: "Appointment",
              body: "<b>" + val.title + "</b> add on doctor list",
              sound: "default",
              badge: "1",
              type: "finddoctor"
            }
          };
          this.apiService.http
            .post(environment.notificationURL, passData, {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "key=AAAA2PGtg5E:APA91bFGGX3pugmeVBN1mjZg_4v5Yx7C0AALh5aPt2qmmc5Qc6exHczOe8j2WA39sZDrHY6kAwF1-9MRO1u3zzjfyBwWf92JBFb4rmMGJALXw5_pWIDSZ4aWsrNaaPz9jp2ZiuNSkdPz"
              }
            })
            .subscribe(response => {});
        }
      }
    });
  }
}
