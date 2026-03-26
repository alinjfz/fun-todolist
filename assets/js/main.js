/**
 * Fun To-Do List
 * Vanilla JS · localStorage persistence
 * Author: Ali Najafzadeh
 */

const STORAGE_KEY = 'fun-todo-items';

const form       = document.getElementById('todo-form');
const input      = document.getElementById('todo-input');
const list       = document.getElementById('todo-list');
const footer     = document.getElementById('todo-footer');
const itemsLeft  = document.getElementById('items-left');
const clearBtn   = document.getElementById('clear-completed');

// ── State ────────────────────────────────────────────────────────────────────

/** @type {{ id: number, text: string, completed: boolean }[]} */
let todos = loadTodos();

// ── Persistence ──────────────────────────────────────────────────────────────

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// ── Rendering ────────────────────────────────────────────────────────────────

function renderTodos() {
  list.innerHTML = '';

  todos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item${todo.completed ? ' completed' : ''}`;
    item.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type    = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `Mark "${todo.text}" as completed`);

    const text = document.createElement('span');
    text.className   = 'todo-text';
    text.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className             = 'btn-delete';
    deleteBtn.innerHTML             = '<i class="fas fa-times"></i>';
    deleteBtn.setAttribute('aria-label', `Delete "${todo.text}"`);

    item.append(checkbox, text, deleteBtn);
    list.appendChild(item);
  });

  updateFooter();
}

function updateFooter() {
  const active    = todos.filter((t) => !t.completed).length;
  const completed = todos.filter((t) =>  t.completed).length;

  if (todos.length === 0) {
    footer.classList.add('d-none');
    return;
  }

  footer.classList.remove('d-none');
  itemsLeft.textContent = `${active} item${active !== 1 ? 's' : ''} left`;
  clearBtn.classList.toggle('d-none', completed === 0);
}

// ── Actions ──────────────────────────────────────────────────────────────────

function addTodo(text) {
  todos.push({ id: Date.now(), text: text.trim(), completed: false });
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
}

function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  renderTodos();
}

// ── Event Listeners ──────────────────────────────────────────────────────────

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addTodo(text);
  input.value = '';
  input.focus();
});

list.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const id = Number(e.target.closest('.todo-item').dataset.id);
    toggleTodo(id);
  }
});

list.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.btn-delete');
  if (deleteBtn) {
    const id = Number(deleteBtn.closest('.todo-item').dataset.id);
    deleteTodo(id);
  }
});

clearBtn.addEventListener('click', clearCompleted);

// ── Init ─────────────────────────────────────────────────────────────────────

renderTodos();
