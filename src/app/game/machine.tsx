'use client'

import {Box, Button} from "@mui/material";
import Turner from "@/app/game/turner";

export default function Machine() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', gap: '5vmin', maskImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0) 33%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 67%, rgba(0,0,0,0))'}}>
            <Turner/>
            <Turner/>
            <Turner/>
        </Box>
    )
}