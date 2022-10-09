import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';

function LinkCard(props) {
    return (
        <Fragment>
                <li className="sidebar-nav-item">
                    <Link Link to={`${props.link}`} exact="true" className='sidebar-link'>
                        <span className='sidebar-span'>
                            <i className={`sidebar-icon fas fa-${props.icon}`}></i>
                            {props.text}
                        </span>
                    </Link>
                </li>
                <hr className="sidebar-divider"/>
        </Fragment>
    )
}

export default LinkCard

