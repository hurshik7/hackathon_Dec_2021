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