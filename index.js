/* globals Vue */

new Vue({
  el: '#app',
  data: {
    newText: '',
    todos: [],
  },
  methods: {
    addTodo: function () {
      if (this.newText === '') return;
      this.uid = self.crypto.randomUUID();
      const todo = {
        id: this.uid,
        text: this.newText,
        hasCheck: false,
        canEdit: false,
      };
      this.todos.push(todo);
      this.newText = '';
      this.saveTodo(todo);
    },
    removeTodo: function (todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
      this.saveTodo(todo);
    },
    editTodo: function (todo) {
      todo.canEdit = !todo.canEdit;
    },
    checkTodo: function (todo) {
      todo.hasCheck = !todo.hasCheck;
      this.saveTodo(todo);
    },
    changeTodo: function (todo) {
      if (todo.text === '') return;
      todo.canEdit = false;
      this.saveTodo(todo);
    },
    saveTodo: function () {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
  },
  computed: {
    allTodos: function () {
      return this.todos;
    },
  },
  created() {
    if (localStorage.getItem('todos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'));
      } catch (e) {
        localStorage.removeItem('todos');
      }
    }
  },
});
