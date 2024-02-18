import React, { useState } from 'react';
import './App.css';
// ui
import { Todolist } from './Todolist/ToDoList'
//library
import { v1 } from 'uuid';


export type FilterValueType = 'all' | 'active' | 'completed';

export const App = () => {
  let [tasks, setTasks] = useState ([
    {id:v1(), title: 'HTML,CSS', isDone:true},
    {id:v1(), title: 'JS', isDone:true},
    {id:v1(), title: 'ReactJS', isDone:false},
    {id:v1(), title: 'Rest API', isDone:false},
    {id:v1(), title: 'GraphQL', isDone:false},
  ])


  

let [filter, setFilter] = useState<FilterValueType>('all')
let tasksForTodolist = tasks;

if (filter === 'active') {
  tasksForTodolist = tasks.filter(t => t.isDone === false)
}

if (filter === 'completed') {
  tasksForTodolist = tasks.filter(t => t.isDone === true)
}

function addTask(title:string) {
const task = {id:v1(), title: title, isDone:false}
setTasks([...tasks, task])
}

function changeFilter(value:FilterValueType){
  setFilter(value)
}

function removeTask(id:string) {
  let filteredTasks = tasks.filter(t => t.id !== id);
  setTasks(filteredTasks)
}

const changeTaskStatus = (id: string, isDone:boolean) => {
const newTasks = tasks.map ( (t) => t.id === id ? {...t, isDone: isDone} : t)
setTasks(newTasks)
}



  return (
    <div className='App'>
      <Todolist 
      changeTaskStatus={changeTaskStatus}
      titleName="What to learn" 
      tasks={tasksForTodolist}
      removeTask={removeTask}
      changeFilter={changeFilter}
      addTask={addTask}
      filter={filter}
      ></Todolist>
    </div>
  )
}