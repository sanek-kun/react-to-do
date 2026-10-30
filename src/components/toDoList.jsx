import ToDoItem from "./toDoItem"
const ToDoList = (props) => {
    const {
      tasks = [],
      onDeleteTaskButtonClick,
      onTaskCompleteChange,
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
          id = {task.Id}
          key= {task.Id}
          title = {task.title}
          isDone= {task.isDone}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
          />
        ))}
        </ul>
    )
    
}

export default ToDoList