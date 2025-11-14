// setup listener & get all existing todo from localStorage
function init() {
  // get the elements of my DOM
  const addBtn = document.getElementById("addBtn");
  const todoInput = document.getElementById("todoInput");
  const clearBtn = document.getElementById("clearBtn");

  

 

  // setup my event listeners
  addBtn.addEventListener("click", addTodo);
  clearBtn.addEventListener("click", clearTodos);

  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTodo();
    }
  });
  displayTodos();
}

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("Please enter a todo item.");
    return;
  }
  const todos = getTodosFromStorage();

  const newTodo = {
    id: Date.now(),
    text: todoText,
  };
  todos.push(newTodo);
  
  // Save back to localStorage
  localStorage.setItem("todos", JSON.stringify(todos));

  displayTodos();

  // Clear the input field
  todoInput.value = ""; 
}

// Iterate the todo's in the dom structure
function displayTodos() {
  console.log("displaying todo");
  // identify the placeholder as an element
  const todoList = document.getElementById("todoList");

  // get todo's from the localstorage
  const todos = getTodosFromStorage();
  console.log(todos);
  // clear the current list
  todoList.innerHTML = "";

  if (todos.length === 0) {
    // show empty message
    todoList.innerHTML =
      '<li class="list-group-item">No notes yet... write some</li>';
    return;
  } else {
    // iterate the array of todo's
    todos.forEach(function (todo) {
      // create the list item
      const li = document.createElement("li");
      li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

      const todoText = document.createElement("span");
      todoText.innerText = todo.text;

      const deleteBtn = document.createElement("button");
      // deleteBtn.innerHTML = '&times;';
      deleteBtn.classList.add("btn-close");
      deleteBtn.setAttribute("aria-label", "Delete todo");

      deleteBtn.addEventListener("click", function () {
        deleteTodo(todo.id);
      });

      li.appendChild(todoText);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }
}

function getTodosFromStorage() {
  // get the strings from localstorage
  const todosString = localStorage.getItem("todos");

  // if nothing is stores yet, return an empty array
  if (todosString === null) {
    return [];
  }

  // Parse  JSON string back into an array
  return JSON.parse(todosString);
}

function deleteTodo(id) {
  // get existing todo's from localstorage
  const todos = getTodosFromStorage();

  // filter out the todo with the given id
  const updatedTodos = todos.filter(function (todo) {
    return todo.id !== id;
  });
  // save the updated array back to localstorage
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  // refresh the displayed todo's
  displayTodos();
}

function clearTodos() {
  localStorage.removeItem("todos");
  displayTodos();
}








// Function to add todo's
// - get localstorage getten
// - parse
// - {new} -> add -> {existing}
// - string
// - set localstorage
// - refresh the data
// Function to delete todo's
// - get localstorage
// - filter all items except {deleted} in new {obj}
// - set localstorage
// - refresh the data
// Chilax and enjoy the weekend 😇

init();
