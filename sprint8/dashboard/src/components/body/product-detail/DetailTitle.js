import React, {Fragment} from 'react';

function DetailTitle(props) {
  return (
    <Fragment>
        <h1>Detalle del {props.title}:  {props.id}</h1>
    </Fragment>
  )
}

export default DetailTitle