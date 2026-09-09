/* =========================================
   TO-DO LIST APPLICATION
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

const validationMessage =
    document.getElementById("validationMessage");

const searchInput =
    document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const clearCompleted =
    document.getElementById("clearCompleted");

const themeToggle =
    document.getElementById("themeToggle");

const emptyState =
    document.getElementById("emptyState");

const emptyTitle =
    document.getElementById("emptyTitle");

const emptyText =
    document.getElementById("emptyText");

const totalTasks =
    document.getElementById("totalTasks");

const activeTasks =
    document.getElementById("activeTasks");

const completedTasks =
    document.getElementById("completedTasks");

const taskCount =
    document.getElementById("taskCount");


/* Modal elements */

const editModal =
    document.getElementById("editModal");

const editInput =
    document.getElementById("editInput");

const closeModal =
    document.getElementById("closeModal");

const cancelEdit =
    document.getElementById("cancelEdit");

const saveEdit =
    document.getElementById("saveEdit");


/* =========================================
   APPLICATION STATE
========================================= */

let tasks = [];

let currentFilter = "all";

let currentSearch = "";

let editingTaskId = null;


/* =========================================
   LOCAL STORAGE KEYS
========================================= */

const TASKS_STORAGE_KEY = "myTodoTasks";

const THEME_STORAGE_KEY = "myTodoTheme";


/* =========================================
   LOAD APPLICATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    loadTasks();

    loadTheme();

    renderTasks();

    taskInput.focus();

});


/* =========================================
   ADD TASK
========================================= */

function addTask() {

    const title = taskInput.value.trim();


    /* Prevent empty tasks */

    if (title === "") {

        showValidation("Please enter a task.");

        taskInput.focus();

        return;
    }


    /* Prevent duplicate tasks */

    const duplicateTask = tasks.some(task =>
        task.title.toLowerCase() === title.toLowerCase()
    );


    if (duplicateTask) {

        showValidation("This task already exists.");

        taskInput.focus();

        return;
    }


    /* Create new task object */

    const newTask = {

        id: Date.now(),

        title: title,

        completed: false,

        createdAt: new Date().toISOString()

    };


    /* Add task to beginning */

    tasks.unshift(newTask);


    /* Save */

    saveTasks();


    /* Reset input */

    taskInput.value = "";

    validationMessage.textContent = "";


    /* Render updated list */

    renderTasks();


    taskInput.focus();

}


/* =========================================
   DELETE TASK
========================================= */

function deleteTask(id) {

    const task = tasks.find(task => task.id === id);


    if (!task) {
        return;
    }


    const shouldDelete =
        confirm(`Delete "${task.title}"?`);


    if (!shouldDelete) {
        return;
    }


    tasks = tasks.filter(task => task.id !== id);


    saveTasks();

    renderTasks();

}


/* =========================================
   EDIT TASK
========================================= */

function editTask(id) {

    const task = tasks.find(task => task.id === id);


    if (!task) {
        return;
    }


    editingTaskId = id;

    editInput.value = task.title;

    editModal.classList.remove("hidden");

    editInput.focus();

    editInput.select();

}


/* =========================================
   SAVE EDITED TASK
========================================= */

function saveEditedTask() {

    const updatedTitle =
        editInput.value.trim();


    if (updatedTitle === "") {

        alert("Task title cannot be empty.");

        editInput.focus();

        return;
    }


    /* Check for duplicate */

    const duplicateTask = tasks.some(task =>
        task.id !== editingTaskId &&
        task.title.toLowerCase() ===
        updatedTitle.toLowerCase()
    );


    if (duplicateTask) {

        alert("Another task with this name already exists.");

        editInput.focus();

        return;
    }


    const task =
        tasks.find(task => task.id === editingTaskId);


    if (task) {

        task.title = updatedTitle;

        saveTasks();

        renderTasks();

        closeEditModal();

    }

}


/* =========================================
   TOGGLE TASK
========================================= */

function toggleTask(id) {

    const task = tasks.find(task => task.id === id);


    if (!task) {
        return;
    }


    task.completed = !task.completed;


    saveTasks();

    renderTasks();

}


