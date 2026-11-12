import Field from "./field"
import Button from "./button"
import { useContext } from "react"
import { TasksContext } from "../context/TasksContext"


const AddTaskForm = () => {
  const {
    addTask, 
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
  } = useContext(TasksContext)

  const onSubmit = (event) => {
    event.preventDefault()
    addTask()
  }
    return (
    <form className="todo__form" onSubmit={onSubmit}>
        <Field 
        className="todo__field"
        label="New task title"
        id="search-task"
        type="search"
        value={newTaskTitle}
        onInput={(event) => {setNewTaskTitle(event.target.value)}}
        ref={newTaskInputRef}
        />
        <Button type="submit">Add</Button>
      </form>
    )
}

export default AddTaskForm