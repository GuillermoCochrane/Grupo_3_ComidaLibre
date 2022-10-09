import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';

function LinkCard(props) {
    return (
        <Fragment>
            <li className="nav-link">
                <Link Link to={`${props.link}`} exact="true" >
                    <span>
                        <i className={`fas fa-${props.icon}`}></i>
                        {props.text}
                    </span>
                </Link>
            </li>
        </Fragment>
    )
}

export default LinkCard