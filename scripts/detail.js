let icon = document.getElementById("like-icon");
let is_like_global = false;

function fillLikeIcon() {
    icon.style.color = "#cf7585";
    is_like_global = true;
}

function unfillLikeIcon() {
    icon.style.color = "#31393c";
    is_like_global = false;
}

function addItemToLikeList() {
    let docIdFromLocal = localStorage.getItem("documentId");
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            userLikesCol = db.collection("likes").doc(user.uid);
            userLikesCol.update({
                likeList: firebase.firestore.FieldValue.arrayUnion(docIdFromLocal)
            });
        }
    });
}

function deleteItemFromLikeList() {
    let docIdFromLocal = localStorage.getItem("documentId");
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            userLikesCol = db.collection("likes").doc(user.uid);
            userLikesCol.update({
                likeList: firebase.firestore.FieldValue.arrayRemove(docIdFromLocal)
            });
        }
    });
}

icon.addEventListener("click", function(){
    if(is_like_global == false){
        fillLikeIcon();
        addItemToLikeList();
    } else {
        unfillLikeIcon();
        deleteItemFromLikeList();
    }
})

function showData() {
    let docIdFromLocal = localStorage.getItem("documentId");
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
                var userLikes = db.collection("likes").doc(user_uid);
                userLikes.get().then((likes) => {
                    var likesList = likes.data();
                    for (let i = 0; i < likesList.likeList.length; i++) {
                        if (likesList.likeList[i] == docIdFromLocal) {
                            fillLikeIcon();
                            console.log("found!");                        }
                    }
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
