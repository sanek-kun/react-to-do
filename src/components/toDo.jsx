import AddTaskForm from "./addTaskForm"
import SearchTaskFrom from "./searchTaskForm"
import ToDoInfo from "./toDoInfo"
import ToDoList from "./toDoList"

const ToDo = () => {
    return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm/>
      <SearchTaskFrom/>
      <ToDoInfo/>
      <ToDoList/>
      
    </div>
    )
}

export default ToDo