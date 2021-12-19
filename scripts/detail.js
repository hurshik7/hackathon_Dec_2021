let icon = document.getElementById("like-icon");
let count = 0;
icon.addEventListener("click", function(){
    if(count == 0){
        icon.style.color = "#cf7585";
        count = 1;
        console.log("Like");
    } else{
        icon.style.color = "#31393c";
        count = 0;
        console.log("Unlike");
    }
})

function showData() {
    let docIdFromLocal = localStorage.getItem("documentId");
    //console.log(docIdFromLocal);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            db.collection("posts").doc(docIdFromLocal).get()
            .then((currentItem) => {
                var post_time = currentItem.data().Time;
                var description = currentItem.data().Description;
                var item_type = currentItem.data().Type;
                var item_age = currentItem.data().AgeRange;
                var sto_url = currentItem.data().StorageURL;
                var item_subject = currentItem.data().Subject;
                var user_uid = currentItem.data().UserID;
                
                db.collection("users").doc(user_uid).get()
                .then((postingUser) => {
                    var user_name = postingUser.data().name;
                    var user_kandy = postingUser.data().kandy;

                    document.getElementsByClassName("user-kandy-count")[0].innerText = user_kandy;
                    document.getElementsByClassName("user-id")[0].innerText = user_name;
                })

                document.getElementsByClassName("item-image")[0].style.backgroundImage = `url(${sto_url})`;
                document.getElementsByClassName("time")[0].innerText = post_time;
                document.getElementsByClassName("subject")[0].innerText = item_subject;
                document.getElementsByClassName("item-type")[0].innerText = item_type;
                document.getElementsByClassName("age-range")[0].innerText = item_age;
                document.getElementsByClassName("description")[0].innerText = description;
            })
            
        }
    });   
}
showData();