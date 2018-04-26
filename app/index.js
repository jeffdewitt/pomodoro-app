import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'
import { PomodoroContainer, TodosContainer } from 'containers'
import { appContainer, divider } from 'components/sharedStyles.css'

const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

ReactDOM.render(
  <Provider store={store}>
    <div className={`${appContainer}`}>
      <PomodoroContainer />
      <div className={divider}><hr/></div>
      <TodosContainer />
    </div>
  </Provider>,
  document.getElementById('app')
)