/* =========================================
   RENDER TASKS
========================================= */

function renderTasks() {

    taskList.innerHTML = "";


    let filteredTasks = filterTasks();


    /* Search */

    if (currentSearch !== "") {

        filteredTasks =
            filteredTasks.filter(task =>
                task.title
                    .toLowerCase()
                    .includes(currentSearch.toLowerCase())
            );

    }


    /* Empty state */

    updateEmptyState(filteredTasks);


    /* Create task elements */

    filteredTasks.forEach(task => {

        const taskElement =
            createTaskElement(task);

        taskList.appendChild(taskElement);

    });


    updateTaskCount();

    updateStatistics();

}


/* =========================================
   CREATE TASK ELEMENT
========================================= */

function createTaskElement(task) {

    const li =
        document.createElement("li");


    li.className = "task-item";


    if (task.completed) {

        li.classList.add("completed");

    }


    /* Checkbox */

    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className = "task-checkbox";

    checkbox.checked = task.completed;

    checkbox.setAttribute(
        "aria-label",
        `Mark "${task.title}" as ${
            task.completed ? "active" : "completed"
        }`
    );


    checkbox.addEventListener("change", () => {

        toggleTask(task.id);

    });


    /* Content */

    const content =
        document.createElement("div");

    content.className = "task-content";


    const title =
        document.createElement("span");

    title.className = "task-title";

    title.textContent = task.title;


    const date =
        document.createElement("small");

    date.className = "task-date";

    date.textContent =
        `Created ${formatDate(task.createdAt)}`;


    content.appendChild(title);

    content.appendChild(date);


    /* Actions */

    const actions =
        document.createElement("div");

    actions.className = "task-actions";


    /* Edit button */

    const editButton =
        document.createElement("button");

    editButton.type = "button";

    editButton.className = "edit-btn";

    editButton.textContent = "✏️";

    editButton.title = "Edit task";

    editButton.setAttribute(
        "aria-label",
        `Edit "${task.title}"`
    );


    editButton.addEventListener("click", () => {

        editTask(task.id);

    });


    /* Delete button */

    const deleteButton =
        document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className = "delete-btn";

    deleteButton.textContent = "🗑️";

    deleteButton.title = "Delete task";

    deleteButton.setAttribute(
        "aria-label",
        `Delete "${task.title}"`
    );


    deleteButton.addEventListener("click", () => {

        deleteTask(task.id);

    });


    actions.appendChild(editButton);

    actions.appendChild(deleteButton);


    /* Assemble */

    li.appendChild(checkbox);

    li.appendChild(content);

    li.appendChild(actions);


    return li;

}


/* =========================================
   FILTER TASKS
========================================= */

function filterTasks() {

    switch (currentFilter) {

        case "active":

            return tasks.filter(task =>
                !task.completed
            );


        case "completed":

            return tasks.filter(task =>
                task.completed
            );


        case "all":

        default:

            return [...tasks];

    }

}


/* =========================================
   UPDATE FILTER
========================================= */

function setFilter(filter) {

    currentFilter = filter;


    filterButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.filter === filter
        );

    });


    renderTasks();

}


/* =========================================
   UPDATE TASK COUNT
========================================= */

function updateTaskCount() {

    const remaining =
        tasks.filter(task => !task.completed).length;


    if (remaining === 1) {

        taskCount.textContent =
            "1 task remaining";

    } else {

        taskCount.textContent =
            `${remaining} tasks remaining`;

    }

}


/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStatistics() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const active =
        total - completed;


    totalTasks.textContent = total;

    activeTasks.textContent = active;

    completedTasks.textContent = completed;

}


/* =========================================
   CLEAR COMPLETED
========================================= */

function clearCompletedTasks() {

    const completedCount =
        tasks.filter(task => task.completed).length;


    if (completedCount === 0) {

        return;

    }


    const shouldClear =
        confirm(
            `Remove ${completedCount} completed ${
                completedCount === 1 ? "task" : "tasks"
            }?`
        );


    if (!shouldClear) {
        return;
    }


    tasks =
        tasks.filter(task => !task.completed);


    saveTasks();

    renderTasks();

}


