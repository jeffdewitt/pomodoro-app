import React from 'react'
import { Todos } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as todosActionCreators from 'redux/modules/todos'

class TodosContainer extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    input: PropTypes.string.isRequired
  }

  render () {
    return (
      <Todos {...this.props}/>
    )
  }
}

function mapStateToProps ({todos}) {
  return {
    todos: todos.todos,
    input: todos.input
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(todosActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer)
