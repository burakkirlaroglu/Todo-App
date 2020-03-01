// Tüm elementleri seçmek
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstcardBody = document.querySelectorAll(".card-body")[0];
const secondcardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearbtn = document.querySelector("#clear-todos");

eventListener();
// Tüm event listener lar
function eventListener(){ 
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondcardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearbtn.addEventListener("click",clearAllTodos);
    // console.log(form);
}

function clearAllTodos(e){
    if(confirm("Hepsi silinecek emin misin ?")){
        //Arayüzden todoları silmek
        // todoList.innerHTML=""; //Yavaş çalışıyor.
        while(todoList.firstElementChild != null){
                todoList.removeChild(todoList.firstElementChild);            
        }
        localStorage.removeItem("todos");
        showAlert("warning","Tüm todo lar silindi");
        
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
            //Bulamadı 
            listItem.setAttribute("style","display: none !important"); //bootsrap yüzünden important kullanmak lazım baskılıyor çünkü
        }else{
            listItem.setAttribute("style", "display: block");
        }
    });
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Başarıyla silindi.");
    }
    // console.log(e.target);
}

function deleteTodoFromStorage(todo,index){
    let todos = getTodosFromStorage();

    todos.forEach(function(deleteTodo){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    // console.log(newTodo);
    const listItems = document.querySelectorAll(".list-group-item");

    if(newTodo === listItems.forEach(function(listItem){
        if(newTodo === listItem.textContent){
            showAlert("warning",`${newTodo}'nun Aynısından var`);
        }
    })){   
    }
    else if(newTodo === ""){
        showAlert("danger","Lütfen bir todo girin...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success",`${newTodo} Başarılı bir şekilde oluştu.`);
    }
    e.preventDefault();
}

function getTodosFromStorage(){ //Storage ye kaydetmiş oldu.
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
   let todos = getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));
}
    
function showAlert(type,message){
    const newTodo = todoInput.value.trim();
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.role = "alert";
    alert.innerHTML = "<strong>Hata oluştu!</strong>";
    alert.textContent = `${message}`;

    // console.log(alert);
    firstcardBody.appendChild(alert);

    //SetTimeout

    window.setTimeout(function () {
        alert.remove();
    },2000);
    
}


function addTodoToUI(newTodo){ //String değerini list item olarak ekleyecek
    //list item oluşturma
    const listItem = document.createElement("li");
    //link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    
    listItem.className = "list-group-item d-flex justify-content-between";

    //text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //todolist e listitem ekleme
    todoList.appendChild(listItem);
    todoInput.value = "";
    
    
    // console.log(listItem);
}

