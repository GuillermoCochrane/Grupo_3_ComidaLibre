import React, {Fragment} from 'react';

function DetailInfo(props) {
  return (
    <Fragment>

        <p className="name">
            <strong>
                {props.title} 
            </strong> {props.data}
        </p>

    </Fragment>
  )
}

export default DetailInfo