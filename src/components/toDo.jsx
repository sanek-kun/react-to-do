import { useContext} from "react"
import AddTaskForm from "./addTaskForm"
import SearchTaskFrom from "./searchTaskForm"
import ToDoInfo from "./toDoInfo"
import ToDoList from "./toDoList"
import Button from "./button"
import { TasksContext } from "../context/TasksContext"

const ToDo = () => {

  const {firstIncompleteTaskRef} = useContext(TasksContext)

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm/>
      <SearchTaskFrom/>
      <ToDoInfo/>
      <Button onClick={() => {firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}}>show first incomplete task</Button>
      <ToDoList/>
    </div>
  )
}

export default ToDo