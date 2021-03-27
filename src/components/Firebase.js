import { Firebase as FirebaseSuper } from "../api/";

const config = {
  apiKey: "AIzaSyCOHqX_I8tCXBGWQmLwnExa62tz8m4ua9I",
  authDomain: "classconnect-9045d.firebaseapp.com",
  projectId: "classconnect",
  storageBucket: "classconnect.appspot.com",
  messagingSenderId: "337392650612",
  appId: "1:337392650612:web:2ed7dc77874341a7cec421",
  measurementId: "G-VYVYWCQLP1",
};

class Firebase extends FirebaseSuper {
  constructor(app) {
    super(app.default, config);
  }
}
export default Firebase;
