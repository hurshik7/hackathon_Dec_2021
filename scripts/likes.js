let userID, imgURL, subject, ageRange, type, description, timeStamp;

function passDataToDetail(cardId) {
    console.log(cardId);
    localStorage.setItem('documentId', cardId);
    window.location.assign("detail.html");
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userID = user.uid;

        db.collection("likes").doc(user.uid).get()
        .then((snap) => {
            var li = snap.data().likeList;
            //console.log(li);
            for (let i = 0; i < li.length; i++) {
                let postId = li[i];
                db.collection("posts").doc(postId).get()
                .then((doc) => {
                    subject = doc.data().Subject;
                    //console.log("Subject: " + subject);
  
                    description = doc.data().Description;
                    //console.log("Description: " + description);
                    imgURL = doc.data().StorageURL;
                    //console.log(imgURL);
                    timeStamp = doc.data().Time;
                    //console.log(timeStamp);
                    let cardId = doc.data().docName;
                    let functionString = `passDataToDetail("${cardId}")`;
 
                    let a = document.createElement("a");
                    let div = document.createElement("div");
                    let listingImg = document.createElement("img");
                    let subjectLine = document.createElement("span");
                    let time = document.createElement("span");
                    a.setAttribute("class", "listingcard");
                    a.setAttribute("onclick", functionString);

                    listingImg.setAttribute("src", imgURL);
                    listingImg.setAttribute("class", "listingImg");
                    listingImg.setAttribute("alt", "Listing Image");

                    div.setAttribute("class", "myCard");

                    subjectLine.innerHTML = subject;
                    subjectLine.setAttribute("class", "subjectLine");

                    time.innerHTML = timeStamp;
                    time.setAttribute("class", "postingTime");

                    document.querySelector(".main").append(a);
                    a.appendChild(div);
                    div.append(listingImg);
                    div.append(subjectLine);
                    div.append(time);
                })
            }
        })
    } else {}
});