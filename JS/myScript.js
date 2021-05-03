var errorToastr = (errorMessage = "", errorTitle = "") => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-center",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "500",
    timeOut: "3000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr["error"](errorMessage, errorTitle);
};

var showTasks = () => {
  let todotask = localStorage.getItem("todoTasks");
  if (todotask == null) {
    //alert("todoTasks null");
    document.getElementById("noTaskTitle").classList.remove("displayTask");
    document.getElementById("addedTaskList").classList.add("displayTask");
    document
      .getElementsByClassName("hr-two")[0]
      .classList.add("hr-displayNone");
  } else {
    tasksObj = JSON.parse(todotask);
    let htmlCode = "";
    htmlCode = `<i class="fas fa-dumpster text-danger delete-all" type='button'> Delete All</i>`;
    tasksObj.forEach((item, index) => {
      if (item.complete_status == true) {
        htmlCode += `<div class='row todoList'><div class='col-1'>${
          index + 1
        }</div>
        <div class='col-8 text-success'>${item.task_name}</div>
        <div class='col-1'><i class="fas fa-undo" onclick='undoneItem(${index})' type='button'></i></div>
        <div class='col-1'></div>
        <div class='col-1'><i class="fas fa-trash-alt text-danger" onclick='deleteItem(${index})'></i></div></div>`;
      } else {
        htmlCode += `<div class='row todoList'><div class='col-1'>${
          index + 1
        }</div>
        <div class='col-8'>${item.task_name}</div>
        <div class='col-1'><i class="fas fa-check text-success" onclick='doneItem(${index})'></i></div>
        <div class='col-1'><i class="fas fa-edit text-warning" onclick='editItem(${index})'></i></div>
        <div class='col-1'><i class="fas fa-trash-alt text-danger" onclick='deleteItem(${index})'></i></div></div>`;
      }
    });
    document.getElementById("addedTaskList").innerHTML = htmlCode;
    document
      .getElementsByClassName("delete-all")[0]
      .addEventListener("click", deleteAllItems);
    if (tasksObj.length == 0) {
      localStorage.removeItem("todoTasks");
      document
        .getElementsByClassName("hr-two")[0]
        .classList.add("hr-displayNone");
      document.getElementById("noTaskTitle").classList.remove("displayTask");
      document.getElementById("addedTaskList").classList.add("displayTask");
      //alert(tasksObj.length);
    } else {
      document
        .getElementsByClassName("hr-two")[0]
        .classList.remove("hr-displayNone");
      document.getElementById("noTaskTitle").classList.add("displayTask");
      document.getElementById("addedTaskList").classList.remove("displayTask");
    }
  }
};

function deleteAllItems() {
  let todoTask = localStorage.getItem("todoTasks");
  if (todoTask != null) {
    localStorage.removeItem("todoTasks");
    showTasks();
  }
}

function editItem(Index) {
  let todotask = localStorage.getItem("todoTasks");
  let tasksObj = JSON.parse(todotask);
  document.getElementById("addTask").innerHTML = "";
  document.getElementById("addTask").innerHTML =
    "<i id='unique' class='far fa-save fa-2x'></i>";
  document.getElementsByClassName("fa-save")[0].classList.add("fa-save-green");
  document.getElementById("taskInput").value = "";
  document.getElementById("taskInput").value = tasksObj[Index]["task_name"];
  //document.getElementById("addTask").removeEventListener("click", addTask);
  document
    .getElementsByClassName("fa-save")[0]
    .addEventListener("click", function () {
      if (document.getElementById("taskInput").value.trim() != 0) {
        tasksObj.forEach((item, index) => {
          if (index == Index) {
            tasksObj[index]["task_name"] = "";
            tasksObj[index]["task_name"] = document.getElementById(
              "taskInput"
            ).value;
          }
        });
        localStorage.setItem("todoTasks", JSON.stringify(tasksObj));
        document.getElementById("taskInput").value = "";
        document.getElementById("addTask").innerHTML = "";
        document.getElementById("addTask").innerHTML =
          "<i id='unique' class='fas fa-2x fa-plus'></i>";
        document
          .getElementsByClassName("fa-plus")[0]
          .classList.add("fa-plus-red");
        document
          .getElementsByClassName("fa-plus")[0]
          .addEventListener("click", addTask);
        showTasks();
      } else {
        errorToastr("Please edit the Task", "Blank Input");
      }
    });
}

function doneItem(Index) {
  let todoTask = localStorage.getItem("todoTasks");
  let tasksObj = JSON.parse(todoTask);
  tasksObj.forEach((item, index) => {
    if (index == Index) {
      item.complete_status = true;
      //alert("changed to true for " + index);
    }
  });
  localStorage.setItem("todoTasks", JSON.stringify(tasksObj));
  showTasks();
}

function undoneItem(Index) {
  let todoTask = localStorage.getItem("todoTasks");
  let tasksObj = JSON.parse(todoTask);
  tasksObj.forEach((item, index) => {
    if (index == Index) {
      item.complete_status = false;
    }
  });
  localStorage.setItem("todoTasks", JSON.stringify(tasksObj));
  showTasks();
}

