'use client'

import {Box, Button} from "@mui/material";
import React from "react";

export default function Slot({slotOffset}: {slotOffset: string}) {
    return (
        <Box sx={{position: 'relative', top: slotOffset, gridRow: '1', gridColumn: '1', height: '12vmin', width: '12vmin', borderRadius: '1rem', borderWidth: '2px', borderColor: 'rgba(128, 128, 128, 0.5)', backgroundColor: 'rgba(128, 128, 128, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p>{'7'}</p>
        </Box>
    )
}