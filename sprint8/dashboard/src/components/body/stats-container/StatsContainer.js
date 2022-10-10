import React, {Fragment, useState, useEffect} from 'react'
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
    color: 'lightBrown',
  }
]

function StatsContainer() {

  const [productCount, setProductCount] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [salesCount, setSalesCount] = useState([]);

  useEffect(() => {
		const endpoint = 'http://localhost:3000/api/products'
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setProductCount(data.count);
        })
        .catch(error => console.log(error));
		
	}, []);

  useEffect(() => {
		const endpoint1 = 'http://localhost:3000/api/users'
		
        fetch(endpoint1)
        .then(response => response.json())
        .then(data => {
            setUserCount(data.count);
        })
        .catch(error => console.log(error));
		
	}, []);

  useEffect(() => {
		const endpoint = 'http://localhost:3000/api/products/sales'
		
        fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            setSalesCount(data.total);
        })
        .catch(error => console.log(error));
		
	}, []);

  data[0].count=userCount
  data[1].count=productCount
  data[2].count=salesCount

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