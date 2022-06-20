//storage management
if (localStorage.getItem("id") == null) {
  localStorage.setItem("id", "0");
}

//for display task
const parent = document.querySelector(".list");

let id = localStorage.getItem("id");

for (let i = 1; i <= id; i++) {
  let str = i.toString();
  let txt = localStorage.getItem(str);
  if (txt != null) create(txt, i);
}

const input = document.querySelectorAll(".input");
const task = document.querySelectorAll(".task");
const i = document.querySelectorAll("i");
const trash = document.querySelectorAll(".fa-trash-can");

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("change", () => {
    if (input[i].checked) {
      task[i].classList.add("marked");
      let str = "ismarked-" + (i + 1);

      localStorage.setItem(str, "true");
    } else {
      task[i].classList.remove("marked");
      let str = "ismarked-" + (i + 1);

      localStorage.setItem(str, "false");
    }
  });
}

for (let i = 0; i < trash.length; i++) {
  console.log(trash);
  trash[i].addEventListener("click", () => {
    let str = (i + 1).toString();
    localStorage.removeItem(str);
    let y = "ismarked-" + (i + 1);
    localStorage.removeItem(y);
    arrange();
    location.reload();
  });
}

const btn = document.querySelector(".btn");
const create_content = document.querySelector(".create_content");
const close_btn = document.querySelector(".close-btn");
const submit_btn = document.querySelector(".submit-btn");
const new_content = document.querySelector("#new_content");

//for marked done

//for adding new task

btn.addEventListener("click", () => {
  create_content.style.display = "flex";
});

close_btn.addEventListener("click", () => {
  create_content.style.display = "none";
});

submit_btn.addEventListener("click", () => {
  if (new_content.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Input field can not be empty!",
    });
  } else {
    create(new_content.value, -1);
    let id = Number(localStorage.getItem("id"));
    localStorage.setItem(++id, new_content.value);
    localStorage.setItem("id", id);
    create_content.style.display = "none";
    location.reload();
  }
});

function create(text, i) {
  let list_item = document.createElement("li");
  list_item.classList.add("list-item");
  let inp = document.createElement("input");
  inp.classList.add("input");
  inp.setAttribute("type", "checkbox");
  inp.setAttribute("title", "Mark as done!");
  list_item.appendChild(inp);
  let p = document.createElement("p");
  p.classList.add("task");
  p.textContent = text;

  //is marked test
  if (i != -1) {
    let str = "ismarked-" + i;
    if (localStorage.getItem(str) == "true") {
      p.classList.add("marked");
      inp.checked = "true";
    }
  }

  list_item.appendChild(p);
  let icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-trash-can");
  icon.setAttribute("title", "Delete Task!");
  list_item.appendChild(icon);
  parent.appendChild(list_item);
}

function arrange() {
  let n = 1;
  let id = Number(localStorage.getItem("id"));
  for (let i = 1; i <= id; i++) {
    if (localStorage.getItem(i) != null) {
      let text = localStorage.getItem(i);
      localStorage.removeItem(i);
      localStorage.setItem(n, text);
      let str = "ismarked-" + i;
      let y = "ismarked-" + n;
      if (localStorage.getItem(str) == "true") {
        localStorage.removeItem(str);
        localStorage.setItem(y, "true");
      } else {
        localStorage.removeItem(str);
        localStorage.setItem(y, "false");
      }
      n++;
    }
  }
  n--;
  localStorage.setItem("id", n);
}

///for header section

let tp = document.querySelector(".top");
let bottom = document.querySelector(".bottom");
let total_task = document.querySelector(".total_task");

if (id == 0 || id == 1) {
  total_task.textContent = `${id} task`;
} else {
  total_task.textContent = `${id} tasks`;
}

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
tp.textContent = `${weekday[date.getDay()]} ,${date.getDate()}`;
bottom.textContent = month[date.getUTCMonth()];
