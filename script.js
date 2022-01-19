const addTaskBnt = document.getElementById('add-task-button');
const deskTaskInput = document.getElementById('input-task');
const todosWrapper = document.getElementById('task-list');

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
    <li class="todo-item ${task.completed ? 'checked' : ''}">
        <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task">${task.description}</span>
        <button onclick="deleteTask(${index})" class="delete-btn">X</button>
    </li>
    `
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if (taskList.length > 0) {
        taskList.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

const completeTask = (index) => {
    taskList[index].completed = !taskList[index].completed;
    /*if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }*/
    updateLocal();
    fillHtmlList();
}

const deleteTask = (index) => {
    taskList.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

addTaskBnt.addEventListener('click', () => {
    taskList.push(new Task(deskTaskInput.value));
    deskTaskInput.value = '';
    updateLocal();
    fillHtmlList();
})
