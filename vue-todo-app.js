var vueTodoApp = new Vue({
  el: '#vue-todo-app',
  data: {
    taskInput: '',
    todos: [],
    completedTasks: 0,
    selectedTask: null,
    tasksCreated: 0
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
    if (localStorage.getItem('tasksCreated'))
      this.tasksCreated = parseInt(localStorage.getItem('tasksCreated'))
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
          this.todos[this.selectedTask] = { id: this.selectedTask, title: this.taskInput, active: '', completed: this.todos[this.selectedTask].completed }
        } else {
          // new task
          this.todos.push({ id: this.tasksCreated, title: this.taskInput, active: '', completed: false })
          this.tasksCreated++
          localStorage.setItem('tasksCreated', this.tasksCreated)
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
          this.taskInput = this.todos[index].title
          this.selectedTask = this.todos[index].id
        }
      })
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
      this.todos.forEach((item, index) => {
        this.todos[index].active = ''
      })
      this.selectedTask = null
      this.clearInput()
    },
    updateCompletedTasks(){
      this.completedTasks = 0
      this.todos.forEach((item, index)=>{
        if(item.completed) this.completedTasks++
      })
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }
})
