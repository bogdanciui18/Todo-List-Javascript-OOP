//grab all elements
const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input");

class Storage {
    static addtostorage(todoArr) {
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }

    static getStorage() {
        let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
        return storage;
    }
}

//empty array
let todoArr = Storage.getStorage();

// form part
form.addEventListener("submit" , (e) => {
    e.preventDefault();
    let id = Math.random() * 1000000000;
    console.log(id);
    const todo = new Todo(id , input.value);
    console.log(todo);
    todoArr = [...todoArr, todo];
    UI.displayData();
    UI.clearInput();
    UI.removeTodo();
    UI.removeArrayTodo();
    //add to storage
    Storage.addtostorage(todoArr);
});
//preventDefault() - împiedica trimiterea formularului și reîncărcarea paginii,
// permițându-vă să gestionați logica formularului într-un mod personalizat


//make object instance
class Todo {
    constructor(id,todo) {
        this.id = id;
        this.todo = todo;
    }
}


//display the Todo in the DOM;
class UI {
    static displayData() {
        let displayData = todoArr.map((item) => {
            return `
            <div class="todo">
            <p>${item.todo}</p>
            <span class="remove" data-id = ${item.id}>X</span>
        </div>
            `
        });
lists.innerHTML = (displayData).join(" ");
    }
static clearInput() {
    input.value = "";
}
static removeTodo(){
    lists.addEventListener("click" , (e) => {
        if(e.target.classList.contains("remove")){
            e.target.parentElement.remove();
        }
        let btnId = e.target.dataset.id;
        //remove from array.
        UI.removeArrayTodo(btnId);
    })
}
static removeArrayTodo(id){
    todoArr = todoArr.filter((item) => item.id !== +id);
    Storage.addtostorage(todoArr);
}
}

window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    UI.removeTodo;
})

