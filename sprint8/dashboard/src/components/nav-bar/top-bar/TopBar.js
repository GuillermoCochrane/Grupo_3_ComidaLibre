import React, {Fragment} from 'react';
import './topBar.css'
import logo from '../../../assets/images/FreeFood2.png';
import userImage from '../../../assets/images/user.png';

function TopBar () {

    return(
        <Fragment>
            <header className="header">
                <div className="topbar-logo">
                    <img src={logo} alt="logo" className='logo-image'/>
                </div>
                <div className="profile-info">
                    <img src={userImage} alt="pf-pic" className='profile-image'/>
                    <p>username</p>
                </div>
            </header>
        </Fragment>
    )

}

export default TopBar