import React from 'react';
import imagenFondo from '../../assets/images/404.png';

function NotFound(){
    return(
        <div className="text-center">
            <h1 style={{padding: 2 + 'rem'}} >404 Not Found </h1>
            <img src={imagenFondo} alt="not found" className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 80 +'rem', display:"block",  alignItems: "center", margin: "auto"}}  />
        </div>
    )
}


export default NotFound;