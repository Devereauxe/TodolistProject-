import React, { useState } from 'react';
import './App.css';
// ui
import { Todolist } from './Todolist/ToDoList'
//library
import { v1 } from 'uuid';


export type FilterValueType = 'all' | 'active' | 'completed';

type TodolistType= {
  id: string,
  title: string,
  filter: FilterValueType
}

export const App = () => {
  
function addTask(title:string, todolistId:string) {
const task = {id:v1(), title: title, isDone:false};
let tasks = tasksObj[todolistId];
let newTasks = [task, ...tasks];
tasksObj[todolistId] = newTasks;
setTasks({...tasksObj})
}

function changeFilter(value:FilterValueType, todolistId: string){
 let todolist = todolists.find(tl => tl.id === todolistId);
if (todolist) {
  todolist.filter = value;
  setTodolists([...todolists])
}
}

function removeTask(id:string, todolistId: string) {
  let tasks = tasksObj[todolistId];
  let filteredTasks = tasks.filter(t => t.id !== id);
  tasksObj[todolistId]=filteredTasks;
  setTasks({...tasksObj});
}

const changeTaskStatus = (id: string, isDone:boolean, todolistId:string) => {
  let tasks = tasksObj[todolistId];
let task = tasks.find ( t => t.id === id);
if (task) {
  task.isDone = isDone;
  setTasks({...tasksObj});
}

}

let todolistId1 = v1();
let todolistId2 = v1();


let [todolists, setTodolists] = useState<Array<TodolistType>>([
{id:todolistId1, title:'What to learn?', filter: 'all'},
{id:todolistId2, title:'What to buy?', filter: 'all'}
]);


let removeTodolist = (todolistId:string) => {
  let filteredTodolist = todolists.filter(tl => tl.id !=todolistId);
  setTodolists(filteredTodolist);
  delete tasksObj[todolistId];
  setTasks({...tasksObj});
}

let [tasksObj, setTasks] = useState({
  [todolistId1]:[
    {id:v1(), title: 'HTML,CSS', isDone:true},
    {id:v1(), title: 'JS', isDone:true},
    {id:v1(), title: 'ReactJS', isDone:false},
    {id:v1(), title: 'Rest API', isDone:false},
    {id:v1(), title: 'GraphQL', isDone:false},
  ],
[todolistId2]:[
  {id:v1(), title: 'Book', isDone:false},
    {id:v1(), title: 'Milk', isDone:true},
]
});


  return (
    <div className='App'>
      {todolists.map( (tl)  => {

let tasksForTodolist = tasksObj[tl.id];

if (tl.filter === 'active') {
  tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
}

if (tl.filter === 'completed') {
  tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
}

       return <Todolist 
       key = {tl.id}
       id = {tl.id}
      changeTaskStatus={changeTaskStatus}
      titleName={tl.title} 
      tasks={tasksForTodolist}
      removeTask={removeTask}
      changeFilter={changeFilter}
      addTask={addTask}
      filter={tl.filter}
      removeTodolist={removeTodolist}
      ></Todolist>
      })}
    </div>
  )
}