import axios from 'axios'
import React from 'react'
import Modal from './Modal'

const TodoList = (props) => {
    return (
        <div className="d-flex align-items-center justify-content-center has-text-centered" style={{height: '100vh', width:'40vw', margin: 'auto'}}>
        <div className="card">
            <div className='card-header'>
                <h1 className="card-header-title">Todo App</h1>
            </div>
            <div className="card-content">
                <div className="content">
                    <h4>Todo List</h4>
                    <table className='table is-striped'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                                <th>Done</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.todo.map(todo => {
                                return (
                                    <tr>
                                        <td>{todo.id}</td>
                                        <td>{todo.title}</td>
                                        <td>{todo.body}</td>
                                        <td>
                                            <button className='button is-danger ml-2' onClick={(e)=>{
                                                e.preventDefault()
                                                axios.delete(`http://localhost:4000/api/todos/${todo.id}`)
                                                    .then(res => {
                                                        console.log(res)
                                                    })
                                                    .catch(err => console.log(err))                                
                                            }}>Delete</button>
                                            <button className='button is-success ml-2' onClick={(e)=>{
                                                e.preventDefault()
                                                axios.post(`http://localhost:4000/api/todos/${todo.id}/done`)
                                                    .then(res => {
                                                        console.log(res)
                                                    })
                                                    .catch(err => console.log(err))
                                            }}>Done</button>
                                        </td>
                                        <th>{todo.done ? <p>yes</p> : <p>no</p>}</th>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="is-centered">
                    <Modal />
                </div>
            </div>
        </div>
    </div>
    )
}

export default TodoList
