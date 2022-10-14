import React, {Fragment} from 'react';
import SideBar from './nav-bar/side-bar/SideBar';
import Footer from './body/footer/Footer';

import TopBar from './nav-bar/top-bar/TopBar';
import MainRouter from '../router/MainRouter';
import './app.css';

function App() {
  return (
    <Fragment>
          <TopBar/>
          <div id="content-wrapper" className="content-wrapper">
            <SideBar/>
              <div className="main-content">
                <MainRouter/>
              </div>
          </div>
          <Footer/>
    </Fragment>
  );
}

export default App;
