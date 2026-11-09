import { useState , useEffect , useRef} from "react"
import AddTaskForm from "./addTaskForm"
import SearchTaskFrom from "./searchTaskForm"
import ToDoInfo from "./toDoInfo"
import ToDoList from "./toDoList"
import Button from "./button"

const ToDo = () => {

  const [tasks , setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')

    if(savedTasks){
      return JSON.parse(savedTasks)
    }

    return [
      {id: 'task-1' , title: 'Buy milk' , isDone: false },
      {id: 'task-2' , title: 'Learn math' , isDone: true },
    ]
  })
  const [searchQuery , setSearchQuery ] = useState('')

  const [newTaskTitle , setNewTaskTitle] = useState('')
  const newTaskInputRef = useRef(null)
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTask = tasks.find(
    task => task.isDone === false
  )
  const firstIncompleteTaskID = firstIncompleteTask?.id


  const deleterAllTasks = () => {
    const isConfirmed = confirm("are you sore you want to delete all?")

    if(isConfirmed){
      setTasks([])
    }
  }

  const deletTask = (taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  }

  const toggleTaskComplet = (taskId , isDone) => {
    setTasks(tasks.map((task) => {
      if(task.id === taskId){
        return{...task , isDone}
      }

      return task
    })
  )
  }

  const addTask = () => {

    if(newTaskTitle.trim().length > 0){
      const newtask = {
        id : crypto.randomUUID(),
        title : newTaskTitle,
        isDone : false,
      }

      setTasks([...tasks , newtask])
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.focus()
    } 
  }

  useEffect(() => {
    localStorage.setItem('tasks' , JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  },[])

  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks= clearSearchQuery.length > 0 
  ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
  : null

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm 
      addTask={addTask} 
      newTaskTitle={newTaskTitle} 
      setNewTaskTitle={setNewTaskTitle}
      newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskFrom 
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      />
      <ToDoInfo
      total={tasks.length}
      done={tasks.filter((task) => task.isDone).length}
      onDeleteAllButtonClick={deleterAllTasks}
      />
      <Button 
     onClick={() => {firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}}
      >
        show first incomplete task
      </Button>
      <ToDoList 
      tasks={tasks}
      filteredTasks={filteredTasks}
      firstIncompleteTaskRef={firstIncompleteTaskRef}
      firstIncompleteTaskID={firstIncompleteTaskID}
      onDeleteTaskButtonClick={deletTask}
      onTaskCompleteChange={toggleTaskComplet}
      />
      
    </div>
  )
}

export default ToDo