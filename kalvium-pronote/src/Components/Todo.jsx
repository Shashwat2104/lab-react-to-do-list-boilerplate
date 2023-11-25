import  { Component } from "react";

export default class Todo extends Component {
  state = {
    todos: [],
    newTodo: "",
    editTodoId: null,
  };

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleAdd = () => {
    const { newTodo, todos } = this.state;
    if (newTodo.trim() === "") return;

    this.setState({
      todos: [...todos, { text: newTodo }],
      newTodo: "",
    });
  };

  handleDelete = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  handleEdit = (id) => {
    const todoToEdit = this.state.todos.find((todo) => todo.id === id);
    this.setState({
      editTodoId: id,
      newTodo: todoToEdit.text,
    });
  };

  handleUpdate = () => {
    const { editTodoId, newTodo } = this.state;
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === editTodoId ? { ...todo, text: newTodo } : todo
    );

    this.setState({
      todos: updatedTodos,
      newTodo: "",
      editTodoId: null,
    });
  };

  render() {
    const { newTodo, todos, editTodoId } = this.state;

    return (
      <div className="todo-container">
        <h1>Todo App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Add Todo"
            value={newTodo}
            onChange={this.handleChange}
          />
          <button onClick={this.handleAdd}>Add Item</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => this.handleDelete(todo.id)}>Delete</button>
              <button onClick={() => this.handleEdit(todo.id)}>Edit</button>
            </li>
          ))}
        </ul>
        {editTodoId && (
          <div className="edit-container">
            <input type="text" value={newTodo} onChange={this.handleChange} />
            <button onClick={this.handleUpdate}>Update</button>
          </div>
        )}
      </div>
    );
  }
}
