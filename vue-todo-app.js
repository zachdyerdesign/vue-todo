var vueTodoApp = new Vue({
  el: '#vue-todo-app',
  data: {
    taskInput: '',
    todos: [],
    completedTasks: 0,
    selectedTask: null
  },
  mounted() {
    window.addEventListener('keydown', (event) => {
      if (event.key == 'Enter') {
        console.log('Add task!')
        this.saveTask()
        this.clearInput()
      }
    })
    if (localStorage.getItem('todos'))
      this.todos = JSON.parse(localStorage.getItem('todos'))
    this.updateCompletedTasks()
  },
  watch: {
    todos: {
      deep: true,
      handler(){
        this.updateCompletedTasks()
      }
    }
  },
  methods: {
    clearInput() {
      this.taskInput = ''
    },
    saveTask() {
      if (this.taskInput) {
        if (this.selectedTask != null) {
          this.todos[this.selectedTask] = { id: this.selectedTask, title: this.taskInput, active: '', display: true, completed: this.todos[this.selectedTask].completed }
        } else {
          // new task
          this.todos.push({ id: this.todos.length, title: this.taskInput, active: '', display: true, completed: false })
        }
      }
      this.selectedTask = null
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    selectTask(id) {
      // toggle selection
      if(id==this.selectedTask) {
        this.deselectList()
        return
      }
      this.todos.forEach((item, index) => {
        this.todos[index].active = ''
        if(id == this.todos[index].id) {
          this.todos[index].active = 'active'
        }
      })
      this.taskInput = this.todos[id].title
      this.selectedTask = id
      document.getElementById('todo-input').focus()
    },
    deleteTask(id) {
      this.todos.forEach((item, index) => {
        this.todos[index].active = ''
        if(id == this.todos[index].id) {
          this.todos.splice(index, 1)
        }
      })
      this.selectedTask = null
      this.clearInput()
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    deselectList() {
      this.saveTask()
      this.todos.forEach((item, index) => {
        this.todos[index].active = ''
      })
      this.selectedTask = null
      this.clearInput()
    },
    saveCompletedTasks(id) {
      console.log('task id', id)
      if (this.todos[id].completed) {
        this.todos[id].completed = false
      } else {
        this.todos[id].completed = true
      }
      localStorage.setItem('todos', JSON.stringify(this.todos))
      this.updateCompletedTasks()
    },
    updateCompletedTasks(){
      this.completedTasks = 0
      this.todos.forEach((item, index)=>{
        if(item.completed) this.completedTasks++
      })
    }
  }
})
