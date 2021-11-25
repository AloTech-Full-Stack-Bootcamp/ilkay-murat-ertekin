import {nanoid} from 'nanoid'
import { useState } from 'react';

export default function Main({taskList,setTaskList,setAllTask}) {
  
  const [task, setTask] = useState({
     name: "", 
     isCompleted: false,
     id:""
    });
  

  const formSubmit = (e) => {
    e.preventDefault();
    setTaskList([...taskList, task]);
    setTask({...task,name:""})
    setAllTask([...taskList, task])
  };
  const inputChange = (e) => {
    setTask({ ...task, name: e.target.value,id:nanoid() });
  };

  const toggleHandle = (i) => {
    const arr = taskList.slice();
    const key = arr.findIndex((t) => t.id === i.id);
    arr[key] = {name:i.name, isCompleted: !i.isCompleted,id:i.id };
    setTaskList(arr)
    setAllTask(arr);
  };

  const deleteTask=(i)=>{
    const arr = taskList.slice()
    const arr2=arr.filter(t=>t.id!==i.id)
    setTaskList(arr2)
    setAllTask(arr2);
    
  }

  return (
    <div>
      <form onSubmit={formSubmit}>
        <input
          className="new-todo"
          onChange={inputChange}
          value={task.name}
          name="taskName"
          placeholder="What needs to be done?"
          autofocus
        />
      </form>
      <section className="main">
        <input className="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {taskList.map((i, index) => {
            return (
              <li key={index} className={i.isCompleted && "completed"}>
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={i.isCompleted}
                    onClick={() => toggleHandle(i)}
                  />
                  <label>{i.name}</label>
                  <button onClick={()=>deleteTask(i)} className="destroy"></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
