import React, { useEffect, useState, useRef } from "react";


export default function priceFilterContainer() {


    useEffect(() => {
        if (didMountRef.current === 2) {  //change to 1 before host because in production, strict mode won't be on so the render will be the first render
        observePriceChanges();
        }
        didMountRef.current++;   
        // consider useLayoutEffect
    });


    useEffect(() => {
        let pricesList = extractPriceFilters("price"); 
        setFullPriceRange(pricesList);
        setChosenPriceRange(pricesList);
    }, []);

    //done - removing from here
    useEffect(() => {
        // console.log(activePriceFilter);
    }, [activePriceFilter])


    function extractPriceFilters(key) {
        let lowestPrice = items[0][key];
        let highestPrice = items[0][key];
        for (let i = 1; i < items.length; i++) {
            if (items[i][key] > highestPrice) highestPrice=items[i][key];
            if (items[i][key] < lowestPrice) lowestPrice=items[i][key];
        }
        return [lowestPrice, highestPrice];
    }

    
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

            // const pricelow = () => {
    //     setActivePriceFilter("lowest");
    // }
    // const pricehigh = () => {
    //     setActivePriceFilter("highest");
    // }

    }

    
    const clearPrice = () => {
        setActivePriceFilter(null);
    }


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
    function valueText(value) {
        return `${value}°C`;
    }



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
    


}