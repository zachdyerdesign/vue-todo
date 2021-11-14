var app4 = new Vue({
    el: '#vue-todo-app',
    data: {
      taskInput: '',
      todos: [
        { id: 0, title: 'Learn JavaScript', active: '', display: true, completed: false },
        { id: 1, title: 'Learn Vue', active: '', display: true, completed: false },
        { id: 2, title: 'Build something awesome', active: '', display: true, completed: false }
      ],
      completedTasks: [],
      selectedTask: null
    },
    mounted(){
      window.addEventListener('keydown', (event)=>{
        if(event.key == 'Enter') {
          console.log('Add task!')
          this.saveTask()
          this.clearInput()
        }
      })
      if(localStorage.getItem('todos'))
        this.todos = JSON.parse(localStorage.getItem('todos'))
    },
    methods: {
      clearInput(){
        this.taskInput = ''
      },
      saveTask(){
        if(this.taskInput) {
          if(this.selectedTask != null) {
            this.todos[this.selectedTask] = {id: this.selectedTask, title: this.taskInput, active: '', display: true}
          } else {
            this.todos.push({id: this.todos.length, title: this.taskInput, active: '', display: true})
          }
        }
        this.selectedTask = null   
        localStorage.setItem('todos', JSON.stringify(this.todos))
      },
      selectTask(id){
        console.log('select task')
        this.todos.forEach((item, index)=>{
          this.todos[index].active = ''
        })
        this.taskInput = this.todos[id].title
        this.selectedTask = id
        this.todos[id].active = 'active'
        document.getElementById('todo-input').focus()
      },
      deleteTask(id) {
        this.todos.forEach((item, index)=>{
          this.todos[index].active = ''
        })
        this.selectedTask = null
        this.todos[id].display = false
        localStorage.setItem('todos', JSON.stringify(this.todos))
      },
      deselectList(){
        console.log('deselect list')
        this.todos.forEach((item, index)=>{
          this.todos[index].active = ''
        })
        this.selectedTask = null
        this.clearInput()
      },
      saveCompletedTasks(id){
        console.log(this.todos[id])
        if(this.todos[id].completed) {
          this.todos[id].completed = false
        } else {
          this.todos[id].completed = true
        }
        localStorage.setItem('todos', JSON.stringify(this.todos))
      }
      
    }
  })