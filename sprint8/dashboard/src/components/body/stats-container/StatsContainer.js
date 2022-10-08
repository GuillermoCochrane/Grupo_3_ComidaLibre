import React, {Fragment} from 'react';
import StatsCard from './StatsCard'
import './statsContainer.css'

let data=[
  {
    title: 'total usuarios',
    count: 999,
    icon: 'users',
    color: 'red',
  },
  {
    title: 'total productos',
    count: 999,
    icon: 'gift',
    color: 'yellow',
  },
  {
    title: 'ventas realizadas',
    count: 999,
    icon: 'card',
    color: 'lighterBrown',
  }
]

function StatsContainer() {
  return (
    <Fragment>
      <div className="stats-container">
              {
                data.map((item, i) => {
                    return <StatsCard {...item} key = {`Stats-${i}`} />
                    })
                }
      </div>
    </Fragment>
  )
}

export default StatsContainer