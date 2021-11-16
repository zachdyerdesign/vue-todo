var vueTodoApp = new Vue({
  el: '#vue-todo-app',
  data: {
    taskInput: '',
    todos: [],
    rewards: [],
    completedTasks: 0,
    selectedTask: null,
    taskIndex: null,
    rewardIndex: null,
    currentTab: 'tasks'
  },
  mounted() {
    window.addEventListener('keydown', (event) => {
      if (event.key == 'Enter') {
        console.log('Add task!')
        if(this.currentTab == 'tasks') this.saveTask()
        if(this.currentTab == 'rewards') this.saveReward()
        this.clearInput()
      }
    })
    if (localStorage.getItem('todos'))
      this.todos = JSON.parse(localStorage.getItem('todos'))
    if (localStorage.getItem('rewards'))
      this.rewards = JSON.parse(localStorage.getItem('rewards'))
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
          this.todos.push({ id: this.todos.length, title: this.taskInput, active: false, completed: false, deleted: false })
        }
      }
      this.taskIndex = null
      localStorage.setItem('todos', JSON.stringify(this.todos))
      
    },
    saveReward(){
      if (this.taskInput) {
        if (this.rewardIndex != null) {
          console.log("reward edit")
          this.rewards[this.rewardIndex].title = this.taskInput, 
          this.rewards[this.rewardIndex].active = false
        } else {
          // new task
          console.log("new reward")
          this.rewards.push({ id: this.rewards.length, title: this.taskInput, active: false, deleted: false, inventory: 0 })
        }
      }
      this.rewardIndex = null
      localStorage.setItem('rewards', JSON.stringify(this.rewards))
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
    selectReward(reward, index){
      // toggle selection
      if(reward.active) { 
        reward.active = false
        return
      } else {
        this.deselectList()
        reward.active = true
      }
      this.taskInput = reward.title
      this.rewardIndex = index
      document.getElementById('todo-input').focus()
    },
    purchaseReward(reward){
      reward.inventory++
    },
    deleteReward(reward){
      reward.deleted = true
      reward.active = false
      this.rewardIndex = null
      this.clearInput()
      localStorage.setItem('todos', JSON.stringify(this.todos))
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
    emptyTrash(){
      let todos = []
      this.todos.forEach((task, index)=>{     
        if(!task.deleted) {
          todos.push(task)
        }
      })
      this.todos = todos
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    deselectList() {
      this.todos.forEach((item, index) => {
        this.todos[index].active = false
      })
      this.selectedTask = null
      this.rewards.forEach((item, index) => {
        this.rewards[index].active = false
      })
      this.selectedReward = null
      this.clearInput()
    },
    updateCompletedTasks(){
      this.completedTasks = 0
      this.todos.forEach((item, index)=>{
        if(item.completed) this.completedTasks++
      })
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    switchTab(tab){
      this.deselectList()
      this.currentTab = tab
    }
  }
})
