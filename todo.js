let menu = document.querySelector(".menuspan");
let mainmenu = document.querySelector(".menu");
let activity = document.querySelector(".activity");

//hiding and showing of Dashboard on clicking on menu icon
menu.addEventListener("click", () => {
  let computedDisplay = window.getComputedStyle(mainmenu).display;
  if (computedDisplay === "none") {
    mainmenu.style.display = "block";
    activity.style.marginLeft = "2%";
  } else {
    mainmenu.style.display = "none";
    activity.style.marginLeft = "10%";
  }
});

//hiding and showing of filtering features
let filter = document.querySelector(".filter");
let filteritems = document.querySelector(".filteritems");
filter.addEventListener("click", () => {
  let computedDisplay = window.getComputedStyle(filteritems).display;
  if(computedDisplay === "none")filteritems.style.display = "block";
  else filteritems.style.display = "none";
});

//opening of landing.html by home 
document.querySelector(".home").addEventListener("click", function openOrFocusPage() {
   window.open("landing.html", "firstWindow");
  }
);

//using current date and showing it in short format (using "new Date()" & .toLocaleString)
const d = new Date();
const dateStr = d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
const [month, day] = dateStr.split(' ');
const formatted = `${month}<br>${day}`;
document.querySelector(".date").innerHTML = formatted;

//show and hide input tab by clicking on "add icon"
let addimg = document.querySelector(".addtask img");
let add = document.querySelector(".add");
addimg.addEventListener("click",()=>{
    let computedDisplay = window.getComputedStyle(add).display;
    if(computedDisplay === "none"){add.style.display = "block";
        document.querySelector(".inputtask").focus();
    }
    else add.style.display = "none";
});

//showing tasks if already present in local storage
let list = document.querySelector(".list");
(function (){
    const storedData = JSON.parse(localStorage.getItem("tasks")) || [];
    storedData.forEach((ele) => {
    let newli = document.createElement("li");
    newli.classList.add("item");
    newli.innerHTML = `<img src="items/checkbox.png" alt="" class="firstimg"><img src="items/check-circle.svg" alt="" class="secondimg">${ele} <img src="items/delete.png" alt="" class="thirdimg">`;
    list.appendChild(newli);
    });
})();

//adding task in "ul" by submitting in input tag (by mouse click as well as pressing enter)
    //This line ensures that dataLS is always in sync with what's stored in localStorage, even after a refresh. If not synced then dataLS becomes empty after refresh no matter what is in LS
let dataLS = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("complete")) || [];
let submit = document.querySelector(".add button");
let inp = document.querySelector(".inputtask");
let fun = function(){   // parameter "e" also not required
    //e.preventDefault();  //need in case of form not in my case where i used only input tag
 const val = inp.value.trim();
     //showing alert if no data is written and submit is clicked
 if(val === "")alert("Empty values can't be submitted! Please provide some data.");
 else if(dataLS.includes(val)){
    alert("Task already present!");
 }
 else{
    addDataToLS(val);
    let newli = document.createElement("li");
    newli.classList.add("item");
    newli.innerHTML = `<img src="items/checkbox.png" alt="" class="firstimg"><img src="items/check-circle.svg" alt="" class="secondimg">${val} <img src="items/delete.png" alt="" class="thirdimg">`;
    list.appendChild(newli);
    inp.value = "";
    inp.focus();
 }   
}
submit.addEventListener("click",fun);
inp.addEventListener("keypress",function(e){
    if(e.key === "Enter")fun();
});

//adding tasks to local storage
function addDataToLS(d){
    dataLS.push(d);
    localStorage.setItem("tasks",JSON.stringify(dataLS));
}

//adding comppletedTasks to local storage
function addCompleteToLS(d){
    completedTasks.push(d);
    localStorage.setItem("complete",JSON.stringify(completedTasks));
}

//tick mark on checkbox
//we have used concept of event delegation here
list.addEventListener("click", (e)=>{
    if(e.target.matches(".firstimg")){
        e.target.style.display = "none";
        const parentLi = e.target.parentElement;
        addCompleteToLS(parentLi.innerText);
        const secImg = parentLi.querySelector(".secondimg");
        secImg.style.display = "block";
    }
    else if(e.target.matches(".secondimg")){
        e.target.style.display = "none";
        const parentLi = e.target.parentElement;
        removeCompletefromLS(parentLi.innerText);
        const secImg = parentLi.querySelector(".firstimg");
        secImg.style.display = "block";
    }
    else if(e.target.matches(".thirdimg")){
        let parentLi = e.target.parentElement;
        removeFromLS(parentLi.innerText);
        removeCompletefromLS(parentLi.innerText);
        parentLi.remove();
    }
});

//remove from localStorage 
function removeFromLS(val){
    let storedData = JSON.parse(localStorage.getItem("tasks")) || [];
    storedData = storedData.filter(ele => ele !== val);
    dataLS = storedData;
    localStorage.setItem("tasks",JSON.stringify(dataLS));
    if(dataLS.length == 0)localStorage.removeItem("tasks");
}

//remove completeTasks from LS
function removeCompletefromLS(val){
    let storedData = JSON.parse(localStorage.getItem("complete")) || [];
    storedData = storedData.filter(ele => ele !== val);
    completedTasks = storedData;
    localStorage.setItem("complete",JSON.stringify(completedTasks));
    if(completedTasks.length == 0)localStorage.removeItem("complete");
}

//prevents tasks checkbox changing on refreshing the page
(function (){
    let itemslist = document.querySelectorAll(".item") || [];
    let completeTa = JSON.parse(localStorage.getItem("complete")) || [];
    if(itemslist.length !== 0){
        itemslist.forEach((ele) => {
            if(completeTa.includes(ele.innerText)){
                ele.querySelector(".firstimg").style.display = "none";
                ele.querySelector(".secondimg").style.display = "block";
            }
        });
    };
}());
