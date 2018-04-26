import React from 'react'
import { Button } from 'components'
import { todoContainer, todoList, removeButton, strike } from './styles.css'
import { inputContainer, inputField } from '../sharedStyles.css'
import PropTypes from 'prop-types'

Todos.propTypes = {
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  updateInput: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
  input: PropTypes.string.isRequired
}

export default function Todos ({addTodo, removeTodo, toggleTodo, updateInput, todos, input}) {
  const handleAddTodo = () => {
    if (input) addTodo(input)
  }

  return (
    <section className={todoContainer}>
      <h2>Todos</h2>
      <div className={inputContainer}>
        <input
          className={inputField}
          type="text"
          value={input}
          onChange={(e) => updateInput(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter') ? handleAddTodo() : ''}
        />
        <Button label="Add Todo" action={handleAddTodo}/>
      </div>
      <ul className={todoList}>
        {todos.map((todo, index) => {
          return <Todo
            key={todo.uuid}
            todo={todo}
            toggle={toggleTodo}
            remove={removeTodo}
            index={index}/>
        })}
      </ul>
    </section>
  )
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
}

function Todo ({todo, toggle, remove, index}) {
  var handleChange = () => {
    toggle(index, !todo.complete)
  }

  var handleRemove = () => {
    remove(index)
  }
  return (
    <li>
      <input type="checkbox" checked={todo.complete} onChange={handleChange}/>
      <span className={todo.complete ? strike : ''}>{todo.todo}</span>
      <Button label="Remove" action={handleRemove} override={removeButton}/>
    </li>
  )
}
