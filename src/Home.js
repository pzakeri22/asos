import React from 'react'
import './Home.scss'; 
import Banner from './Banner.js';
import SearchResults from './SearchResults';
import Navbar from './Navbar.js';
import Footer from './Footer';
import SortFilter from './SortFilter';
import Departmentbar from './Departmentbar'
import TopInfo from './TopInfo';
import Breadcrumbs from './Breadcrumbs';

//https://stackoverflow.com/questions/41478875/creating-different-mobile-layout-for-a-component-in-reactjs


//hover basket only works on desktop


function Home() {
  return (
    <div>
      <TopInfo/>
      <Navbar/>
      <Departmentbar/>
      <Breadcrumbs/>
      <Banner/>
      <SortFilter/>
      <SearchResults/>
      <Footer/>
    </div>  
  )
}


export default Home;
