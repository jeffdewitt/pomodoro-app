import React from 'react'
import { Pomodoro } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import * as pomodoroActionCreators from 'redux/modules/pomodoro'
import startWork from 'assets/startwork.mp3'
import startBreak from 'assets/startbreak.mp3'
import { WORK, SHORT_BREAK, LONG_BREAK } from 'config'

class PomodoroContainer extends React.Component {
  state = {
    startWorkNotification: new Audio(startWork),
    startBreakNotification: new Audio(startBreak)
  }

  static propTypes = {
    timer: PropTypes.number.isRequired,
    round: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.duration === WORK && (this.props.duration === SHORT_BREAK || this.props.duration === LONG_BREAK)) {
      this.state.startBreakNotification.play()
    } else if ((prevProps.duration === SHORT_BREAK || prevProps.duration === LONG_BREAK) && this.props.duration === WORK) {
      this.state.startWorkNotification.play()
    }
  }

  render () {
    return (
      <Pomodoro {...this.props}>
        <audio ref={(startwork) => { this.startwork = startwork }}>
          <source src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" type="audio/mpeg" ></source>
        </audio>
      </Pomodoro>
    )
  }
}

function mapStateToProps ({pomodoro}) {
  return {
    timer: pomodoro.timer,
    round: pomodoro.round,
    duration: pomodoro.duration
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(pomodoroActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PomodoroContainer)
