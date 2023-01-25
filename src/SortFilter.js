// import Sort from './Sort';
// import Filter from './Filter';
import React, { useEffect, useState, useRef } from "react";
import {items} from "./listings.js";
import MinimumDistanceSlider from './PriceFilter.js';
import downArrow  from './imagesBank/down-arrow.png';


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
    const [brands, setBrands] = useState([]);
    const [colours, setColours] = useState([]);
    const [fits, setFits] = useState([]);
    const [fullPriceRange, setFullPriceRange] = useState([]);//causing the 5 minimum distance to break
    const [chosenPriceRange, setChosenPriceRange] = useState([]); 
    const [activePriceFilter, setActivePriceFilter] = useState(null);
    const didMountRef = useRef(0);
    const minDistance = 5;
    //which one is open
    //what is selected in each one?
    //class for open menu - open vs closed
    //class for closed menu with category selected vs none select
    //filter - are any of the others, except sort,  selected?


    // done
    useEffect(() => {
        if (didMountRef.current === 2) {  //change to 1 before host because in production, strict mode won't be on so the render will be the first render
          observePriceChanges();
        }
        didMountRef.current++;   
        // consider useLayoutEffect
    });

    //done - removed 3 price lines at bottom
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

   //done - leaving here

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

       //done - removing from here
    function extractPriceFilters(key) {
        let lowestPrice = items[0][key];
        let highestPrice = items[0][key];
        for (let i = 1; i < items.length; i++) {
            if (items[i][key] > highestPrice) highestPrice=items[i][key];
            if (items[i][key] < lowestPrice) lowestPrice=items[i][key];
        }
        return [lowestPrice, highestPrice];
    }

        //done - leaving here
    function sortArrAscending(arr) {
        return arr.sort();
    }

            //done - leaving here
    function toggleDropdown(buttonName) {
        setCurrentDropdown(buttonName);
    }

            //done - removing from here
    function storePriceChange(event, newValue, activeThumb) {
        // triggers when price filter is first clicked or if value changes
        if (!Array.isArray(newValue)) {
            return;
        }
        const highestLimit = Math.round((chosenPriceRange[1] - minDistance) * 100) / 100;
        const lowestLimit = Math.round((chosenPriceRange[0] + minDistance) * 100) / 100;
        
        // store in state which thumb is pressed. depending on which thumb in pressed, (onmousedown)

        if (activeThumb === 0) {
            setChosenPriceRange([Math.min(newValue[0], highestLimit), chosenPriceRange[1]]);
        } else {
            setChosenPriceRange([chosenPriceRange[0], Math.max(newValue[1], lowestLimit)]);
        }

    }

                //done - removing from here
    const clearPrice = () => {
        setActivePriceFilter(null);
    }

                    //done - removing from here
    const startObservation = (priceThumb, thumbPosition) => {
        const options = { //which portion of DOM to watch and what changes to watch for
            attributes: true
        }
        // console.log("startobservation");

        const prevState = priceThumb.classList.contains("Mui-active");
        
        const observer = new MutationObserver(mutationList => {
            mutationList.forEach(mutation => {
                if (mutation.type === "attributes" && mutation.attributeName === "class") {
                    const currState = priceThumb.classList.contains("Mui-active");
                    if (prevState !== currState) {
                        console.log(activePriceFilter);
                        if (currState) {
                            setActivePriceFilter(thumbPosition);
                        }
                        if (!currState) {
                            setActivePriceFilter(null);
                        }
                    }
                }
            })
        });

        observer.observe(priceThumb, options);  //start observation on 2nd render. Whenever change is observed, run the "new mutuation observer" above
    }
    
                        //done - removing from here
    const observePriceChanges = () => {
        // bug when drag price slider to middle then back down to either end again - the price label stays on blue
        const lowestPriceThumb = document.querySelector('[data-index="0"].MuiSlider-thumb');
        const highestPriceThumb = document.querySelector('[data-index="1"].MuiSlider-thumb');
        const lowestPriceLabel = document.querySelector(".price-label > .lowest");
        const highestPriceLabel = document.querySelector(".price-label > .highest");

        // first 2 dont work on first render
        // console.log(lowestPriceThumb)
        // console.log(highestPriceThumb)
        // console.log(lowestPriceLabel)
        // console.log(highestPriceLabel)
        lowestPriceThumb.addEventListener("mouseup", clearPrice);
        highestPriceThumb.addEventListener("mouseup", clearPrice );
        // lowestPriceThumb.addEventListener("mousedown", pricelow);
        // highestPriceThumb.addEventListener("mousedown", pricehigh );
        startObservation(lowestPriceThumb, "lowest");
        startObservation(highestPriceThumb, "highest");
    }

                            //done - removing from here
    useEffect(() => {
        // console.log(activePriceFilter);
    }, [activePriceFilter])

                                //done - removing from here
    function valueText(value) {
        return `${value}°C`;
      }


                                    //done - removing from here
    const usePriceFilter = (e) => {
        // what, if anything, should go in state. The fact that mouseup or mousedown is activated? Maybe, but we also need to store which event it is tied to as well. 
        // triggers when mouse is down on price filter, or mouse is released from price filter
        const lowestPriceThumb = document.querySelector('[data-index="0"].MuiSlider-thumb');
        const highestPriceThumb = document.querySelector('[data-index="1"].MuiSlider-thumb');
        const lowestPriceLabel = document.querySelector(".price-label > .lowest");
        const highestPriceLabel = document.querySelector(".price-label > .highest");
        // all these work;
        // console.log(lowestPriceThumb)
        // console.log(highestPriceThumb)
        // console.log(lowestPriceLabel)
        // console.log(highestPriceLabel)

        // console.log(e.type);
        // console.log(e);
        if (e.type === "mousedown") {
            // console.log(lowestPriceThumb);
            // console.log(lowestPriceThumb.classList);
            // console.log(highestPriceThumb);
            // console.log(highestPriceThumb.classList);

            // if (  ) {
                // console.log(111);
                // these do not work
                if ( lowestPriceThumb.matches('.Mui-active') || lowestPriceThumb.classList.contains("Mui-active") || lowestPriceThumb.style.backgroundColor === "#1976d2" ) {
                console.log(123);
                // setActivePriceFilter("lowest");
            }; 
            //  if ( highestPriceThumb.classList.contains("Mui-active") ) {
                if ( highestPriceThumb.classList.contains("Mui-active") ) {

                console.log(456);
                // setActivePriceFilter("highest");
            }; 
        }


        // if (e.type === "mouseup") {
        //     if ( !lowestPriceThumb.classList.contains("Mui-active") ) {
        //         setActivePriceFilter(null);
        //         lowestPriceLabel.style.colour="black";
        //     }; 
        //      if ( !highestPriceThumb.classList.contains("Mui-active") ) {
        //         setActivePriceFilter(null);
        //         highestPriceLabel.style.colour="black";
        //     }; 
        // }
        /* 
        event listener - press and hold - if press and hold on thumb, (will still need to check which one is active) change colour of price label. How know which thumb it is?
        when mui-active label is visible on thumb (or in general), (will still need to check which one is active) change colour of price label. Else if its not, make it black
        NO - when entering handleChange function, change colour of price label. then when leaves, change it back? 
        */
    }

    //done - leaving here
    useEffect(() => {
        console.log(currentDropdown);
    }, [currentDropdown])
    
    /* open - closed - is the dropdown open or not. If open, invert direction of arrow 
    focused or not - focused when clicked it (dropdown open) or when click it to come off (if dropdown closed, after few seconds, border turns grey then dissapears) 
    selected or not - when options are selected (and open or closed) the border around the outside dissapears, except the top which is thicker.
    */
    return (
        <section className="sort-filter">
            <div className="container">
                    <button className={`sort select ${currentDropdown === "sort"? "open": "closed"} selected unselected focused unfocused`} onClick={() => toggleDropdown("sort")}>
                        <div className="wrapper" >
                            <p className="mobile">SORT</p>
                            <p className="desktop">Sort</p>
                            <img src={downArrow} alt=""/> 
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

                    <button className={`filter select ${currentDropdown === "filter"? "open": "closed"}`} onClick={() => toggleDropdown("filter")}>
                        <div className="wrapper">
                            <p>FILTER</p>
                            {/* insert tick mark which becomes visible when filter selected */}
                        </div>
                    </button>
                    <button className={`type select ${currentDropdown === "type"? "open": "closed"}`} onClick={() => toggleDropdown("type")}>
                        <div className="wrapper">
                            <p>Product Type</p>
                            <img src={downArrow} alt=""/> 
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
                    <button className={`brand select ${currentDropdown === "brand"? "open": "closed"}`} onClick={() => toggleDropdown("brand")}>
                        <div className="wrapper">
                            <p>Brand</p>
                            <img src={downArrow} alt=""/> 
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "brand"? "open": "closed"}`}>
                        <div className="overview"></div>
                            <ul>
                                {brands? 
                                   brands.map((brand, index) => <li value={brand[0]} key={index}>{brand[0]}&nbsp;&nbsp;{`(${brand[1]})`}</li>) 
                                : ""}
                            </ul>
                        </div>
                    </button>
                    <button className={`colour select ${currentDropdown === "colour"? "open": "closed"}`} onClick={() => toggleDropdown("colour")}>
                        <div className="wrapper">
                            <p>Colour</p>
                            <img src={downArrow} alt=""/> 
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "colour"? "open": "closed"}`}>
                            <div className="overview"></div>
                            <ul>
                                {colours ? 
                                    colours.map((colour, index) => <li value={colour[0]} key={index}><div className={`${colour[0].toLowerCase()} sample`}></div>{colour[0]}&nbsp;&nbsp;{`(${colour[1]})`}</li>) 
                                : "" }
                            </ul>
                        </div>

                    </button>
                    <button className={`fit select ${currentDropdown === "fit"? "open": "closed"}`} onClick={() => toggleDropdown("fit")}>
                        <div className="wrapper">
                            <p>Body Fit</p>
                            <img src={downArrow} alt=""/> 
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "fit"? "open": "closed"}`}>
                            <div className="overview"></div>
                            <ul>
                                {fits ? 
                                    fits.map((fit, index) => <li value={fit[0]} key={index}>{fit[0]}&nbsp;&nbsp;{`(${fit[1]})`}</li>) 
                                : "" }

                            </ul>
                        </div>
                        
                    </button>
                    <button className={`price select ${currentDropdown === "price"? "open": "closed"}`} onClick={() => toggleDropdown("price")}>
                        <div className="wrapper">
                            <p>Price Range</p>
                            <img src={downArrow} alt=""/> 
                        </div>
                        <div className={`dropdown desktop ${currentDropdown === "price"? "open": "closed"}`}>
                            <div className="overview"></div>
                            <ul>
                                <li>
                                    <div className="price-label">
                                        <div className={`lowest ${activePriceFilter === "lowest" ? "active" : ""}`}>
                                            £{chosenPriceRange[0]}
                                        </div>
                                        <div className={`highest ${activePriceFilter === "highest" ? "active" : ""}`}>
                                            £{chosenPriceRange[1]}
                                            </div>
                                    </div>
                                    <MinimumDistanceSlider
                                    storePriceChange={storePriceChange} 
                                    chosenPriceRange={chosenPriceRange}
                                    fullPriceRange={fullPriceRange}
                                    usePriceFilter={usePriceFilter}
                                    valueText={valueText}
                                    />
                                </li>
                            </ul>
                        </div>
                    </button>

            </div>
        </section>
    )
}
