// import Sort from './Sort';
// import Filter from './Filter';
import React, { useState } from "react";

export default function SortFilter() {
    const [sortOptions, setSortOptions] = useState("Recommended");
    const [typeOptions, setTypeOptions] = useState("");
    const [brandOptions, setBrandOptions] = useState("");
    const [colourOptions, setColourOptions] = useState("");
    const [fitOptions, setFitOptions] = useState("");
    const [priceOptions, setPriceOptions] = useState("");
    const [filterActive, setFilterActive] = useState(false);
    const [currentDropdown, setCurrentDropdown] = useState("");

    //which one is open
    //what is selected in each one?
    //class for open menu - open vs closed
    //class for closed menu with category selected vs none select
    //filter - are any of the others, except sort,  selected?

    function handleClick(buttonName) {
        setCurrentDropdown(buttonName);
    }

    return (
        <section className="sort-filter">
            <div className="container">
                    <button className={`sort select ${currentDropdown === "sort"? "open": "closed"}`} onClick={() => handleClick("sort")}>
                        <div className="wrapper" >
                            <p className="mobile">SORT</p>
                            <p className="desktop">Sort</p>
                            <img src="./imageBank/down-arrow.png" alt="" />
                        </div>
                        <div className="dropdown desktop">
                            {/* <div>hello</div> */}
                            <ul>
                                <li value="recommended">Recommended</li>
                                <li value="new">What's new</li>
                                <li value="price-descending">Price high to low</li>
                                <li value="price-ascending">Price low to high</li>
                            </ul>
                        </div>
                    </button>

                    <button className={`filter select ${currentDropdown === "filter"? "open": "closed"}`} onClick={() => handleClick("filter")}>
                        <div className="wrapper">
                            <p>FILTER</p>
                            {/* insert tick mark which becomes visible when filter selected */}
                        </div>
                    </button>
                    <button className={`type select ${currentDropdown === "type"? "open": "closed"}`} onClick={() => handleClick("type")}>
                        <div className="wrapper">
                            <p>Product Type</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "type"? "open": "closed"}`}>
                            {/* <div>hello</div> */}
                            <ul>
                                <li value="dresses">Dresses</li>
                                <li value="blazers">Blazers</li>
                                <li value="skirts">Skirts</li>
                                <li value="tops">Tops</li>
                                <li value="shoes">Shoes</li>


                            </ul>
                        </div>
                    </button>
                    <button className={`brand select ${currentDropdown === "brand"? "open": "closed"}`} onClick={() => handleClick("brand")}>
                        <div className="wrapper">
                            <p>Brand</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                    </button>
                    <button className={`colour select ${currentDropdown === "colour"? "open": "closed"}`} onClick={() => handleClick("colour")}>
                        <div className="wrapper">
                            <p>Colour</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                    </button>
                    <button className={`fit select ${currentDropdown === "fit"? "open": "closed"}`} onClick={() => handleClick("fit")}>
                        <div className="wrapper">
                            <p>Body Fit</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                    </button>
                    <button className={`price select ${currentDropdown === "price"? "open": "closed"}`} onClick={() => handleClick("price")}>
                        <div className="wrapper">
                            <p>Price Range</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                    </button>
            </div>
        </section>
    )
}
