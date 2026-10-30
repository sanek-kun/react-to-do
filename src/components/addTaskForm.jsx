import Field from "./field"
import Button from "./button"


const AddTaskForm = (props) => {
  const {
    addTask, 
  } = props

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
        />
        <Button type="submit">Add</Button>
      </form>
    )
}

export default AddTaskForm