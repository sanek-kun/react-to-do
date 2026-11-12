import ToDo from "./components/toDo"
import { TasksProvider } from "./context/TasksContext"

const App = () => {
  return (
    <TasksProvider>
      <ToDo/>
    </TasksProvider>
  )
}

export default App
