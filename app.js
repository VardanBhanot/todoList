const addForm = document.forms["add-form"];
const list = document.querySelector(".list ul");
let tasks = [];

if (localStorage.getItem("taskArray")) {
  tasks = JSON.parse(localStorage.getItem("taskArray"));
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let val = addForm.querySelector('input[type="text"]').value;
  let status = false;
  let priority = addForm.querySelector("select").value;
  if (val == "") {
    alert("Anter something in the input");
  } else {
    tasks.push({ val, priority, status });
    localStorage.setItem("taskArray", JSON.stringify(tasks));
    refresh();
  }
});
taskList();

function taskList() {
  const ul = document.querySelector(".list ul");
  if (tasks != null) {
    let position = 0;
    Array.from(tasks).forEach((task) => {
      let li = document.createElement("li");
      let taskTitle = document.createElement("span");
      let deleteBtn = document.createElement("button");
      let checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.checked= task.status;
      //console.log(task);
      taskTitle.textContent = task.val;
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete");
      deleteBtn.setAttribute("type", "button");
      li.classList.add("grid");
      li.setAttribute("position", position++);
      if(task.status == true){
        taskTitle.style.textDecoration = "line-through";
        li.style.color = "rgb(192,192,192)";
      }
      li.appendChild(checkBox);
      li.appendChild(taskTitle);
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    });
  }
}

list.addEventListener("click", (e) => {
  if (e.target.className == "delete") {
    const li = e.target.parentElement;
    let index = li.attributes.position.value;
    //console.log(index);
    if (index > -1) {
      tasks.splice(index, 1);
      localStorage.setItem("taskArray", JSON.stringify(tasks));
    }
    refresh();
  }
});

function refresh() {
  while (list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }
  addForm.querySelector('input[type="text"]').value = "";
  taskList();
}
changeBackgroundImg();

function changeBackgroundImg() {
  let now = new Date();
  let time = now.getHours();
  //console.log(time);
  let header = document.querySelector("#header");
  let body = document.querySelector("#main");
  //console.log(body);
  if (time >= 19) {
    header.style.background = 'url("./try.jpg")';
    body.style.background = "rgb(15,124,145)";
  } else if (time < 19) {
    header.style.background = 'url("./sun.jpg")';
    body.style.background = "#FFF";
  }
}



// mark complete, line through
list.addEventListener("change", (e) => {
  let li = e.target.parentElement;
  let span = li.querySelector("span");
  let index = li.attributes.position.value;
  if (e.target.checked == true) {
    span.style.textDecoration = "line-through";
    li.style.color = "rgb(192,192,192)";
    tasks[index].status = true;
    if (index > -1) {
      localStorage.setItem("taskArray", JSON.stringify(tasks));
    }
    refresh();
  } else if (e.target.checked == false) {
    span.style.textDecoration = "none";
    li.style.color = "black";
    tasks[index].status = false;
    if (index > -1) {
      localStorage.setItem("taskArray", JSON.stringify(tasks));
    }
    refresh();
  }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((reg) => console.log("service worker registered", reg))
    .catch((err) => console.log("service worker not regeistered", err));
}
