import ToDoItem from "./toDoItem"
const ToDoList = (props) => {
    const {
      tasks = [],
    } = props

    const hasTasks = true

    if(!hasTasks){
        return (
            <div className="todo__empty-message"></div>
        )
    }

    return (
        <ul className="todo__list">

        {tasks.map((task) => (
          <ToDoItem
          className = "todo_item"
          id = {task.id}
          key= {task.id}
          title = {task.title}
          isDone= {task.isDone}
          />
        ))}
        </ul>
    )
    
}

export default ToDoList