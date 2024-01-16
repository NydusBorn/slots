'use client'

import {Box, Button} from "@mui/material";
import Turner from "@/app/game/turner";

export default function Machine() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', gap: '2rem'}}>
            <Turner/>
            <Turner/>
            <Turner/>
        </Box>
    )
}