import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Message from './Message';
import './style.css';

const BASE_URL = 'https://1zidevnd68.execute-api.us-east-2.amazonaws.com/dev/todo-api'

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoInput: '',
      todos: [],
      error: false
    };
  }
  
  componentDidMount = () => {
    this.getAllTodos();
  }

  getAllTodos = () => {
    axios.get(`${BASE_URL}/all`)
    .then( response => response && this.setState({ todos: response.data.body.Items }) )
    .catch( response => console.log('response', response) )
  }

  getTodo = id => {
    // JSX example : <button onClick={() => this.getTodo(todo.id)}>Get Todo</button> 
    axios.get(`${BASE_URL}/items?id=${id}`)
    .then( response => console.log('response', response.data.body.Item))
    .catch( response => console.log('response', response) )
  }

  addTodo = async () => {
    await axios.post(BASE_URL, { todo: this.state.todoInput, completed: false })
      .then( response => {
        alert(`success: ${this.state.todoInput} was added`)
        this.setState({ todoInput: '' })
      })
      .catch( response => console.log('error', response) )
      await this.getAllTodos();
  }

  markDone = async (id = '', text = '', completed = true) => {
    await axios.put(BASE_URL, { id, todo: text, completed })
      .then( response => console.log('response', response) )
      .catch( response => console.log('error', response) )
    await this.getAllTodos();
  }

  deleteTodo = async (id = '') => {
    await axios.delete(BASE_URL, { data: { id } })
    .then( response => console.log('response', response) )
    .catch( response => console.log('error', response) )
    await this.getAllTodos();
  }

  renderTodos = (completed, todos) => {
    return !completed ? (
      todos.filter( todo => !todo.completed )
        .map( (todo, index) => (
          <div key={`active-${index}`} className="todo-item">
            <div>{todo.todo}</div>
            <button onClick={() => this.markDone(todo.TodoId, todo.todo)}>Mark Done</button>
          </div>
        ))
    ) : (
      todos.filter( todo => todo.completed )
        .map( (todo, index) => (
          <div key={`active-${index}`} className="todo-item">
            <div>{todo.todo}</div>
            <button onClick={() => this.deleteTodo(todo.TodoId, todo.todo)}>Remove</button>
          </div>
        ))
    )
  }

  updateTodo = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }
  
  render() {
    return (
      <div>
          <div className="input-box">
          <Message error={this.state.error} />
          <input placeholder="enter todo" id="todoInput" value={this.state.todoInput} onChange={(e) => this.updateTodo(e)}></input>
          <button onClick={() => this.addTodo()}>Add Todo</button>
        </div>
        <div className="title">
          <div><h4>Active Todos</h4></div>
          <div><h4>Completed Todos</h4></div>
        </div>
        <div className="todo-wrapper">
          <div className="active-todos">
            { this.state.todos.length > 0 ? this.renderTodos(false, this.state.todos) : null }
          </div>
          <div className="completed-todos">
            { this.state.todos.length > 0 ? this.renderTodos(true, this.state.todos) : null }
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
