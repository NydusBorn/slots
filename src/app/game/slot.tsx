import {Box} from "@mui/material";
import React from "react";

export class SlotClass {
    offset: number = 0; // maps in the next way: 0 -> 0vmin, 0.2 -> 15vmin, ... 1 -> 75vmin
    symbol: string = '7';
}

export function Slot({slotParams}: Readonly<{ slotParams: SlotClass }>) {
    return (
        <Box sx={{position: 'relative', top: `${slotParams.offset * 75}vmin`, gridRow: '1', gridColumn: '1', height: '12vmin', width: '12vmin', borderRadius: '1rem', borderWidth: '2px', borderColor: 'rgba(128, 128, 128, 0.5)', backgroundColor: 'rgba(128, 128, 128, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p>{slotParams.symbol}</p>
        </Box>
    )
}