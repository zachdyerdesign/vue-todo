var vueTodoApp = new Vue({
  el: '#vue-todo-app',
  data: {
    taskInput: '',
    todos: [],
    completedTasks: 0,
    selectedTask: null,
    taskIndex: null
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
        if (this.taskIndex != null) {
          console.log("task edit")
          this.todos[this.taskIndex].title = this.taskInput, 
          this.todos[this.taskIndex].active = false
        } else {
          // new task
          console.log("new task")
          this.todos.push({ id: this.todos.length, title: this.taskInput, active: '', completed: false, deleted: false })
        }
      }
      this.taskIndex = null
      localStorage.setItem('todos', JSON.stringify(this.todos))
      
    },
    selectTask(task, index) {
      // toggle selection
      if(task.active) { 
        task.active = false
        return
      } else {
        this.deselectList()
        task.active = true
      }
      this.taskInput = task.title
      this.taskIndex = index
      document.getElementById('todo-input').focus()
    },
    deleteTask(task) {
      task.deleted = true
      task.active = false
      this.taskIndex = null
      this.clearInput()
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    restoreTask(task){
      task.deleted = false
      task.active = false
      this.taskIndex = null
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
