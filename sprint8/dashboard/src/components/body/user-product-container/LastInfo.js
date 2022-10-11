import React, {Fragment} from 'react';

function LastInfo(props) {
  return (
    <Fragment>
        <p className="last-info">
            <strong>
                {props.title} 
            </strong> {props.data}
        </p>

    </Fragment>
  )
}

export default LastInfo