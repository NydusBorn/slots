'use client'

import {Box, Button} from "@mui/material";
import Slot from "@/app/game/slot";

export default function Turner() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            <Slot/>
            <Slot/>
            <Slot/>
            <Slot/>
            <Slot/>
        </Box>
    )
}