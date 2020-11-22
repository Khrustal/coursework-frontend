import React, {Component} from 'react'
import ToDoDataService from "../api/ToDoDataService";
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component {

    constructor(props){
        console.log('constructor')
        super(props)
        this.state = {
            todos : [],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)   
        this.updateTodoClicked = this.updateTodoClicked.bind(this)   
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        console.log(nextProps)
        console.log(nextState)
        return true
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.refreshTodos();
        console.log(this.state)
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedUserName()
        console.log(username.username)
        ToDoDataService.retrieveAllToDo(username)
          .then(
              response => {
                  this.setState({todos : response.data})
              }
          ) 
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedUserName()
        ToDoDataService.deleteToDo(username, id)
         .then (
             response => {
                this.setState({message : `Delete of todo ${id} Successful`})
                this.refreshTodos()
             }
         )
        
    }

    addTodoClicked() {
        let username = AuthenticationService.getLoggedUserName()
        this.props.history.push(`/todo/${username}/0`)
    }

    updateTodoClicked(id) {
        let username = AuthenticationService.getLoggedUserName()
        this.props.history.push(`/todo/${username}/${id}`)
    }

    render() {
        return (
            <div>
                 <h1>List Todos</h1>
                 {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                     {/*<div className="row">
                         <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                     </div>*/}
                    <table className="table">
                        <thead>
                            <tr>
                                <th><button className="btn btn-success" onClick={this.addTodoClicked}>+ Add</button></th>
                                <th>Description</th>
                                <th>IsCompleted?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td></td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                 </div>
            </div>
        )
    }
}

export default ListTodosComponent