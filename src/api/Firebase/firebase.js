import * as app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCOHqX_I8tCXBGWQmLwnExa62tz8m4ua9I",
  authDomain: "classconnect-9045d.firebaseapp.com",
  databaseURL: "https://upe-website-fa07a.firebaseio.com",
  projectId: "classconnect",
  storageBucket: "classconnect.appspot.com",
  messagingSenderId: "337392650612",
  appId: "1:337392650612:web:2ed7dc77874341a7cec421",
  measurementId: "G-VYVYWCQLP1",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.firestore = app.firestore();
    this.storage = app.storage();
    this.functions = app.functions();
  }

  // *** Auth API ***

  doSignInWithToken = (token) => this.auth.signInWithCustomToken(token);

  doSignOut = () => this.auth.signOut();

  // *** Merge Auth and DB User API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(async (snapshot) => {
            if (snapshot.exists) {
              const dbUser = snapshot.data();
              if (!dbUser.hasOwnProperty("roles")) {
                dbUser.roles = {
                  guest: true,
                };
                await this.user(authUser.uid).update(dbUser);
              }

              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                emailVerified: authUser.emailVerified,
                providerData: authUser.providerData,
                ...dbUser,
              };

              next(authUser);
            } else {
              const dbUser = {
                roles: {
                  guest: true,
                },
              };

              this.user(authUser.uid)
                .set(dbUser)
                .then(() => {
                  authUser = {
                    uid: authUser.uid,
                    email: authUser.email,
                    emailVerified: authUser.emailVerified,
                    providerData: authUser.providerData,
                    ...dbUser,
                  };

                  next(authUser);
                });
            }
          })
          .catch(console.error);
      } else {
        fallback();
      }
    });

  // *** Users API ***
  
  user = (uid) => this.firestore.doc(`users/${uid}`);

  getIdToken = () => {
    if (this.auth.currentUser) return this.auth.currentUser.getIdToken();
    else return new Promise((resolve) => resolve(null));
  };

  // *** Functions API ***

  callFun = (funName) => this.functions.httpsCallable(funName);
}

export default Firebase;