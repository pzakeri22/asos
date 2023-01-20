import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

// const minDistance = 5;

export default function MinimumDistanceSlider(props) {
    const chosenPriceRange = props.chosenPriceRange;
    const handleChange = props.storePriceChange;
    const fullPriceRange = props.fullPriceRange;

    return (
        <Box sx={{ width: 300 }}>
            <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={chosenPriceRange}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            min={fullPriceRange[0]}
            max={fullPriceRange[1]}

            />
        </Box>
    );
}
