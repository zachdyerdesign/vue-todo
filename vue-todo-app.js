var app4 = new Vue({
    el: '#vue-todo-app',
    data: {
      taskInput: '',
      todos: [
        { id: 0, title: 'Learn JavaScript', active: '', display: true },
        { id: 1, title: 'Learn Vue', active: '', display: true },
        { id: 2, title: 'Build something awesome', active: '', display: true }
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
      document.getElementById('todo-input').addEventListener('blur', ()=>{
        console.log('Add task!')
        this.saveTask()
        this.clearInput()
      })

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
      },
      selectTask(id){
        console.log('select task')
        this.todos.forEach((item, index)=>{
          this.todos[index].active = ''
        })
        this.taskInput = this.todos[id].title
        this.selectedTask = id
        this.todos[id].active = 'active'
      },
      deleteTask(id) {
        this.todos.forEach((item, index)=>{
          this.todos[index].active = ''
        })
        this.selectedTask = null
        this.todos[id].display = false
      },
      deselectList(){
        console.log('deselect list')
        this.todos.forEach((item, index)=>{
          this.todos[index].active = ''
        })
        this.selectedTask = null
        this.clearInput()
      }
    }
  })