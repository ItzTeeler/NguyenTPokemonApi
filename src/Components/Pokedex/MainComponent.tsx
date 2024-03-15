import React from 'react'

const MainComponent = () => {
  return (
    <div>
      <button className='sidebar-toggle'>
        <span>Symbol</span>
      </button>
      <nav className='nav'>
        <div className='logo'>The company</div>
        <ul>
            <li>
                <a className='links'></a>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default MainComponent
