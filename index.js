/* globals Vue */

new Vue({
  el: '#app',
  data: function () {
    return {
      addText: '',
      list: [],
      todos: [],
      uid: 0,
    };
  },
  methods: {
    addTodo: function () {
      if (this.addText == '') return;
      this.uid += 1;
      let todo = {
        id: this.uid,
        text: this.addText,
        check: false,
        edit: false,
      };
      this.todos.push(todo);
      localStorage.setItem('uid', this.uid);
      this.addText = '';
    },
    removeTodo: function (todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    editTodo: function (todo) {
      todo.edit = !todo.edit;
    },
    checkTodo: function (todo) {
      todo.check = !todo.check;
    },
    changeTodo: function (todo) {
      if (todo.text == '') return;
      todo.edit = false;
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
