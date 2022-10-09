import React, {Fragment} from 'react';
import InfoCard from './InfoCard'
import './infoContainer.css'

function InfoContainer(props) {
    return (
    
        <Fragment>
            <div className="info-card-container-border">						
                <div className="info-card-container-container">
                    <div className="info-card-container-title-container">
                        <h5 className="info-card-container-title" >{props.title}</h5>
                    </div>
                    <div className="info-card-container-card-container">
                        <div className="info-card-container-card-row">
                        {
                            props.info.map((item, i) => {
                                return <InfoCard {...item} key = {`${props.title}-${i}`}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default InfoContainer