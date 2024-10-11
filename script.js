let selectedDay = "monday";
let editingTaskIndex = 0;
updateTodoList();

function getTodoTasks() {
  const tasks = localStorage.getItem("todoTaskList");
  return tasks ? JSON.parse(tasks) : [];
}

function saveTodoTasks(data) {
  localStorage.setItem("todoTaskList", JSON.stringify(data));
}

// Darbo sukūrimo mygtuko funkcija
function addNewTodoTask() {
  const inputElement = document.querySelector("#newTaskInput").value;
  const selectInputElement = document.querySelector("#assingListOption").value;

  if (inputElement === "") {
    alert("Įveskite kokį darbą norite pridėti");
    return;
  }

  if (selectInputElement === "default") {
    alert("Pasirinkite kuriai dienai norite priskirti");
    return;
  }

  const todoTask = {
    taskName: inputElement,
    taskTodoDate: selectInputElement,
    taskIsDone: false,
  };

  const todoTaskListStorage = getTodoTasks();
  todoTaskListStorage.push(todoTask);
  saveTodoTasks(todoTaskListStorage);
  updateTodoList();
}

// Savaitės dienos pasirinkimas
function selectDay(day, dayText, element) {
  const weekListElements = document.querySelectorAll(".weekListElement");
  const selectedDayText = document.querySelector(".selectedDayText");
  selectedDay = day;
  weekListElements.forEach((element) => {
    element.classList.remove("active");
  });

  element.classList.add("active");

  selectedDayText.innerHTML = `${dayText} užduotys:`;

  updateTodoList();
}

// Atnaujinti sąraša į HTML
function updateTodoList() {
  const listContainer = document.querySelector(".listContainer");
  const todoTaskList = JSON.parse(localStorage.getItem("todoTaskList"));

  if (todoTaskList !== null) {
    let html = ``;
    listContainer.innerHTML = "";

    todoTaskList.map((item, index) => {
      if (selectedDay === item.taskTodoDate) {
        html += `
          <div class="todo">
              <article class="${item.taskIsDone ? "taskDone" : ""}">
                  <input type="checkbox" onclick="markAsDoneTask(${index})" ${
          item.taskIsDone ? "checked" : ""
        }/>
                  <span>${item.taskName}</span>
              </article>
  
              <div class="btnContainer">
                  <button onclick="editTodoTask(${index})">
                  <i class="fa-solid fa-pen-to-square blue"></i>
                  </button>
                  <button onclick="deleteTodoTask(${index})"><i class="fa-solid fa-trash red"></i></button>
              </div>
            </div>
          `;
      }
    });

    listContainer.innerHTML = html;
  }
}

function markAsDoneTask(id) {
  const todoTaskList = getTodoTasks();

  todoTaskList[id].taskIsDone = !todoTaskList[id].taskIsDone;

  saveTodoTasks(todoTaskList);
  updateTodoList();
}

function editTodoTask(id) {
  const editContainer = document.querySelector(".editContainer");
  editContainer.style.display = "flex";

  const todoTaskList = getTodoTasks();

  if (id < 0 || id >= todoTaskList.length) {
    return;
  }

  const taskToEdit = todoTaskList[id];

  const editInput = document.querySelector("#editInputVal");
  const assingListOption = document.querySelectorAll(
    "#editAssingListOption > option"
  );

  editInput.value = taskToEdit.taskName;

  assingListOption.forEach((element) => {
    if (element.value === taskToEdit.taskTodoDate) {
      element.selected = true;
    } else {
      element.selected = false;
    }
  });

  editingTaskIndex = id;
}

function deleteTodoTask(id) {
  const todoTaskList = getTodoTasks();
  const index = todoTaskList.findIndex((obj, index) => index === id);
  if (index !== -1) {
    todoTaskList.splice(index, 1);
    saveTodoTasks(todoTaskList);
    updateTodoList();
  }
}

function saveEdit() {
  const updatedTaskName = document.querySelector("#editInputVal").value;
  const updatedTaskDate = document.querySelector("#editAssingListOption").value;

  if (updatedTaskName === "") {
    alert("Įveskite užduoties pavadinimą");
    return;
  }

  if (updatedTaskDate === "default") {
    alert("Parinkite užduoties prisikirimo laiką");
    return;
  }

  const todoTaskList = getTodoTasks();

  todoTaskList[editingTaskIndex].taskName = updatedTaskName;
  todoTaskList[editingTaskIndex].taskTodoDate = updatedTaskDate;

  saveTodoTasks(todoTaskList);
  updateTodoList();
  closeEditTodoTask();
}

function closeEditTodoTask() {
  const editContainer = document.querySelector(".editContainer");
  editContainer.style.display = "none";
}
