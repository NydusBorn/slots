'use client'

import {Box, Button} from "@mui/material";
import {Machine} from "@/app/game/machine";
import {SlotClass} from "@/app/game/slot";
import React, {useEffect} from "react";

export default function GameMain() {
    const [slotFields, setSlotFields] = React.useState<SlotClass[][]>(() => {
        const slotFields: SlotClass[][] = []
        for (let i = 0; i < 3; i++) {
            const slotColumn: SlotClass[] = []
            for (let j = 0; j < 5; j++) {
                slotColumn.push(new SlotClass())
                slotColumn[j].offset = j / 5
            }
            slotFields.push(slotColumn)
        }
        return slotFields
    })
    const updater = async () => {
        function delay(milliseconds: number){
            return new Promise(resolve => {
                setTimeout(resolve, milliseconds);
            });
        }
        while (true){
        for (const slotTurner of slotFields) {
            for (const slot of slotTurner) {
                slot.offset = (slot.offset + 0.001) % 1
            }
        }
        setSlotFields([...slotFields]);
        await delay(1000/60)
        }
    }
    useEffect(() => {
        updater()
    }, []);
    return (<Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '3rem',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Machine slotTurners={slotFields}/>
        <Button variant={'contained'} size={'large'} sx={{width: '90%'}}>Spin</Button>
    </Box>)
}