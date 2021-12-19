let userID, imgURL, subject, ageRange, type, description, timeStamp;

function passDataToDetail(cardId) {
    console.log(cardId);
    localStorage.setItem('documentId', cardId);
    window.location.assign("detail.html");
}


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userID = user.uid;
        console.log("hi");
        console.log(userID);

        db.collection("posts").where("UserID", "!=", userID)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    //creating HTML elements with the data retrieved
                    subject = doc.data().Subject;
                    console.log("Subject: " + subject);
                    // ageRange = doc.data().AgeRange;
                    // console.log("Age Range: " + ageRange);
                    // type = doc.data().Type;
                    // console.log("Type: " + type);
                    description = doc.data().Description;
                    console.log("Description: " + description);
                    imgURL = doc.data().StorageURL;
                    console.log(imgURL);
                    timeStamp = doc.data().Time;
                    console.log(timeStamp);
                    //Shik Added
                    cardId = doc.data().docName;
                    functionString = `passDataToDetail("${cardId}")`;
 
                    let a = document.createElement("a");
                    let div = document.createElement("div");
                    let listingImg = document.createElement("img");
                    let subjectLine = document.createElement("span");
                    let time = document.createElement("span");
                    // let age = document.createElement("span");
                    // let types = document.createElement("span");

                    //a.setAttribute("href", "./detail.html");
                    a.setAttribute("class", "listingcard");
                    //Shik Added
                    a.setAttribute("onclick", functionString);

                    listingImg.setAttribute("src", imgURL);
                    listingImg.setAttribute("class", "listingImg");
                    listingImg.setAttribute("alt", "Listing Image");

                    // a.setAttribute("target", "_blank");

                    div.setAttribute("class", "myCard");

                    subjectLine.innerHTML = subject;
                    subjectLine.setAttribute("class", "subjectLine");

                    time.innerHTML = timeStamp;
                    time.setAttribute("class", "postingTime");

                    // age.innerHTML = ageRange;
                    // age.setAttribute("class", "age_box");

                    // types.innerHTML = type; 
                    // types.setAttribute("class", "type_box");

                    document.querySelector(".main").append(a);
                    a.appendChild(div);
                    div.append(listingImg);
                    div.append(subjectLine);
                    div.append(time);
                    // div.append(age);
                    // div.append(types);
                })
            })

    } else {}
});