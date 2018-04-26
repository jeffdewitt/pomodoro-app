import React from 'react'
import PropTypes from 'prop-types'
import { button } from './styles.css'

Button.propTypes = {
  label: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  override: PropTypes.string
}

export default function Button ({label, action, override}) {
  return (
    <button className={`${button} override ${override}`} onClick={action}>{label}</button>
  )
}
