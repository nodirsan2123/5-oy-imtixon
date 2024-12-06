let btn1 = document.getElementById("btn1")
let btn2 = document.getElementById("btn2")
let btn3 = document.getElementById("btn3")

let img1 = document.getElementById("img1")
let img2 = document.getElementById("img2")
let img3 = document.getElementById("img3")
let img4 = document.getElementById("img4")

function change1(){
   img1.classList.remove("hidden")
   img2.classList.add("hidden") 
   img3.classList.add("hidden")
   img4.classList.add("hidden")

}

function change2(){
   img1.classList.add("hidden")
   img2.classList.remove("hidden")
   img3.classList.add("hidden")
   img4.classList.add("hidden")

   
}


function change3(){
   img1.classList.add("hidden")
   img2.classList.add("hidden") 
   img3.classList.remove("hidden")
   img4.classList.add("hidden")

}