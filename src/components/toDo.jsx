import { useState } from "react"
import AddTaskForm from "./addTaskForm"
import SearchTaskFrom from "./searchTaskForm"
import ToDoInfo from "./toDoInfo"
import ToDoList from "./toDoList"

const ToDo = () => {

  const [tasks , setTasks] = useState([
    {id: 'task-1' , title: 'Buy milk' , isDone: false },
    {id: 'task-2' , title: 'Learn math' , isDone: true },
  ])

  const [newTaskTitle , setNewTaskTitle] = useState('')

  const deleterAllTasks = () => {
    const isConfirmed = confirm("are you sore you want to delete all?")

    if(isConfirmed){
      setTasks([])
    }
  }

  const deletTask = (taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  }

  const toggleTaskComplet = (taskId , isDone) => {
    setTasks(tasks.map((task) => {
      if(task.id === taskId){
        return{...task , isDone}
      }

      return task
    })
  )
  }

  const filtertasks = (text) => {
    console.log(`filter ${text}`)
  } 

  const addTask = () => {
    if(newTaskTitle.trim().length > 0){
      const newtask = {
        id : crypto.randomUUID(),
        title : newTaskTitle,
        isDone : false,
      }

      setTasks([...tasks , newtask])
      setNewTaskTitle('')
    }
  }

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask={addTask} newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle}/>
      <SearchTaskFrom onSearchInput={filtertasks}/>
      <ToDoInfo
      total={tasks.length}
      done={tasks.filter((task) => task.isDone).length}
      onDeleteAllButtonClick={deleterAllTasks}
      />
      <ToDoList tasks={tasks}
      onDeleteTaskButtonClick={deletTask}
      onTaskCompleteChange={toggleTaskComplet}
      />
      
    </div>
  )
}

export default ToDo