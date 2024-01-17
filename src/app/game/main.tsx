'use client'

import {Box, Button} from "@mui/material";
import Machine from "@/app/game/machine";

export default function GameMain() {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '3rem', justifyContent: 'center', alignItems: 'center'}}>
            <Machine/>
            <Button variant={'contained'} size={'large'} sx={{width: '90%'}}>Spin</Button>
        </Box>
    )
}