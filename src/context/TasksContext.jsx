import { createContext , useState , useRef , useCallback , useEffect , useMemo } from "react";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props

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
  const firstIncompleteTask = tasks.find(task => task.isDone === false)
  const firstIncompleteTaskID = firstIncompleteTask?.id

  const deleteAllTasks = useCallback(() => {
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
        return [...prevTasks , newtask]
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


    return (
    <TasksContext.Provider value={{tasks , filteredTasks , firstIncompleteTaskRef , firstIncompleteTaskID , deletTask , deleteAllTasks , toggleTaskComplet , newTaskTitle , setNewTaskTitle , searchQuery , setSearchQuery , newTaskInputRef , addTask}}>
     {children}
    </TasksContext.Provider>
  )
}
