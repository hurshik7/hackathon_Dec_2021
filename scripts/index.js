// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        var user = authResult.user;
        if (authResult.additionalUserInfo.isNewUser) {
          db.collection("users").doc(user.uid).set({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            city: "need to set",
            postcode: "need to set",
            kandy: 0
          });
          db.collection("likes").doc(user.uid).set({
            likeMap: {},
            count: 0,
            likeMapKey: 0,
          })
          .then(function () {
            console.log("Complete! new user data setup");
            window.location.assign("home.html");
          })
          .catch(function (error) {
            console.log("Error creating new user data " + error);
          });
        } else {
          return true;
        }
        return false;
      },
      uiShown: function() {
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'home.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);