import React, {Fragment} from 'react'
import './statsCard.css'

function StatsCard(props) {
  return (
    <Fragment>
         <div className="card-container">{/*col-md-4 mb-4 */}
                <div className={`card-border border-${props.color}`}>{/* {`card border border-${props.color}`}  .border-left-primary py-2 h-100 shadow card*/}
                    <div className="card-body">
                        <div className="card-info-container">{/*  row no-gutters align-items-center */}
                            <div className="card-info-border"> {/* col mr-2 */}
                                <div className={`card-title ${props.color}`}>{props.title}</div>{/* {`card-title ${props.color}`}  */}
                                <div className="card-count">{props.count}</div>{/* h5 mb-0 font-weight-bold text-gray-800 */}
                            </div>
                            <div className="icon-container">
                                <i className={`fas fa-film fa-${props.icon} ${props.color}`}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
    </Fragment>
  )
}

export default StatsCard
