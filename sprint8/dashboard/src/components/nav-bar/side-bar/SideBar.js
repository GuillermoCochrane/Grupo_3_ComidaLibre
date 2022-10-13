import React, {Fragment} from 'react';
import LinkCard from './LinkCard';
import './sidebar.css';

let linksData = [
    {
        link: '/',
        text: 'Home',
        icon: 'home'
    },
    {
        link: '/',
        text: 'Search',
        icon: 'search'
    },
    {
        link: '/create',
        text: 'Agregar Producto',
        icon: 'cart-plus'
    },
    {
        link: '/products/',
        text: 'Productos',
        icon: 'gifts'
    },
    {
        link: '/users/',
        text: 'Usuarios',
        icon: 'users'
    },    
]

function SideBar(){

        return (
            <Fragment>                
                <ul className="sidebar-container">

                    <hr className="sidebar-divider"/>

                    {
                    linksData.map((item, i) => {
                        return <LinkCard {...item} key = {`linkCard-${i}`} />
                        })
                    }

                </ul>                
            </Fragment>
            )
        }

export default SideBar;