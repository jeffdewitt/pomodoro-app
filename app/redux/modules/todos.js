import { generateUUID } from 'helpers/utils'

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const UPDATE_INPUT = 'UPDATE_INPUT'

export function addTodo (todo) {
  return {
    type: ADD_TODO,
    todo,
    uuid: generateUUID()
  }
}

export function removeTodo (index) {
  return {
    type: REMOVE_TODO,
    index
  }
}

export function toggleTodo (index, complete) {
  return {
    type: TOGGLE_TODO,
    index,
    complete
  }
}

export function updateInput (input) {
  return {
    type: UPDATE_INPUT,
    input
  }
}

export default function todos (state = { todos: [], input: '' }, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            todo: action.todo,
            uuid: action.uuid,
            complete: false
          }
        ],
        input: ''
      }
    case REMOVE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, action.index),
          ...state.todos.slice(action.index + 1)
        ]
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo, index) => {
          return (index === action.index) ? {...todo, complete: action.complete} : todo
        })
      }
    case UPDATE_INPUT:
      return {
        ...state,
        input: action.input
      }
    default :
      return state
  }
}
