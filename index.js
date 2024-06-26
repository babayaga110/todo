const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".input");
const clearCompleted = document.getElementById("clearCompleted");
const unFilter = document.getElementById("unFilter");
const activeFilter = document.getElementById("activeFilter");
const completedFilter = document.getElementById("completedFilter");
const listLenght = document.getElementById("listLenght");
let todoArray = [];
let nextTodoId = 1;

const generateTodoId = () => nextTodoId++;

const addCheckboxListeners = () => {
  document.querySelectorAll(".todo-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const todoId = parseInt(checkbox.id.split("todoCheckbox")[1]);
      const todo = todoArray.find((t) => t.id === todoId);
      if (todo) {
        todo.completed = event.target.checked;
        renderTodo(todoArray);
      }
    });
  });
  document.querySelectorAll(".delete").forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const todoId = parseInt(
        deleteButton.previousElementSibling
          .querySelector("input")
          .id.split("todoCheckbox")[1]
      );
      todoArray = todoArray.filter((todo) => todo.id !== todoId);
      renderTodo(todoArray);
    });
  });
};

todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && todoInput.value.trim() !== "") {
    todoArray.push({
      id: generateTodoId(),
      text: todoInput.value,
      completed: false,
    });
    todoInput.value = "";
    renderTodo(todoArray);
  }
});

clearCompleted.addEventListener("click", () => {
  todoArray = todoArray.filter((todo) => !todo.completed);
  renderTodo(todoArray);
});

unFilter.addEventListener("click", () => {
  removeActiveTodo();
  unFilter.classList.add("footer-active");
  renderTodo(todoArray);
});

activeFilter.addEventListener("click", () => {
  removeActiveTodo();
  activeFilter.classList.add("footer-active");
  renderTodo(todoArray.filter((todo) => !todo.completed));
});

completedFilter.addEventListener("click", () => {
  removeActiveTodo();
  completedFilter.classList.add("footer-active");
  renderTodo(todoArray.filter((todo) => todo.completed));
});

document.querySelector(".mode-btn").addEventListener("click", () => {
  const html = document.querySelector("html");
  if (html.getAttribute("data-color-scheme") === "light") {
    html.setAttribute("data-color-scheme", "dark");
    document.querySelector(".mode-btn").src = "assets/icon-moon.svg";
  } else {
    html.setAttribute("data-color-scheme", "light");
    document.querySelector(".mode-btn").src = "assets/icon-sun.svg";
  }
});

const todoHTML = (todo) => {
  return `<div class="todo">
              <div class="todo-left">
                  <label for="todoCheckbox${todo.id}" class="checkbox ${
    todo.completed ? "active-todo" : ""
  }">
                      <img src="assets/icon-check.svg" alt="Check" class="check">
                      <input type="checkbox" id="todoCheckbox${
                        todo.id
                      }" class="todo-checkbox" ${
    todo.completed ? "checked" : ""
  } aria-label="Mark todo as ${todo.completed ? "incomplete" : "complete"}">
                  </label>
                  <p class="todo-text">${todo.text}</p>
              </div>
              <img src="assets/icon-cross.svg" alt="Delete" class="delete" aria-label="Delete todo">
          </div>`;
};

const renderTodo = (todoData) => {
  const todosHTML = todoData.map((todo) => todoHTML(todo)).join("");
  todoList.innerHTML = todosHTML;
  listLenght.textContent = todoData.length;
  addCheckboxListeners();
};

const removeActiveTodo = () => {
  document.querySelectorAll(".footer-active").forEach((footer) => {
    footer.classList.remove("footer-active");
  });
};

renderTodo(todoArray);
