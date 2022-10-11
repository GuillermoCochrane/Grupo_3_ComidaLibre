import React, {Fragment} from 'react';

function LastImg(props) {
  return (
    <Fragment>
        <img id src={props.img}  alt={props.name} className='last-img'/>        
    </Fragment>
  )
}

export default LastImg