// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBrV-qx58KnQVavJ0_YHBYGLF9vUBMiMgc',
    authDomain: 'appointment-c91be.firebaseapp.com',
    databaseURL: 'https://appointment-c91be.firebaseio.com',
    projectId: 'appointment-c91be',
    storageBucket: 'appointment-c91be.appspot.com',
    messagingSenderId: '931767616401',
    // appId: '1:931767616401:web:35962ac35014a740'
  },
  notificationURL: "https://fcm.googleapis.com/fcm/send"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
