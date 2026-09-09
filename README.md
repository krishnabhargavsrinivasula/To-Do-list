# ✨ My To-Do List

A modern, responsive, and user-friendly **To-Do List web application** built using **HTML5, CSS3, and Vanilla JavaScript**.

The application helps users organize their daily tasks by allowing them to add, edit, complete, search, filter, and delete tasks. Tasks and theme preferences are saved using the browser's **Local Storage**, so the data remains available even after refreshing the page.

## 🚀 Features

* ➕ Add new tasks
* ⌨️ Add tasks using the Enter key
* ✏️ Edit existing tasks
* ✅ Mark tasks as completed
* 🗑️ Delete individual tasks
* 🔍 Search tasks
* 📋 Filter tasks:

  * All
  * Active
  * Completed
* 🧹 Clear all completed tasks
* 📊 Task statistics:

  * Total tasks
  * Active tasks
  * Completed tasks
* ⏱️ Task creation date and time
* 🌙 Dark mode / Light mode
* 💾 Local Storage support
* 🚫 Prevent duplicate tasks
* 📱 Fully responsive design
* ♿ Keyboard-friendly and accessible interface
* ✨ Smooth animations and transitions
* 📝 Professional empty-state message

## 🛠️ Technologies Used

* **HTML5** – Structure and semantic elements
* **CSS3** – Styling, responsive design, animations, and themes
* **JavaScript** – Application logic and interactivity
* **Local Storage** – Persistent task and theme data

## 📂 Project Structure

```text
To-Do-list/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 💡 How It Works

### Adding a Task

Enter a task in the input field and click **Add Task**.

You can also press **Enter** to add the task.

Empty tasks and duplicate tasks are not allowed.

### Completing a Task

Click the checkbox next to a task to mark it as completed.

Completed tasks are displayed with a line-through effect and reduced opacity.

### Editing a Task

Click the ✏️ button next to a task.

An edit window will appear where you can modify the task and save the changes without refreshing the page.

### Deleting a Task

Click the 🗑️ button to delete an individual task.

A confirmation message is displayed before the task is removed.

### Filtering Tasks

Use the filter buttons to display:

* **All** – Shows every task
* **Active** – Shows incomplete tasks
* **Completed** – Shows completed tasks

### Searching Tasks

Use the search box to quickly find a task by its title.

### Dark Mode

Click the 🌙 / ☀️ button to switch between light and dark mode.

The selected theme is saved in Local Storage.

## 💾 Local Storage

The application uses the browser's `localStorage` to store tasks.

Example task structure:

```javascript
{
    id: 123456789,
    title: "Complete assignment",
    completed: false,
    createdAt: "2026-09-09T17:30:00.000Z"
}
```

Tasks are converted to JSON before being stored in Local Storage.

This means tasks remain available after:

* Refreshing the page
* Closing the browser
* Reopening the application

The selected light/dark theme is also saved.

## 📱 Responsive Design

The application is designed to work across different screen sizes:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

The layout automatically adapts to smaller screens for a better user experience.

## 🎨 UI/UX

The application follows a modern minimal design approach with:

* Rounded cards
* Subtle shadows
* Clear typography
* Smooth transitions
* Hover effects
* Focus states
* Accessible controls
* Responsive layouts
* Light and dark themes

## ▶️ How to Run

No installation or additional software is required.

1. Download or clone this repository.
2. Open the project folder.
3. Double-click `index.html`.
4. The application will open in your web browser.

## 🌐 Live Demo

You can add your GitHub Pages URL here after deploying the project:

```text
https://YOUR-USERNAME.github.io/To-Do-list/
```

## 📸 Project Preview

Add a screenshot of your application here after taking one:

```markdown
![To-Do List Screenshot](screenshot.png)
```

## 🔮 Future Improvements

Possible future additions include:

* 📅 Task due dates
* 🔔 Task reminders
* 🎯 Task priorities
* 🏷️ Task categories
* 📆 Calendar view
* Drag-and-drop task ordering
* Export and import tasks
* Multiple task lists

## 👨‍💻 Author

**Srinivasula Rama Krishna Bhargav**

Student & Web Development Enthusiast

## 📄 License

This project currently does not include a specific open-source license.
