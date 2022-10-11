import React, {Fragment} from 'react';

function LastTitle(props) {
  return (
    <Fragment>
        <h1>Ultimo {props.title}:  {props.id}</h1>
    </Fragment>
  )
}

export default LastTitle