let hashtag = document.getElementById('addhashtag');
let hashtagection = document.getElementById('hashtagsection');

hashtag.addEventListener("click",function(){
    let input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("class", "hastags");
    input.setAttribute("name","hashtag");
    input.setAttribute("placeholder", "#tag");

    hashtagection.appendChild(input);
})

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
let userID, userEmail;

let fileURL, subject, ageRange, type, description;
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

    /////////////////////////////////////////////////////////
    //////////////////////docName to be chagned - to include timestamp
    docName = userID + userEmail + subject;

    //get the data that's uploaded in input="file" area
    const ref = firebase.storage().ref();

    const file = document.getElementById("pictures").files[0];
    const name = userID + "/" + subject + "-" + ageRange + "-" + type + "-"
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
