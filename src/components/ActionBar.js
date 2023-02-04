import React from 'react'
import './styles/ActionBar.css'

function ActionBar() {

  return (
    <div className='action_wrap'>
        <button className='action_button'>Attack</button>
        <button className='action_button'>Interrogate</button>
        <button className='action_button'>Retreat</button>
    </div>
  )
}

export default ActionBar