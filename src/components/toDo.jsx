import AddTaskForm from "./addTaskForm"
import SearchTaskFrom from "./searchTaskForm"
import ToDoInfo from "./toDoInfo"
import ToDoList from "./toDoList"

const ToDo = () => {
  const tasks = [
    {Id: 'task-1' , title: 'Buy milk' , isDone: false },
    {Id: 'task-2' , title: 'Learn math' , isDone: true },
  ]

    return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm/>
      <SearchTaskFrom/>
      <ToDoInfo
      total={tasks.length}
      done={tasks.filter((task) => task.isDone).length}
      />
      <ToDoList tasks={tasks}/>
      
    </div>
    )
}

export default ToDo