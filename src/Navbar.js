import BurgerLogo from './BurgerLogo';
import SearchBasket from './SearchBasket';

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="container"> 
                <BurgerLogo/> 
                <form onSubmit={(event) => event.preventDefault} role="search"> 
                    {/* <label for="search">Search for stuff</label> */}
                    <input id="search" type="search" placeholder="Search for items and brands" autoFocus required />
                    <button type="submit"><img className="searchbar-search"src="./imageBank/search-desktop-nobackground.png" alt="search button"/></button>    
                    {/* <img src="./imageBank/search-desktop.png" alt="search button"/> */}
                </form>


                <SearchBasket/> 
            </div>
        </nav>
    )

}


