import React, {Fragment} from 'react';
import LinkCard from './LinkCard';
import './sidebar.css'

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
        link: '/',
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
                <div className="sidebar">                    
                    <ul className="nav-links">

                        {
                        linksData.map((item, i) => {
                            return <LinkCard {...item} key = {`linkCard-${i}`} />
                            })
                        }

                    </ul>
                </div>
            </Fragment>
            )
        }

export default SideBar