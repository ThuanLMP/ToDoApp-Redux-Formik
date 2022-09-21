import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { stateListSelector, todoListSelector } from '../../redux/selectors';
import '../../App.css'
import { changeStateList, updateList } from "../../redux/actions";
import {FormEdit} from "../FormEdit";

const taskEdit = {
    task: '',
    index: 0,
}
export default function () {

    const [editForm, setEditForm] = useState(false);
    

    const dispatch = useDispatch();
    const todoList = useSelector(todoListSelector)
    const stateList = useSelector(stateListSelector)

    const indexOfList = []
    const handleStateList = (value) => {
        dispatch(changeStateList(value))
    }
    const deleteTask = (index) => {
        if (window.confirm('Are you sure delete task ?')) {
            const newList = [...todoList]
            newList.splice(indexOfList[index], 1)
            dispatch(updateList(newList))
        }
    }
    // Set Edit Form appear
    const setEditFormTask = (value) => {
        return setEditForm(value)
    }
   

    // Set Checked button
    const handleCheck = (index) => {
        const newList = [...todoList]
        newList[indexOfList[index]].completed = !stateList
        dispatch(updateList(newList))
    }

    // Handle Edit
    const handleEdit =(value,index) => {
        taskEdit.task = value
        taskEdit.index = indexOfList[index]
        setEditForm(true)
        
    }
   
    // Check deadline <24h

    const checkDeadline = (deadline) => {

    }



    return (

        <div className="list">
            <div className='type-list'>
                <button className={stateList === false ? "btn-active" : "btn"} onClick={() => handleStateList(false)}>Todo</button>
                <button className={stateList === true ? "btn-active" : "btn"} onClick={() => handleStateList(true)}>Done</button>
            </div>
            <table className='list-task'>
                <thead>
                    <tr className='header-list'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Checked</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        todoList.filter((value, index) => {
                            if (value.completed === stateList) {

                                indexOfList.push(index)
                            }
                            return value.completed === stateList
                        })
                            .map((value, index) => {
                                return (
                                    <tr className={checkDeadline(value.deadline) ? 'content-list-deadline' : 'content-list'} key={index}>
                                        <td className='task-id' width={'7%'} >{index + 1}</td>
                                        <td className='task-name' width={'13%'}>{value.name}</td>
                                        <td className='task-description' width={'54%'}>
                                            {value.description}
                                        </td>
                                        <td width={'6%'}>
                                            {
                                                value.deadline
                                            }
                                        </td>

                                        <td className='task-checked' width={'10%'}>
                                            <label className="switch">
                                                <input
                                                    type="checkbox"
                                                    checked={value.state === true}
                                                    onChange={() => {
                                                        handleCheck(index)
                                                    }}
                                                />
                                                <span className="slider"></span>
                                            </label>
                                        </td>

                                        <td className='task-action' width={'10%'}>
                                            <button className='btn-edit' onClick={() => handleEdit(value,index)}>
                                                <i className='fa-solid fa-pen'></i>
                                            </button>

                                            <button className='btn-delete' onClick={() => {
                                                deleteTask(index)
                                            }}>
                                                <i className='fa-solid fa-trash-can'></i>
                                            </button>
                                        </td>

                                    </tr>
                                )
                            })

                    }
                </tbody>
            </table>
            {editForm && <FormEdit handleEditForm={setEditFormTask} taskEdit={taskEdit} />}
        </div>
    )
}