import React, {Fragment} from 'react';
import propTypes from 'prop-types';
import './infoCard.css'

function InfoCard(props) {
  return (
    <Fragment>
        <div className="info-card-container">
                <div className={`info-card info-${props.color} info-background-${props.backgroundColor}`}>
                    <div className="info-card-data">
                        {props.name}: {props.count}
                    </div>
                </div>
            </div>
    </Fragment>
  )
}

InfoCard.propTypes = {
    color: propTypes.string.isRequired,
    backgroundColor: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
}

InfoCard.defaultProps = {
        name: 'Not Found',
        count: 0,
        color: 'darkBrown',
        backgroundColor: 'gray'
    }

export default InfoCard