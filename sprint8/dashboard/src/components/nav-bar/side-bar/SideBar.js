import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import '../side-bar/sidebar.css'
// import logo from '../../../assets/images/FreeFood2f';

function SideBar(){

        return (
            <Fragment>
                <div className="sidebar">
                    <div className="logo">
                        <img src="" alt="logo" />
                    </div>
                    <ul className="nav-links">

                        <li className="nav-link">
                            <Link Link to="/" exact="true" >
                                <span>
                                    home
                                </span>
                            </Link>
                        </li>

                        <li className="nav-link">
                            <Link Link to="/" exact="true">
                                <span>
                                    search
                                </span>
                            </Link>
                        </li>

                        <li className="nav-link">
                            <Link Link to="/" exact="true">
                                <span>
                                    agregar producto
                                </span>
                            </Link>
                        </li>

                        <li className="nav-link">
                            <Link Link to="/products/" exact="true" >
                                <span>
                                    products
                                </span>
                            </Link>
                        </li>

                        <li className="nav-link">
                            <Link Link to="/users/" exact="true" >
                                <span>
                                    users
                                </span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </Fragment>
        )
        
        }

export default SideBar