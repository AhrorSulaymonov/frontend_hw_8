// =========== Task Management ===========
const listOfTasks = document.getElementById("list-of-my-tasks");
const addBtn = document.getElementById("add");
const progress = document.getElementById("progress");

let currentView = "tasks";

let tasks = JSON.parse(localStorage.getItem("tasks_list")) || [];
let archived_tasks =
  JSON.parse(localStorage.getItem("archived_tasks_list")) || [];

const refreshStorage = () => {
  localStorage.setItem("tasks_list", JSON.stringify(tasks));
  localStorage.setItem("archived_tasks_list", JSON.stringify(archived_tasks));
};

const renderArchivedTasks = () => {
  let tasksList = "";
  let completedTasksCount = 0;

  listOfTasks.innerHTML = "";

  if (tasks.length === 0) {
    listOfTasks.innerHTML = `<div class="bg-slate-50 text-slate-400 font-bold rounded-xl shadow p-4 flex justify-center items-center">No Data</div>`;
    return;
  }

  archived_tasks.forEach((task) => {
    if (task.completed) completedTasksCount++;

    tasksList += `
            <div  class="${
              !task.completed ? "bg-white" : "bg-green-300"
            } rounded-xl shadow p-4 flex justify-between items-center">
                <p class="font-semibold ${
                  task.completed && "text-slate-500"
                }">${task.title}</p>
                <div class="flex gap-2">
                </div>
            </div>
        `;
  });

  listOfTasks.innerHTML = tasksList;
};

const renderTasks = () => {
  let tasksList = "";
  let completedTasksCount = 0;

  listOfTasks.innerHTML = "";

  if (tasks.length === 0) {
    listOfTasks.innerHTML = `<div class="bg-slate-50 text-slate-400 font-bold rounded-xl shadow p-4 flex justify-center items-center">No Data</div>`;
    return;
  }

  tasks.forEach((task) => {
    if (task.completed) completedTasksCount++;

    tasksList += `
            <div  class="${
              !task.completed ? "bg-white" : "bg-green-300"
            } rounded-xl shadow p-4 flex justify-between items-center">
                <p class="font-semibold ${
                  task.completed && "text-slate-500"
                }">${task.title}</p>
                <div class="flex gap-2">
                    ${
                      task.completed
                        ? `<button onclick="handleTaskClick('${task.id}')" class="cursor-pointer border bg-yellow-200 text-white border-slate-200 py-1 px-3 rounded shadow-sm">restart</button><button onclick="handleTaskClickArchive('${task.id}')" class="cursor-pointer border bg-slate-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">archived</button>`
                        : `<button onclick="handleTaskClick('${task.id}')" class="cursor-pointer border bg-green-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">done</button><button onclick="handleTaskClickEdit('${task.id}')" class="cursor-pointer border bg-blue-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">edit</button><button onclick="handleTaskClickDelete('${task.id}')" class="cursor-pointer border bg-red-400 text-white border-slate-200 py-1 px-3 rounded shadow-sm">delete</button>`
                    } 
                </div>
            </div>
        `;
  });

  listOfTasks.innerHTML = tasksList;
  progress.innerText = `${completedTasksCount}/${tasks.length} ~ ${Math.round(
    (completedTasksCount * 100) / tasks.length
  )}%`;
};

addBtn.addEventListener("click", () => {
  const newTask = {
    id: Date.now(),
    title: prompt("Title of the task:"),
    created_at: Date.now(),
    updated_at: Date.now(),
    completed: false,
    archived: false,
  };

  !!newTask.title ? tasks.push(newTask) : alert("Should be real title!");

  refreshStorage();
  renderTasks();
});

const handleTaskClick = (id) => {
  if (confirm("Are you sure?")) {
    tasks = tasks.map((task) => {
      if (task.id == id) {
        task.completed = !task.completed;
      }

      return task;
    });

    refreshStorage();
    renderTasks();
  }
};

const handleTaskClickDelete = (id) => {
  if (confirm("Are you sure?")) {
    console.log("id", id);

    tasks = tasks.filter((task) => task.id != id);
    console.log(tasks);
  }

  refreshStorage();
  renderTasks();
};

const handleTaskClickArchive = (id) => {
  if (confirm("Are you sure?")) {
    archived_tasks.push(tasks.filter((task) => task.id == id)[0]);
    tasks = tasks.filter((task) => task.id != id);
  }
  refreshStorage();
  renderTasks();
};

const handleTaskClickEdit = (id) => {
  const newTask = {
    title: prompt("Edited title of the task:"),
    updated_at: Date.now(),
  };

  if (!!newTask.title) {
    tasks = tasks.map((task) => {
      if (task.id == id) {
        task.title = newTask.title;
        task.updated_at = newTask.updated_at;
      }
      return task;
    });
  } else {
    alert("Should be real title!");
  }

  refreshStorage();
  renderTasks();
};

function switchView(view) {
  currentView = view;
  renderView();
}

function renderView() {
  if (currentView === "tasks") {
    renderTasks();
  } else if (currentView === "archived") {
    renderArchivedTasks();
  }
}

renderTasks();

document.cookie = "token=eyXdsnkjfnfkjngfkdjfnodwenjkndlfgnfdlkgnlkdn";

if (!document.cookie.includes("token")) {
  window.location.href = "/login";
}

// ========== Web Storages ==========
// const btn = document.getElementById("cleaner");
// const setObjectBtn = document.getElementById("set-object");
// const getObjectBtn = document.getElementById("get-object");

// localStorage.setItem("theme", "dark");
// localStorage.setItem("time", Date.now());

// localStorage.setItem("user", JSON.stringify({
//     name: "John Doe",
//     age: 16
// }));

// setObjectBtn.addEventListener("click", () => {
//     const nUser = {
//         name: prompt("User name"),
//         age: prompt("User age")
//     };

//     localStorage.setItem("user", JSON.stringify(nUser));
// })

// btn.addEventListener("click", () => {
//     localStorage.clear();
//     // localStorage.removeItem("theme");
// });

// getObjectBtn.addEventListener("click", () => {
//     const user = localStorage.getItem("user");
//     console.log(JSON.parse(user));

// })
