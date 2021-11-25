import { useState } from "react";
import Footer from './components/Footer';
import Main from './components/Main';


function App() {
  
  const [taskList, setTaskList] = useState([]);
  const [allTask,setAllTask]=useState([])

  
  return (
  <div className="todoapp">
    <header className="header" />
		<h1>todos</h1>
    <Main taskList={taskList} setTaskList={setTaskList} allTask={allTask}  setAllTask={setAllTask} />
    <Footer  taskList={taskList} setTaskList={setTaskList} allTask={allTask}  setAllTask={setAllTask} />
		


  </div>
  );
}

export default App;
