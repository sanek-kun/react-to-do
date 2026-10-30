import AddTaskForm from "./addTaskForm"
import SearchTaskFrom from "./searchTaskForm"
import ToDoInfo from "./toDoInfo"
import ToDoList from "./toDoList"

const ToDo = () => {
  const tasks = [
    {Id: 'task-1' , title: 'Buy milk' , isDone: false },
    {Id: 'task-2' , title: 'Learn math' , isDone: true },
  ]

  const deleterAllItems = () => {
    console.log("deleted all items")
  }

  const deletTask = (taskId) => {
    console.log(`delet task id ${taskId}`)
  }

  const toggleTaskComplet = (taskId , isdone) => {
    console.log(`task ${taskId} , ${isdone ? "done" : "not done"}`)
  }

  const filtertasks = (text) => {
    console.log(`filter ${text}`)
  } 

  const addTask = () => {
    console.log("task Added!")
  }

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask={addTask}/>
      <SearchTaskFrom onSearchInput={filtertasks}/>
      <ToDoInfo
      total={tasks.length}
      done={tasks.filter((task) => task.isDone).length}
      onDeleteAllButtonClick={deleterAllItems}
      />
      <ToDoList tasks={tasks}
      onDeleteTaskButtonClick={deletTask}
      onTaskCompleteChange={toggleTaskComplet}
      />
      
    </div>
  )
}

export default ToDo