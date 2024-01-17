'use client'

import {Box, Button} from "@mui/material";
import Slot from "@/app/game/slot";

export default function Turner() {
    return (
        <Box sx={{display: 'grid', height: '72vmin'}}>
            <Slot slotOffset={'0vmin'}/>
            <Slot slotOffset={'15vmin'}/>
            <Slot slotOffset={'30vmin'}/>
            <Slot slotOffset={'45vmin'}/>
            <Slot slotOffset={'60vmin'}/>
        </Box>
    )
}