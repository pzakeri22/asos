import React from 'react'
import './Home.scss'; 
import Banner from './Banner.js';
import SearchResults from './SearchResults';
import Navbar from './Navbar.js';
import Footer from './Footer';
import SortFilter from './SortFilter';
import Departmentbar from './Departmentbar'

//https://stackoverflow.com/questions/41478875/creating-different-mobile-layout-for-a-component-in-reactjs




//hover basket only works on desktop


function Home() {
  return (
    <div>
      <Navbar/>
      <Departmentbar/>
      <Banner/>
      <SortFilter/>
      <SearchResults/>
      <Footer/>
    </div>  
  )
}


export default Home;
