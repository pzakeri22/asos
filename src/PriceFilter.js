import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function MinimumDistanceSlider(props) {
    const chosenPriceRange = props.chosenPriceRange;
    const handleChange = props.storePriceChange;
    const fullPriceRange = props.fullPriceRange;
    const usePriceFilter = props.usePriceFilter;
    const valueText = props.valueText;

    return (
        <Box sx={{ width: 300 }}>
            <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={chosenPriceRange}
            onChange={handleChange}
            onMouseDown={usePriceFilter}
            onMouseUp={usePriceFilter}
            valueLabelDisplay="auto"
            getAriaValueText={valueText}
            disableSwap
            min={fullPriceRange[0]}
            max={fullPriceRange[1]}
            />
        </Box>
    );
}
