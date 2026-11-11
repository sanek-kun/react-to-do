import { useState , useEffect , useRef , useCallback, useMemo} from "react"
import AddTaskForm from "./addTaskForm"
import SearchTaskFrom from "./searchTaskForm"
import ToDoInfo from "./toDoInfo"
import ToDoList from "./toDoList"
import Button from "./button"

const ToDo = () => {

  console.log("ToDo")

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


  const deleterAllTasks = useCallback(() => {
    const isConfirmed = confirm("are you sore you want to delete all?")

    if(isConfirmed){
      setTasks([])
    }
  }, [])

  const deletTask = useCallback((taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  },[tasks])

  const toggleTaskComplet = useCallback((taskId , isDone) => {
    setTasks(tasks.map((task) => {
      if(task.id === taskId){
        return{...task , isDone}
      }

      return task
    })
  )
  },[tasks])

  const addTask = useCallback(() => {

    if(newTaskTitle.trim().length > 0){
      const newtask = {
        id : crypto.randomUUID(),
        title : newTaskTitle,
        isDone : false,
      }

      setTasks((prevTasks) => {
        [...prevTasks , newtask]
      })
      setNewTaskTitle('')
      setSearchQuery('')
      newTaskInputRef.current.focus()
    } 
  }, [newTaskTitle])

  useEffect(() => {
    localStorage.setItem('tasks' , JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  },[])

  
  const filteredTasks= useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0 
  ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
  : null
  }, [tasks, searchQuery])

  const doneTasks = useMemo(() => {
    return tasks.filter((task) => task.isDone).length
  }, [tasks])

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
      done={doneTasks}
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