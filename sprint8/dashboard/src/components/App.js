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
          <TopBar/>
          <div id="content-wrapper" className="content-wrapper">

            <SideBar/>
            <SearchContainer/>
            <Footer/>
            <MainRouter/>
          
          </div>
    </Fragment>
  );
}

export default App;
