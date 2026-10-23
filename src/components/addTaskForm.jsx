import Field from "./field"
import Button from "./button"


const AddTaskForm = () => {
    return (
    <form className="todo__form">
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