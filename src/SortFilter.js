// import Sort from './Sort';
// import Filter from './Filter';
import React, { useEffect, useState } from "react";
import {items} from "./listings.js";

export default function SortFilter() {
// hiding for now to prevent errors in console while inactive;
    // const [sortOptions, setSortOptions] = useState("Recommended");
    // const [typeOptions, setTypeOptions] = useState("");
    // const [brandOptions, setBrandOptions] = useState("");
    // const [colourOptions, setColourOptions] = useState("");
    // const [fitOptions, setFitOptions] = useState("");
    // const [priceOptions, setPriceOptions] = useState("");
    // const [filterActive, setFilterActive] = useState(false);
    const [currentDropdown, setCurrentDropdown] = useState("");

    const [brands, setBrands] = useState(null);
    const [colours, setColours] = useState(null);
    const [fits, setFits] = useState(null);
    const [prices, setPrices] = useState(null);

    //which one is open
    //what is selected in each one?
    //class for open menu - open vs closed
    //class for closed menu with category selected vs none select
    //filter - are any of the others, except sort,  selected?

    useEffect(() => {
        const brandList = extractValues("brand"); 
        setBrands(brandList);
        const colourList = extractValues("colour"); 
        setColours(colourList);
        const fitList = extractValues("fit"); 
        setFits(fitList);
        const pricesList = extractValues("price"); 
        setPrices(pricesList);
    }, []);

    function extractValues(key) {
        // for (let i = 0; i < items.length; i++) {
        //     let dupeCount;
        //     if (dataChunk.includes(items[i][key])) dupeCount++;
        //     if (!items[i][key]) continue;
        //     dataChunk.push(items[i][key]);
        // }
        // let dataChunk = [];

        let hash = {};

        for (let i = 0; i < items.length; i++) {
            const targetKey = items[i][key];
            // console.log(targetKey)
            if (!targetKey) continue;
            if (Object.hasOwn(hash, targetKey)) {
                hash[targetKey]++
                // console.log(hash[targetKey]);
            } else {
                hash[targetKey] = 1;
                console.log(`${targetKey} = ${hash[targetKey]}`)

            }
        }
        console.log(hash);
        return hash;

        /* 
            brands[0] + key[0]
        */
    }

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
                        <div className={`dropdown desktop ${currentDropdown === "type"? "open": "closed"}`}>
                            <ul>
                                {/* {brands ? 
                                    brands.map((brand, index) => <li value={brand} key={index}>{brand}</li>) 
                                : "" } */}
                                {/* [{brand1, count1}, {brand2, count2}] 
                                */}

                                {/* {brands ? 
                                    brands.map((brand, index) => <li value={brand} key={index}>{brand}</li>) 
                                : "" } */}

                            </ul>
                        </div>
                    </button>
                    <button className={`colour select ${currentDropdown === "colour"? "open": "closed"}`} onClick={() => handleClick("colour")}>
                        <div className="wrapper">
                            <p>Colour</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "type"? "open": "closed"}`}>
                            <ul>
                                {/* {colours ? 
                                    colours.map((colour, index) => <li value={colour} key={index}>{colour}</li>) 
                                : "" } */}
                            </ul>
                        </div>

                    </button>
                    <button className={`fit select ${currentDropdown === "fit"? "open": "closed"}`} onClick={() => handleClick("fit")}>
                        <div className="wrapper">
                            <p>Body Fit</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "type"? "open": "closed"}`}>
                            <ul>
                                {/* {fits ? 
                                    fits.map((fit, index) => <li value={fit} key={index}>{fit}</li>) 
                                : "" } */}
                            </ul>
                        </div>
                        
                    </button>
                    <button className={`price select ${currentDropdown === "price"? "open": "closed"}`} onClick={() => handleClick("price")}>
                        <div className="wrapper">
                            <p>Price Range</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "type"? "open": "closed"}`}>
                            <ul>
                                {/* {prices ? 
                                    prices.map((price, index) => <li value={price} key={index}>{price}</li>) 
                                : "" } */}
                            </ul>
                        </div>
                    </button>
            </div>
        </section>
    )
}
