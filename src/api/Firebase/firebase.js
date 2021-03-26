class Firebase {
  constructor(app, config) {
    if (!config) throw new Error("No Firebase config given!");
	
    app.initializeApp(config);
    this.auth = app.auth();
    this.firestore = app.firestore();
  }

  // *** Auth API ***
  doSignInWithToken = (token) => this.auth.signInWithCustomToken(token);

  doSignOut = () =>
    this.auth.signOut().then(() => localStorage.removeItem("authUser"));

  getIdToken = () => {
    if (this.auth.currentUser) return this.auth.currentUser.getIdToken();
    else return new Promise((resolve) => resolve(null));
  };

  // *** Merge Auth and DB User API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(async (snapshot) => {
            if (snapshot.exists) {
              const dbUser = snapshot.data();
              // eslint-disable-next-line no-prototype-builtins
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

  // *** User API ***
  user = (uid) => this.firestore.doc(`users/${uid}`);
  users = () => this.firestore.collection("users");
}

let firebase;
let firebaseClass = Firebase;
export const getFirebase = (app) => {
  if (!firebase) {
    firebase = new firebaseClass(app);
  }

  return firebase;
};

export const setFirebaseClass = (newClass) => {
  firebaseClass = newClass;
};

export default Firebase;