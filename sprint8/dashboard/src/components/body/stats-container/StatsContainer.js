import React, {Fragment} from 'react'
import './statsContainer.css'

function StatsContainer() {
  return (
    <Fragment>
      <div className="stats-container">
          <div className="stats-card">
              <p>total usuarios 999</p>
          </div>
          <div className="stats-card">
              <p>total products 999</p>
          </div>
          <div className="stats-card">
              <p>ventas realizadas 999</p>
          </div>
      </div>
    </Fragment>
  )
}

export default StatsContainer