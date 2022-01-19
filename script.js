const addTaskBnt = document.getElementById('add-task-button');
const deskTaskInput = document.getElementById('input-task');
const todosWrapper = document.getElementById('task-list');

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

let todoItemElems = []; //массив, который хранит в себе все таски из HTML

function Task(description) {
    this.description = description; //создаем объект с текстом из поля ввода и статусом завершения
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
    todosWrapper.innerHTML = ""; //обнуляем список дел на странице
    if (taskList.length > 0) { //если массив не пустой, то пробегаем по нему и из каждого элемента создаем блок HTML
        taskList.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');//обновляем массив, фиксирующий всё, что есть в HTML
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(taskList)); //закидываем массив в JSON
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
    taskList.push(new Task(deskTaskInput.value)); //создаем новый элемент массива на основе функции Task
    deskTaskInput.value = ''; //очищаем строку ввода
    updateLocal(); //обновляем локальное хранилище
    fillHtmlList(); //обновляем HTML
})


// const inputField = document.getElementById("input-task");
// const button = document.getElementById("add-task-button");
// const taskList = document.getElementById("task-list");
//
// button.addEventListener("click", function (event) {
//     if (inputField.value !== "") {
//         event.preventDefault();
//         const newRow = document.createElement("li");
//         /*newRow.nodeName = inputField.value;*/
//         taskList.appendChild(newRow);
//         const checkBox = document.createElement("input");
//         checkBox.type = "checkbox";
//         newRow.appendChild(checkBox);
//         const taskContent = document.createElement("span");
//         taskContent.className = "task";
//         taskContent.innerHTML = inputField.value;
//         newRow.appendChild(taskContent);
//         const deleteButton = document.createElement("button");
//         deleteButton.className = "delete-btn";
//         deleteButton.innerHTML = 'X';
//         newRow.appendChild(deleteButton);
//         deleteButton.addEventListener("click", function (e) {
//             deleteButton.parentElement.remove();
//         });
//     }
//     inputField.value = null;
// });
