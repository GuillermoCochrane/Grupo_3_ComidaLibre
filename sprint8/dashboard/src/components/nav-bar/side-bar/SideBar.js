import React, {Fragment, useRef} from 'react';
import LinkCard from './LinkCard';
import './sidebar.css';


let linksData = [
    {
        link: '/',
        text: 'Home',
        icon: 'home'
    },
    {
        link: '/search/',
        text: 'Búsqueda',
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
    const sideBar = useRef();
    const hideBTN = useRef();
    const showBTN = useRef();
    const BTN =useRef()

    const toggle = () =>{
        console.log(sideBar.current)
        sideBar.current.classList.toggle('active')
        hideBTN.current.classList.toggle('hide')
        showBTN.current.classList.toggle('hide')
    }

        return (
            <Fragment>                
                <ul className="sidebar-container" ref={sideBar}>
                    <br/>
                    <div className='sidebar-toggleBTN' ref={BTN} onClick={toggle}>
                        <i class="fas fa-angle-double-left hide" ref={hideBTN}></i>
                        <i class="fas fa-angle-double-right" ref={showBTN} > </i>
                    </div>

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