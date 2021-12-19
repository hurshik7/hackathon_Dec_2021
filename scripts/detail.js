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