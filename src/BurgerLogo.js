import React from 'react';
import Burger from './Burger';
import logo from './imagesBank/Asos2.png';

function BurgerLogo() {
  return (
    <div className="burgerlogo">
      <Burger/>
      <div className="logo">
        <img src={logo} alt="logo"/> 
      </div> 
      <div className="gender women"><p>WOMEN</p></div>
      <div className="gender men"><p>MEN</p></div> 
    </div>
  )
}

export function BurgerLogoDesktop() {
  return (
    <div className="burgerlogodesktop">
      <div className="logo">
        <img src={logo} alt="logo"/> 
      </div> 
    </div>
  )
}

export default BurgerLogo