function addTask() {
  let taskInputValue = document.getElementById("taskInput").value;
  //alert(taskInputValue);
  if (taskInputValue.trim() != 0) {
    let todoTask = localStorage.getItem("todoTasks");
    if (todoTask == null) {
      tasksObj = [];
    } else {
      tasksObj = JSON.parse(todoTask);
    }
    tasksObj.push({ task_name: taskInputValue, complete_status: false });
    localStorage.setItem("todoTasks", JSON.stringify(tasksObj));
    document.getElementById("taskInput").value = "";
    showTasks();
    checkInput();
  } else {
    errorToastr("Please enter a Task", "Blank Input");
  }
}

function deleteItem(index) {
  let todotask = localStorage.getItem("todoTasks");
  let tasksObj = JSON.parse(todotask);
  tasksObj.splice(index, 1);
  localStorage.setItem("todoTasks", JSON.stringify(tasksObj));
  showTasks();
}

function checkInput() {
  let taskInputValue = document.getElementById("taskInput").value;
  if (taskInputValue.trim() == 0) {
    if (
      document.getElementById("unique").classList.contains("fa-save") &&
      document
        .getElementsByClassName("fa-save")[0]
        .classList.contains("fa-save-green")
    ) {
      document
        .getElementsByClassName("fa-save")[0]
        .classList.remove("fa-save-green");
      document
        .getElementsByClassName("fa-save")[0]
        .classList.add("fa-save-red");
    } else if (
      document.getElementById("unique").classList.contains("fa-plus") &&
      document
        .getElementsByClassName("fa-plus")[0]
        .classList.contains("fa-plus-green")
    ) {
      document
        .getElementsByClassName("fa-plus")[0]
        .classList.remove("fa-plus-green");
      document
        .getElementsByClassName("fa-plus")[0]
        .classList.add("fa-plus-red");
    }
  } else {
    if (
      document.getElementById("unique").classList.contains("fa-save") &&
      document
        .getElementsByClassName("fa-save")[0]
        .classList.contains("fa-save-red")
    ) {
      document
        .getElementsByClassName("fa-save")[0]
        .classList.remove("fa-save-red");
      document
        .getElementsByClassName("fa-save")[0]
        .classList.add("fa-save-green");
    } else if (
      document.getElementById("unique").classList.contains("fa-plus") &&
      document
        .getElementsByClassName("fa-plus")[0]
        .classList.contains("fa-plus-red")
    ) {
      document
        .getElementsByClassName("fa-plus")[0]
        .classList.remove("fa-plus-red");
      document
        .getElementsByClassName("fa-plus")[0]
        .classList.add("fa-plus-green");
    }
  }
}

function toggleValues() {
  if (document.getElementById("mode").classList.contains("btnL")) {
    document.getElementById("mode").classList.add("logo-dm");
    document.getElementById("mode").classList.remove("btnL");
    document.getElementById("mode").classList.add("btnD");
    document.getElementById("mode").innerHTML =
      "<i class='fas fa-sun fa-3x'></i>";
    document.body.classList.add("bodyBG-dm");
    document.body.classList.remove("bodyBG");
    var logo = document.getElementsByClassName("btnLogo");
    for (var i = 0; i < logo.length; ++i) {
      logo[i].classList.remove("black-icon");
      logo[i].classList.add("logo-dm");
    }
    document.getElementById("inputRow").classList.remove("input-row");
    document.getElementById("inputRow").classList.add("input-row-dm");
    document.getElementById("taskInput").classList.add("taskInput-dm");
    document.getElementsByClassName("hr-one")[0].classList.add("hr-one-dm");
    document.getElementsByClassName("hr-two")[0].classList.add("hr-two-dm");
  } else if (document.getElementById("mode").classList.contains("btnD")) {
    document.getElementById("mode").classList.remove("logo-dm");
    document.getElementById("mode").classList.remove("btnD");
    document.getElementById("mode").classList.add("btnL");
    document.getElementById("mode").innerHTML =
      "<i class='fas fa-moon fa-3x'></i>";
    document.body.classList.remove("bodyBG-dm");
    document.body.classList.add("bodyBG");
    var logo = document.getElementsByClassName("btnLogo");
    for (var i = 0; i < logo.length; ++i) {
      logo[i].classList.remove("logo-dm");
      logo[i].classList.add("black-icon");
    }
    document.getElementById("inputRow").classList.remove("input-row-dm");
    document.getElementById("inputRow").classList.add("input-row");
    document.getElementById("taskInput").classList.remove("taskInput-dm");
    document.getElementsByClassName("hr-one")[0].classList.remove("hr-one-dm");
    document.getElementsByClassName("hr-two")[0].classList.remove("hr-two-dm");
  }
}

window.onload = function () {
  showTasks();
  document.getElementById("addTask").innerHTML =
    "<i id='unique' type='button' class='fas fa-2x fa-plus'></i>";
  document
    .getElementsByClassName("fa-plus")[0]
    .addEventListener("click", addTask);
  document.getElementsByClassName("fa-plus")[0].classList.add("fa-plus-red");
  document.getElementById("mode").innerHTML =
    "<i class='fas fa-moon fa-3x'></i>";
  document.getElementById("mode").classList.add("btnL");
  document.getElementById("mode").onclick = toggleValues;
  document.addEventListener("contextmenu", (event) => event.preventDefault());
};
