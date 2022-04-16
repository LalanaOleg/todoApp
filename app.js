'use strict';

const todoInput = document.querySelector('.tasks__input');
const todoButton = document.querySelector('.tasks__btn');
const todoList = document.querySelector('.tasks__list');
const filter = document.querySelector('.filter');

// =================================== //

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheacked);
filter.addEventListener('click', filterTodo);

// =================================== //

function addTodo(event) {

   // ! prevent form from submiting :
   event.preventDefault();

   // CHECKING IF INPUT IS EMPTY :
   if (todoInput.value.trim() == '') {
      const form = document.getElementById('form');
      form.classList.add('errorInput');

      // CHECK IF INPUT CONTAINS CHARACTERS
      todoInput.oninput = () => {
         if (todoInput.value.trim() != '') {
            form.classList.remove('errorInput')
         }
      }
   } else {
      // /TODO DIV :
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo')

      // Create LI :
      const newTodo = document.createElement('li');
      newTodo.classList.add('todo__item');
      newTodo.innerText = todoInput.value;
      todoDiv.appendChild(newTodo);

      // CHEACKED BUTTON :
      const buttonCheacked = document.createElement('button');
      buttonCheacked.innerHTML = `<i class="fa-solid fa-check"></i>`;
      buttonCheacked.classList.add('cheacked-btn');
      todoDiv.appendChild(buttonCheacked);

      // DELETE BUTTON :
      const buttonDelete = document.createElement('button');
      buttonDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`;
      buttonDelete.classList.add('delete-btn');
      todoDiv.appendChild(buttonDelete);

      // ADDING TO TasksList :
      todoList.appendChild(todoDiv);
      setTimeout(() => todoDiv.classList.add('created'), 10)

      // CLEAR TODOINPUT VALUE :
      todoInput.value = '';
   }
}

function deleteCheacked(e) {
   const item = e.target;

   // DELETE TODO :
   if (item.classList[0] === 'delete-btn') {
      const todo = item.parentElement;
      // ANIMATION :
      todo.classList.add('deleting');
      setTimeout(() => todo.remove(), 900);
   }

   // CHEACK TASKS :
   if (item.classList[0] === 'cheacked-btn') {
      const todo = item.parentElement;
      todo.classList.toggle('completed')
   }
}

function filterTodo(e) {
   const todos = todoList.childNodes;
   todos.forEach(function (todo) {
      const mStyle = todo.style;
      if (mStyle != undefined && mStyle != null) {
         switch (e.target.value) {
            case "all":
               todo.classList.remove('deleting');
               todo.classList.add('created');
               break;
            case "completed":
               if (todo.classList.contains('completed')) {
                  todo.classList.remove('deleting');
                  todo.classList.add('created');
               } else {
                  todo.classList.remove('created');
                  todo.classList.add('deleting');
               }
               break;
            case "uncompleted":
               if (todo.classList.contains('completed')) {
                  todo.classList.remove('created');
                  todo.classList.add('deleting');
               }
               else {
                  todo.classList.remove('deleting');
                  todo.classList.add('created');
               }
               break;
         }
      }
   })
}