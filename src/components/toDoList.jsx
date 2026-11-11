import ToDoItem from "./toDoItem"
import { memo } from "react"
const ToDoList = (props) => {
    const {
      tasks = [],
      onDeleteTaskButtonClick,
      firstIncompleteTaskRef,
      firstIncompleteTaskID,
      onTaskCompleteChange,
      filteredTasks,
    } = props
    const hasTasks = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0
    console.log("ToDoList")

    if(!hasTasks){
        return (
            <div className="todo__empty-message">There are no tasks yet</div>
        )
    }
    
    if(hasTasks && isEmptyFilteredTasks){
        return (
            <div className="todo__empty-message">tasks not found</div>
        )
    }

    return (
        <ul className="todo__list">

        {(filteredTasks ?? tasks).map((task) => (
          <ToDoItem
          className = "todo_item"
          id = {task.id}
          key= {task.id}
          title = {task.title}
          isDone= {task.isDone}
          taskRef={task.id === firstIncompleteTaskID ? firstIncompleteTaskRef : null}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
          />
        ))}
        </ul>
    )
    
}

export default memo(ToDoList)