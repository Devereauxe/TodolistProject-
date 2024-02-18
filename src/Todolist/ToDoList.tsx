import { link } from 'fs'
import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValueType } from '../App'

type PropsType = {
  titleName: string 
  tasks: TaskType[] 
  addTask: (title:string) => void
  removeTask: (taskId:string) => void
  changeFilter: (value: FilterValueType) => void
  changeTaskStatus: (id:string, isDone:boolean) => void
  filter:FilterValueType
} 

type TaskType = { 
  id: string 
  title: string 
  isDone: boolean 
}

export const Todolist = (props:PropsType) => {

const [newTaskTitle, setnewTaskTitle] = useState('')
const [error, setError] = useState<string | null>('')

const addTask = () => {
    if (newTaskTitle.trim() !== ''){
    props.addTask(newTaskTitle.trim())
    setnewTaskTitle('')}
    else {
setError('Title is required');
    }
}

const onNewTitleChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    setnewTaskTitle(e.currentTarget.value) }

const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError('');
    if(e.key === 'Enter'){
        addTask()
}}

const onAllClickHandler = () => props.changeFilter('all')
const onActiveClickHandler = () => props.changeFilter('active')
const onCompletedClickHandler = () => props.changeFilter('completed')
const onChangeHandler = () => {}

return (
    <div>
    <h3>{props.titleName}</h3>
    <div>
        <input
        type='text'
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyUp={onKeyPressHandler}
        className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error &&<div className='error-message'>{error}</div>}
    </div>
    <ul>
        {
        props.tasks.map(t => { 
        
const removeTask = () => props.removeTask(t.id);
const onChangeStatus = (e:ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    props.changeTaskStatus(t.id,newIsDoneValue)
}
            return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input 
            type="checkbox"
            checked={t.isDone} 
            onChange={onChangeStatus}
            /><span>{t.title}</span>
            <button onClick={removeTask}>x</button>
            </li>
            })
        }
            </ul>
    <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? 'active-filter': ''} onClick={onCompletedClickHandler}>Completed</button>
    </div>
    </div>
)
}