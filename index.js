/* globals Vue */

new Vue({
  el: '#app',
  data: {
    additionalText: '',
    list: [],
    todos: [],
    uid: 0,
  },
  methods: {
    addTodo: function () {
      if (this.additionalText === '') return;
      this.uid += 1;
      const todo = {
        id: this.uid,
        text: this.additionalText,
        hasCheck: false,
        canEdit: false,
      };
      this.todos.push(todo);
      this.additionalText = '';
    },
    removeTodo: function (todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    editTodo: function (todo) {
      todo.canEdit = !todo.canEdit;
    },
    checkTodo: function (todo) {
      todo.hasCheck = !todo.hasCheck;
    },
    changeTodo: function (todo) {
      if (todo.text == '') return;
      todo.canEdit = false;
    },
  },
  watch: {
    todos: {
      handler: function () {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true,
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
