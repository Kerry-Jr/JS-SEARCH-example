'use strict'

// read existing todos
const getSavedTodos =  () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : []
  } catch (e) {
    return []
  }  
}


//remove to do by id

const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id)
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1)
  }
}

const toggleTodo = function (id) {
  const todo = todos.find((todo) => todo.id === id)
  if(todo){
    todo.completed = !todo.completed
    console.log(todo)
  }
}

// saving new notes into localStorage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// render todos to the page from localStorge
const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter(function (todo) {
    const searchTextMatch = todo.text
       .toLowerCase()
       .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch &&  hideCompletedMatch;
  });

  document.querySelector("#todos").innerHTML = "";


  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);


  document
     .querySelector("#todos")
     .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach((todo) => {
    document.querySelector("#todos").appendChild(generateTodoDOM(todo));
  });
};

const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('div')
  const checkbox = document.createElement('input')
  const todoText = document.createElement('span')
  const removeButton = document.createElement('button')
  checkbox.setAttribute('type', 'checkbox')
  todoEl.appendChild(checkbox)

  checkbox.checked = todo.completed
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  todoText.textContent = todo.text
  todoEl.appendChild(todoText)


  // setup the remove button
  removeButton.textContent = 'Remove'
  todoEl.appendChild(removeButton)
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })
  return todoEl
};

const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};
