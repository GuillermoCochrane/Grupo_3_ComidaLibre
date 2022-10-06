import React, {Fragment} from 'react'

function UserProductContainer() {
  return (
    <Fragment>
        <div className="user-product-container">
            <div className="last-user-container">
                <div className="card">
                    <h2>Ultimo usuario</h2>
                    <img src="" alt="user-img"/>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis aperiam molestias nulla distinctio nesciunt, quod dignissimos at sint eveniet, quaerat amet ipsa aspernatur consectetur. Beatae et aspernatur voluptatem consectetur reprehenderit?</p>
                </div>
            </div>
            <div className="last-product-container">
                <div className="card">
                    <h2>Ultimo producto</h2>
                    <img src="" alt="user-img"/>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis aperiam molestias nulla distinctio nesciunt, quod dignissimos at sint eveniet, quaerat amet ipsa aspernatur consectetur. Beatae et aspernatur voluptatem consectetur reprehenderit?</p>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default UserProductContainer