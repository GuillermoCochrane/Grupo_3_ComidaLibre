import React, {Fragment} from 'react';
import SideBar from './nav-bar/side-bar/SideBar';
import Footer from './body/footer/Footer';
import SearchContainer from './body/search-container/SearchContainer';
import './app.css'

import TopBar from './nav-bar/top-bar/TopBar';

import MainRouter from '../router/MainRouter'
// import SidebarRouter from '../router/SidebarRouter';

function App() {
  return (
    <Fragment>
          <TopBar className="header"/>
          <div id="content-wrapper" className="content-wrapper">
            <SideBar/>
              <div className="main-content">
                <SearchContainer/>
                <MainRouter/>
              </div>
          </div>
          <Footer/>
    </Fragment>
  );
}

export default App;
