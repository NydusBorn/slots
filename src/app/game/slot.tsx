'use client'

import {Box, Button} from "@mui/material";
import React from "react";

export default function Slot() {
    const possibleSymbols = ['7', 'a', 'b', 'c']
    const [symbol, setSymbol] = React.useState(possibleSymbols[0])
    return (
        <Box sx={{height: '5rem', width: '5rem', borderRadius: '1rem', borderWidth: '2px', borderColor: 'rgba(128, 128, 128, 0.5)', backgroundColor: 'rgba(128, 128, 128, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p>{symbol}</p>
        </Box>
    )
}