/* =========================================
   SEARCH TASKS
========================================= */

function searchTasks() {

    currentSearch =
        searchInput.value.trim();


    renderTasks();

}


/* =========================================
   EMPTY STATE
========================================= */

function updateEmptyState(filteredTasks) {

    if (filteredTasks.length > 0) {

        emptyState.style.display = "none";

        return;

    }


    emptyState.style.display = "block";


    if (tasks.length === 0) {

        emptyTitle.textContent =
            "No tasks yet";

        emptyText.textContent =
            "Add your first task and start organizing your day.";

        return;
    }


    if (currentSearch !== "") {

        emptyTitle.textContent =
            "No tasks found";

        emptyText.textContent =
            "Try searching for something else.";

        return;
    }


    if (currentFilter === "active") {

        emptyTitle.textContent =
            "No active tasks";

        emptyText.textContent =
            "Great job! You have no active tasks.";

        return;
    }


    if (currentFilter === "completed") {

        emptyTitle.textContent =
            "No completed tasks";

        emptyText.textContent =
            "Complete a task and it will appear here.";

        return;
    }

}


/* =========================================
   SAVE TASKS
========================================= */

function saveTasks() {

    localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(tasks)
    );

}


/* =========================================
   LOAD TASKS
========================================= */

function loadTasks() {

    try {

        const savedTasks =
            localStorage.getItem(TASKS_STORAGE_KEY);


        if (savedTasks) {

            tasks = JSON.parse(savedTasks);

        }

    } catch (error) {

        console.error(
            "Could not load tasks:",
            error
        );

        tasks = [];

    }

}


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);


    return date.toLocaleString(
        undefined,
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


/* =========================================
   VALIDATION MESSAGE
========================================= */

function showValidation(message) {

    validationMessage.textContent = message;


    setTimeout(() => {

        validationMessage.textContent = "";

    }, 3000);

}


/* =========================================
   THEME TOGGLE
========================================= */

function toggleTheme() {

    document.body.classList.toggle("dark-mode");


    const isDark =
        document.body.classList.contains("dark-mode");


    localStorage.setItem(
        THEME_STORAGE_KEY,
        isDark ? "dark" : "light"
    );


    updateThemeButton();

}


/* =========================================
   LOAD THEME
========================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(THEME_STORAGE_KEY);


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    updateThemeButton();

}


/* =========================================
   UPDATE THEME BUTTON
========================================= */

function updateThemeButton() {

    const isDark =
        document.body.classList.contains("dark-mode");


    if (isDark) {

        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.title =
            "Switch to light mode";

    } else {

        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.title =
            "Switch to dark mode";

    }

}


/* =========================================
   CLOSE EDIT MODAL
========================================= */

function closeEditModal() {

    editModal.classList.add("hidden");

    editingTaskId = null;

    editInput.value = "";

}


/* =========================================
   EVENT LISTENERS
========================================= */


/* Add task */

taskForm.addEventListener("submit", event => {

    event.preventDefault();

    addTask();

});


/* Search */

searchInput.addEventListener("input", searchTasks);


/* Filter buttons */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        setFilter(button.dataset.filter);

    });

});


/* Clear completed */

clearCompleted.addEventListener(
    "click",
    clearCompletedTasks
);


/* Theme */

themeToggle.addEventListener(
    "click",
    toggleTheme
);


/* Save edited task */

saveEdit.addEventListener(
    "click",
    saveEditedTask
);


/* Cancel edit */

cancelEdit.addEventListener(
    "click",
    closeEditModal
);


/* Close modal */

closeModal.addEventListener(
    "click",
    closeEditModal
);


/* Click outside modal */

editModal.addEventListener("click", event => {

    if (event.target === editModal) {

        closeEditModal();

    }

});


/* Enter key inside edit box */

editInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        event.preventDefault();

        saveEditedTask();

    }


    if (event.key === "Escape") {

        closeEditModal();

    }

});


/* Escape closes modal */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        !editModal.classList.contains("hidden")
    ) {

        closeEditModal();

    }

});