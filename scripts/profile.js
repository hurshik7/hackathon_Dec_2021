// insert inforamtion to the page and modal
function insertInfo() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then((userDoc) => {
                var user_name = userDoc.data().name;
                var user_email = userDoc.data().email;
                var user_city = userDoc.data().city;
                var user_postcode = userDoc.data().postcode;
                var user_kandy = userDoc.data().kandy;

                document.getElementById("email").innerText = user_email;
                document.getElementById("name").innerText = user_name;
                document.getElementById("city").innerText = user_city;
                document.getElementById("post-code").innerText = user_postcode;
                document.getElementById("kandy").innerText = user_kandy;

                document.getElementById("modal-name").setAttribute("value", user_name);
                document.getElementById("modal-city").setAttribute("value", user_city);
                document.getElementById("modal-post-code").setAttribute("value", user_postcode);
            })
        }
    })
}
insertInfo();

// save edited information
function saveEditedInfo() {
    var editedName = document.getElementById("modal-name").value;
    var editedCity = document.getElementById("modal-city").value;
    var editedPostcode = document.getElementById("modal-post-code").value;

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.update({
                name: editedName,
                city: editedCity,
                postcode: editedPostcode
            })
            .then( function() {
                console.log("edit information success!");
                window.location.assign("profile.html");
            })
            .catch(function (error) {
                console.log("Error editing information " + error);
            });
        } else {
            console.log("no logged in user");
        }
    })
}

//set up event listener
var saveButton = document.querySelector("#save-btn");
saveButton.addEventListener("click", saveEditedInfo);
