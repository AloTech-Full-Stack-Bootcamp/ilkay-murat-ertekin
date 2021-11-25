import React, {useEffect,useState } from "react";

export default function Footer({taskList,setTaskList,setAllTask,allTask}) {

  
  const [active,setActive]=useState('')

  

  useEffect(()=>{
    setTaskList(allTask)

  },[allTask])

  const handleIsTrue=()=>{
    const allTrue=allTask.filter(i=>i.isCompleted===true)
    setTaskList(allTrue)
    setActive('completed')
  }

  const handleAll=()=>{
    setTaskList(allTask)
    setActive('all')
  }
  const handleIsFalse=()=>{
    const allFalse=allTask.filter(i=>i.isCompleted===false)
    setTaskList(allFalse)
    setActive('active')
  }

  const clearCompleted=()=>{
    const allFalse=allTask.filter(i=>i.isCompleted===false)
    taskList.length!==0 && setAllTask(allFalse)
    setActive('all')
    
    
  }


  

  return (
   
      <footer className="footer">
        <span className="todo-count">
          <strong>{allTask.filter(i=>i.isCompleted===false).length} </strong>
          items left
         </span>
        <ul className="filters">
          <li>
            <button onClick={handleAll}  className={active==='all'? "selected" : ""}>All </button>
          </li>
          <li>
          <button onClick={handleIsFalse} className={active==='active'? "selected" : ""}>Active</button>
          </li>
          <li>
          <button onClick={handleIsTrue}  className={active==='completed'? "selected" : ""}>Completed</button>
          </li>
        </ul>

        <button onClick={clearCompleted} className="clear-completed">Clear completed</button>
      </footer>
    
  );
}
