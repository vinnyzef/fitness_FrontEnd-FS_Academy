import React from 'react'
import './styles/Attributes.css'

function Attributes() {
  return (
    <div>

        <ul className='attributes_list'>
            <li>Name: Balbreth</li>
            <li>Health: 40 hp</li>
            <li>Power: 7/10</li>
            <li>Stealth: 3/10</li>
            <li>Charisma: 9/10</li>

            <button onClick={()=>{localStorage.removeItem('avatar')}}>CLOSE </button>
        </ul>
    </div>
  )
}

export default Attributes