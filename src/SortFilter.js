// import Sort from './Sort';
// import Filter from './Filter';
import React, { useEffect, useState } from "react";
import {items} from "./listings.js";
import MinimumDistanceSlider from './PriceFilter.js';

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
    const [fullPriceRange, setFullPriceRange] = useState([]);//causing the 5 minimum distance to break
    const [chosenPriceRange, setChosenPriceRange] = useState([]); 
    const [activePriceFilter, setActivePriceFilter] = useState(null);
    const minDistance = 5;
    //which one is open
    //what is selected in each one?
    //class for open menu - open vs closed
    //class for closed menu with category selected vs none select
    //filter - are any of the others, except sort,  selected?


    useEffect(() => {
        let brandList = extractWordFilters("brand"); 
        brandList = sortArrAscending(brandList);
        setBrands(brandList);
        let colourList = extractWordFilters("colour"); 
        colourList = sortArrAscending(colourList);
        setColours(colourList);
        let fitList = extractWordFilters("fit"); 
        fitList = sortArrAscending(fitList);
        setFits(fitList);
        let pricesList = extractPriceFilters("price"); 
        setFullPriceRange(pricesList);
        setChosenPriceRange(pricesList);
    }, []);
    

    function sortArrAscending(arr) {
        return arr.sort();
    }

    function extractWordFilters(key) {
        let hash = {};
        for (let i = 0; i < items.length; i++) {
            let targetVal = items[i][key];
            if (!targetVal) continue;
            if (typeof targetVal === "string") {
                let wordSplit = targetVal.toLowerCase().split(' ');
                for (let i=0; i<wordSplit.length; i++) {
                    wordSplit[i] = `${wordSplit[i].substring(0, 1).toUpperCase()}${wordSplit[i].substring(1)}`;
                }
                targetVal = wordSplit.join(' ');
            }
            if (Object.hasOwn(hash, targetVal)) {
                hash[targetVal]++;
            } else {
                hash[targetVal] = 1;
            }
        }
        let pairsArr = Object.entries(hash);
        return pairsArr;
    }

    function extractPriceFilters(key) {
        let lowestPrice = items[0][key];
        let highestPrice = items[0][key];
        for (let i = 1; i < items.length; i++) {
            if (items[i][key] > highestPrice) highestPrice=items[i][key];
            if (items[i][key] < lowestPrice) lowestPrice=items[i][key];
        }
        return [lowestPrice, highestPrice];
    }

    function handleClick(buttonName) {
        setCurrentDropdown(buttonName);
    }

    function storePriceChange(event, newValue, activeThumb) {
        // triggers when price filter is first clicked or if value changes

        console.log(123);
        if (!Array.isArray(newValue)) {
            return;
        }
        const highestLimit = Math.round((chosenPriceRange[1] - minDistance) * 100) / 100;
        const lowestLimit = Math.round((chosenPriceRange[0] + minDistance) * 100) / 100;
        
        const lowestPriceLabel = document.querySelector(".price-label > .lowest");
        const highestPriceLabel = document.querySelector(".price-label > .highest");

        // store in state which thumb is pressed. depending on which thumb in pressed, (onmousedown)

        if (activeThumb === 0) {
            lowestPriceLabel.style.color="blue";
            setChosenPriceRange([Math.min(newValue[0], highestLimit), chosenPriceRange[1]]);
        } else {
            highestPriceLabel.style.color="blue";
            setChosenPriceRange([chosenPriceRange[0], Math.max(newValue[1], lowestLimit)]);
        }

        lowestPriceLabel.style.color="black";
        highestPriceLabel.style.color="black";

    }

    const usePriceFilter = (e) => {
        // what, if anything, should go in state. The fact that mouseup or mousedown is activated? Maybe, but we also need to store which event it is tied to as well. 
        // triggers when mouse is down on price filter, or mouse is released from price filter
        const leftPriceThumb = document.querySelector('[data-index="0"]');
        const rightPriceThumb = document.querySelector('[data-index="1"]');
        const lowestPriceLabel = document.querySelector(".price-label > .lowest");
        const highestPriceLabel = document.querySelector(".price-label > .highest");

        // console.log(e.type);
        if (e.type === "mousedown") {
            if ( leftPriceThumb.classList.contains("Mui-active") ) {
                setActivePriceFilter("left");
                lowestPriceLabel.style.colour="blue";
            }; 
             if ( rightPriceThumb.classList.contains("Mui-active") ) {
                setActivePriceFilter("right");
                highestPriceLabel.style.colour="blue";
            }; 
        }

        if (e.type === "mouseup") {
            if ( !leftPriceThumb.classList.contains("Mui-active") ) {
                setActivePriceFilter(null);
                lowestPriceLabel.style.colour="black";
            }; 
             if ( !rightPriceThumb.classList.contains("Mui-active") ) {
                setActivePriceFilter(null);
                highestPriceLabel.style.colour="black";
            }; 
        }
        /* 

        */
    
        // if (pricethumb1active) {lowestPriceLabel.style.colour="blue";}
        // if (leftPriceThumb. ) {
    
        // }
        // if (pricethumb1active) {lowestPriceLabel.style.colour="blue";}
    
        /* 
        event listener - press and hold - if press and hold on thumb, (will still need to check which one is active) change colour of price label. How know which thumb it is?
        when mui-active label is visible on thumb (or in general), (will still need to check which one is active) change colour of price label. Else if its not, make it black
        NO - when entering handleChange function, change colour of price label. then when leaves, change it back? 
        */



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
                            <div className="overview"></div>
                            <ul>
                                <li value="dresses">Dresses &nbsp;(3)</li>
                                <li value="blazers">Blazers &nbsp;(1)</li>
                                <li value="skirts">Skirts &nbsp;(1)</li>
                                <li value="tops">Tops &nbsp;(1)</li>
                                <li value="shoes">Shoes &nbsp;(2)</li>
                            </ul>
                        </div>
                    </button>
                    <button className={`brand select ${currentDropdown === "brand"? "open": "closed"}`} onClick={() => handleClick("brand")}>
                        <div className="wrapper">
                            <p>Brand</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "type"? "open": "closed"}`}>
                        <div className="overview"></div>
                            <ul>
                                {brands? 
                                   brands.map((brand, index) => <li value={brand[0]} key={index}>{brand[0]}&nbsp;&nbsp;{`(${brand[1]})`}</li>) 
                                : ""}
                            </ul>
                        </div>
                    </button>
                    <button className={`colour select ${currentDropdown === "colour"? "open": "closed"}`} onClick={() => handleClick("colour")}>
                        <div className="wrapper">
                            <p>Colour</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "type"? "open": "closed"}`}>
                            <div className="overview"></div>
                            <ul>
                                {colours ? 
                                    colours.map((colour, index) => <li value={colour[0]} key={index}><div className={`${colour[0].toLowerCase()} sample`}></div>{colour[0]}&nbsp;&nbsp;{`(${colour[1]})`}</li>) 
                                : "" }
                            </ul>
                        </div>

                    </button>
                    <button className={`fit select ${currentDropdown === "fit"? "open": "closed"}`} onClick={() => handleClick("fit")}>
                        <div className="wrapper">
                            <p>Body Fit</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "type"? "open": "closed"}`}>
                            <div className="overview"></div>
                            <ul>
                                {fits ? 
                                    fits.map((fit, index) => <li value={fit[0]} key={index}>{fit[0]}&nbsp;&nbsp;{`(${fit[1]})`}</li>) 
                                : "" }

                            </ul>
                        </div>
                        
                    </button>
                    <button className={`price select ${currentDropdown === "price"? "open": "closed"}`} onClick={() => handleClick("price")}>
                        <div className="wrapper">
                            <p>Price Range</p>
                            <img src="./imageBank/down-arrow.png" alt=""/>
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "type"? "open": "closed"}`}>
                            <div className="overview"></div>
                            <ul>
                                <li>
                                    <div className="price-label">
                                        <div className="lowest">£{chosenPriceRange[0]}</div>
                                        <div className="highest">£{chosenPriceRange[1]}</div>
                                    </div>
                                    <MinimumDistanceSlider
                                    storePriceChange={storePriceChange} 
                                    chosenPriceRange={chosenPriceRange}
                                    fullPriceRange={fullPriceRange}
                                    usePriceFilter={usePriceFilter}
                                    />
                                </li>
                            </ul>
                        </div>
                    </button>

            </div>
        </section>
    )
}
