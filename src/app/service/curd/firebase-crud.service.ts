import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { AngularFirestore } from "@angular/fire/firestore";
import { Platform } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: "root"
})
export class FirebaseCRUDService {
  constructor(
    private firestore: AngularFirestore,
    private platform: Platform,
    public http: HttpClient
  ) {}

  /**
   * Create New Schedule
   * @param record Form Data
   */
  create_NewSchedule(record) {
    return this.firestore.collection("schedules").add(record);
  }

  /**
   * Read All Schedule
   */
  read_Schedule() {
    return this.firestore.collection("schedules").snapshotChanges();
  }

  /**
   * Update Schedule
   * @param recordID Schedule ID
   * @param record Form Data
   */
  update_Schedule(recordID, record) {
    return this.firestore.doc("schedules/" + recordID).update(record);
  }

  /**
   * Delete Schedule
   * @param record_id Schedule ID
   */
  delete_Schedule(record_id) {
    this.firestore.doc("schedules/" + record_id).delete();
  }

  /**
   *
   * @param value Register Form Data
   */
  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  /**
   *
   * @param value Login Form Data
   */
  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          })
          .catch(error => {
            reject();
          });
      }
    });
  }

  /**
   *
   * @param email User Email
   */
  forgotPassword(email: any) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email);
  }

  registerToken_data(val_userID: any) {
    return this.firestore
      .collection("notification")
      .doc(val_userID)
      .set({ token: localStorage.getItem("notificationToken") });
  }

  readToken() {
    return this.firestore.collection("notification").snapshotChanges();
  }
  /**
   *
   * @param record Users value
   */
  addUser(record) {
    return this.firestore
      .collection("users")
      .doc(localStorage.getItem("userID"))
      .collection("Profile")
      .add({ profile: record });
  }

  /**
   *
   * @param recordId Profile ID
   * @param record
   */
  updateUser(recordId, record) {
    return this.firestore
      .collection("users")
      .doc(localStorage.getItem("userID"))
      .collection("Profile")
      .doc(recordId)
      .set({ profile: record });
  }

  /**
   * Read User Profile data
   */
  read_Users() {
    return this.firestore
      .collection("users")
      .doc(localStorage.getItem("userID"))
      .collection("Profile")
      .snapshotChanges();
  }

  /**
   * Create / Update New Appointment in Sender/Receiver
   * @param randomNum Unique Id
   * @param record Form Data
   */
  addAppointment(userID: any, randomNum: any, record: any) {
    return this.firestore
      .collection("users")
      .doc(userID)
      .collection("Appoint")
      .doc(randomNum.toString())
      .set(record);
  }

  /**
   * Read All Appointment
   */
  readAppointment() {
    return this.firestore
      .collection("users")
      .doc(localStorage.getItem("userID"))
      .collection("Appoint")
      .snapshotChanges();
  }

  /**
   * Delete Sepecific Appointment in Sender/Receiver
   */
  deleteAppointment(userID: any, record_id: any) {
    this.firestore
      .collection("users")
      .doc(userID)
      .collection("Appoint")
      .doc(record_id)
      .delete();
  }

  checkPlatform() {
    if (this.platform.is("android") === true) {
      return "android";
    } else if (this.platform.is("ios") === true) {
      return "ios";
    } else {
      return "browser";
    }
  }

  sendNotification(val1: any,val_type: any,body: any) {
    const passData = {
      to: val1.payload.doc.data()["token"],
      data: {
        title: "Appointment",
        body: body,
        sound: "default",
        badge: "1",
        type: val_type
      }
    };
    this.http
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
