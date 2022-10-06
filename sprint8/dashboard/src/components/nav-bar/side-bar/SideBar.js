import React, {Fragment} from 'react';
import { Link } from 'react-router-dom'; 
// import logo from '../../../assets/images/FreeFood2f';

function SideBar(){

        return (
            <Fragment>
                <div className="sidebar">
                    <div className="logo">
                        <img src="" alt="logo" />
                    </div>
                    <div className="nav-links">
                        <Link Link to="/" exact="true" className="nav-link">home</Link>
                        <Link Link to="/" exact="true" className="nav-link">search</Link>
                        <Link Link to="/" exact="true" className="nav-link">agregar producto</Link>
                        <Link Link to="/" exact="true" className="nav-link">products</Link>
                        <Link Link to="/" exact="true" className="nav-link">users</Link>
                    </div>
                </div>
            </Fragment>
        )
        
        }

export default SideBar