const actualBtn = document.getElementById('pictures');
const fileChosen = document.getElementById('file-chosen');

actualBtn.addEventListener('change', function(){
    console.log(this.files[0]);
    for(let i = 0 ; i < this.files.length; i++){
        if(i == 0){
            fileChosen.innerHTML = this.files[i].name;
        }
        else {
            fileChosen.innerHTML += ', ' +  this.files[i].name;
        }
    }
})

let currentUser;
let userID, userEmail, userName;

let fileURL, subject, ageRange, type, description, timeStamp;
let docName;
const myListings = db.collection("posts");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userID = user.uid;
        userEmail = user.email;
    } else {}
});

//when a user clicks submit to upload a test result
function submit() {

    //store the value entered in each area
    subject = document.getElementById("subject").value;
    console.log(subject);
    ageRange = document.getElementById("ageRange").value;
    console.log(ageRange);
    type = document.getElementById("newOrUsed").value;
    console.log(type);
    description = document.getElementById("description").value;
    console.log(description);
    timeStamp = new Date().toString();
    
    //"Sat Dec 18 2021 16:35:33 GMT-0800 (Pacific Standard Time)"
    let timeArr = timeStamp.split(" ");

    // for (let i = 0; i < 5; i++){
    //     if (i == 0){
    //         timeStamp = timeArr[i];
    //     }
    //     else {
    //         timeStamp += "-" + timeArr[i];
    //     }
    // }

    timeStamp = timeArr[1] + " " + timeArr[2] + ", " + timeArr[3] + " " + timeArr[4];

    docName = userID + timeStamp + subject;

    //get the data that's uploaded in input="file" area
    const ref = firebase.storage().ref();

    const file = document.getElementById("pictures").files[0];
    const name = userID + "/" + timeStamp + "/" + subject + "-" + ageRange + "-" + type + "-"
        file.name;
    const metadata = {
        contentType: file.type
    };

    //store the file in firebase storage
    const task = ref.child(name).put(file, metadata);
    task
        //get the URL to the file storage
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            fileURL = url;

            //create a document under the collection "testResults" including the URL
            return myListings.doc(docName).set({
                UserID: userID,
                FileName: file.name,
                UserEmail: userEmail,
                Subject: subject,
                AgeRange: ageRange,
                Type: type,
                Description: description,
                StorageURL: fileURL,
                docName: docName,
                Time: timeStamp,
                StoragePath: name
            })
        })
        .then(() => {
            alert("Upload Completed");
        })
        .then(() => {
            //reload the page to get the test results appear immediately
            location.reload();
        })
        .catch(console.error);

}
