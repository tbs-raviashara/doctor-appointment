import { LoaderModule } from "./../../../Module/loader/loader.module";
import { FirebaseCRUDService } from "./../../../service/curd/firebase-crud.service";
import { Component } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient } from "@angular/common/http";
import { Crop } from "@ionic-native/crop/ngx";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Base64 } from "@ionic-native/base64/ngx";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage {
  public userImage;
  public profileForm: FormGroup;
  itemList: any = [];
  selectedItems = [];
  settings = {};
  constructor(
    public actionSheetController: ActionSheetController,
    public camera: Camera,
    public http: HttpClient,
    public crop: Crop,
    public formBuilder: FormBuilder,
    public apiService: FirebaseCRUDService,
    public loader: LoaderModule,
    public base64: Base64,
    public _DomSanitizer: DomSanitizer
  ) {
    this.settings = {
      text: "Select Country",
      classes: "myclass custom-class",
      primaryKey: "alpha3Code",
      labelKey: "name",
      noDataLabel: "Country not available",
      enableSearchFilter: true,
      searchBy: ["name"],
      singleSelection: true,
      enableCheckAll: false,
      enableFilterSelectAll: false,
      maxHeight: 200,
      searchAutofocus: false
    };
    this.profileForm = this.formBuilder.group({
      profileId: "",
      fname: ["", Validators.required],
      lname: ["", Validators.required],
      gender: ["", Validators.required],
      dob: ["", Validators.required],
      country: "",
      occupation: "",
      description: "",
      address: ["", Validators.required],
      image: ""
    });
  }
  public profileData: any;
  ionViewWillEnter() {
    this.apiService.read_Users().subscribe((success: any) => {
      if (success.length != 0) {
        this.profileForm.controls["profileId"].setValue(
          success[0].payload.doc.id
        );
        this.profileForm.controls["fname"].setValue(
          success[0].payload.doc.data()["profile"]["fname"]
        );
        this.profileForm.controls["lname"].setValue(
          success[0].payload.doc.data()["profile"]["lname"]
        );
        this.profileForm.controls["gender"].setValue(
          success[0].payload.doc.data()["profile"]["gender"]
        );
        this.profileForm.controls["dob"].setValue(
          success[0].payload.doc.data()["profile"]["dob"]
        );
        let obj = {
          name: success[0].payload.doc.data()["profile"]["country"]
        };
        this.selectedItems.push(obj);
        this.profileForm.controls["occupation"].setValue(
          success[0].payload.doc.data()["profile"]["occupation"]
        );
        this.profileForm.controls["description"].setValue(
          success[0].payload.doc.data()["profile"]["description"]
        );
        this.profileForm.controls["address"].setValue(
          success[0].payload.doc.data()["profile"]["address"]
        );
        this.userImage =
          success[0].payload.doc.data()["profile"]["image"] != ""
            ? "data:image/*;charset=utf-8;base64," +
              success[0].payload.doc.data()["profile"]["image"]
            : "data:image/*;charset=utf-8;base64,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";
        this.profileData = {
          value: {
            profileId: success[0].payload.doc.id,
            fname: success[0].payload.doc.data()["profile"]["fname"],
            lname: success[0].payload.doc.data()["profile"]["lname"],
            gender: success[0].payload.doc.data()["profile"]["gender"],
            dob: success[0].payload.doc.data()["profile"]["dob"],
            occupation: success[0].payload.doc.data()["profile"]["occupation"],
            description: success[0].payload.doc.data()["profile"][
              "description"
            ],
            address: success[0].payload.doc.data()["profile"]["address"]
          }
        };
      } else {
        this.userImage =
          "data:image/*;charset=utf-8;base64,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";
      }
    });
  }

  showactionSheet() {
    this.actionSheetController
      .create({
        header: "Change Profile Photo",
        buttons: [
          {
            text: "Remove Current Photo",
            role: "destructive",
            handler: () => {
              this.profileFormSubmit(this.profileData);
            }
          },
          {
            text: "Take Photo",
            handler: () => {
              this.openCamera("Take Photo");
            }
          },
          {
            text: "Choose from Library",
            handler: () => {
              this.openCamera("Choose from Library");
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

  openCamera(val: any) {
    if (val === "Take Photo") {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(options).then(
        imageData => {
          this.cropImage(imageData);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        allowEdit: true
      };
      this.camera.getPicture(options).then(
        imageData => {
          this.cropImage(imageData);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  cropImage(val: any) {
    this.crop
      .crop(val, { quality: 100 })
      .then(
        newImage => this.convertBase64(newImage),
        error => console.error("Error cropping image", error)
      );
  }

  convertBase64(val: any) {
    this.base64.encodeFile(val).then(
      (base64File: string) => {
        this.userImage = base64File;
        this.profileFormSubmit(this.profileData);
      },
      err => {
        console.log(err);
      }
    );
  }

  onSearch(evt: any) {
    this.itemList = [];
    this.http
      .get(
        "https://restcountries.eu/rest/v2/name/" +
          evt.target.value +
          "?fulltext=true"
      )
      .subscribe(
        res => {
          this.itemList = res;
        },
        error => {}
      );
  }

  profileFormSubmit(val: any) {
    val.value.country = this.selectedItems[0].name;
    val.value.image = this.userImage.replace(
      "data:image/*;charset=utf-8;base64,",
      ""
    );
    this.loader.showLoader();
    if (val.value.profileId === "") {
      this.apiService
        .addUser(val.value)
        .then((success: any) => {
          this.loader.hideLoader();
        })
        .catch(error => {
          this.loader.hideLoader();
          console.log("error", error);
        });
    } else {
      this.apiService
        .updateUser(val.value.profileId, val.value)
        .then((success: any) => {
          this.loader.hideLoader();
        })
        .catch(error => {
          this.loader.hideLoader();
          console.log("error", error);
        });
    }
  }
}
