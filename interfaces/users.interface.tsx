export interface User {
    // _redirectEventId: undefined,
    // apiKey: string; // AIzaSyDIdS3XaXBPJvyNCHud,
    // appName: string;
    createdAt?: number//1548559763000,
    displayName?: string ;// Aaron Rabinowitz,
    email?: string;
    emailVerified?: boolean; // true,
    // isAnonymous: boolean; //false,
    lastLoginAt?: number; //1707271654856,
    phoneNumber?: string;
    photoURL?: string; // https://lh3.googleusercontent.com/-A8WzK0bEn54/AAAAAAAAAAI/AAAAAAAABa4/vC-rROD6s4U/photo.jpg,
    // providerData: [Array
    // ],
    // stsTokenManager: [Object
    // ],
    // tenantId: undefined,
    uid: string; //vjjoExOv8hU1vhgAP;
    userType?: string;
}
export interface classIdWithGroupId {
  classUid: string;
  displayName?: string;
  // a board Id can contain different info for a board such as notices
  groupUid?: string;
}

export interface Student extends User {
    firstName: string;
    lastName: string;
    teacherUids: Array<string>;
    classes: Array<classIdWithGroupId>;
  }

export  interface Teacher extends User {
    firstName: string;
    lastName: string;
    classes: Array<classIdWithGroupId>;
  }




  // "user": {
  //   "_redirectEventId": undefined,
  //   "apiKey": "AIzaSyDIdS3XaXBPJvyNCHud",
  //   "appName": "[DEFAULT]",
  //   "createdAt": "1548559763000",
  //   "displayName": "Aaron Rabinowitz",
  //   "email": 
  //   "emailVerified": true,
  //   "isAnonymous": false,
  //   "lastLoginAt": "1707271654856",
  //   "phoneNumber": undefined,
  //   "photoURL": "https://lh3.googleusercontent.com/-A8WzK0bEn54/AAAAAAAAAAI/AAAAAAAABa4/vC-rROD6s4U/photo.jpg",
  //   "providerData": [Array
  //   ],
  //   "stsTokenManager": [Object
  //   ],
  //   "tenantId": undefined,
  //   "uid": "vjjoExOv8hU1vhgAP"
// }