import React, {Fragment} from 'react';

function DetailImg(props) {
  return (
    <Fragment>
        <img id="main-image" src={props.img}  alt={props.name}/>
    </Fragment>
  )
}

export default DetailImg