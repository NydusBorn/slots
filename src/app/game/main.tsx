'use client'

import {Box, Button} from "@mui/material";
import {Machine} from "@/app/game/machine";
import {SlotClass} from "@/app/game/slot";
import React, {useEffect} from "react";

enum machineStates {
    idle,
    startingFirst,
    startingSecond,
    startingThird,
    spinning,
    adjusting,
    stopped,
}

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
    const fpsLimit = React.useMemo<number>(() => parseInt(localStorage.getItem('fps_limit')!), [])
    const timePerSpin = React.useMemo<number>(() => parseInt(localStorage.getItem('time_per_spin')!) * 1000, [])
    const [currentMoney, setCurrentMoney] = React.useState<number>(parseInt(localStorage.getItem('current_money')!))
    const [velocities, setVelocities] = React.useState<number[]>([1,1.1,0.9]) // 1 velocity corresponds to 0.2 offset per second
    const machineState = React.useRef<machineStates>(machineStates.idle)
    const spinStartTime = React.useRef<number>(0)
    const updater = async () => {
        function delay(milliseconds: number){
            return new Promise(resolve => {
                setTimeout(resolve, milliseconds);
            });
        }
        let startTime = Date.now();
        while (true){
            const checkTime = Date.now();
            for (let i = 0; i < slotFields.length; i++){
                const slotTurner = slotFields[i];
                for (const slot of slotTurner) {
                    slot.offset = (slot.offset + (velocities[i] * 0.0001 * (checkTime - startTime))) % 1
                }
            }
            switch (machineState.current){
                case machineStates.idle:{
                    break;
                }
                case machineStates.stopped:{
                    break;
                }
                case machineStates.startingFirst:{
                    if (checkTime - spinStartTime.current > 333){
                        machineState.current = machineStates.startingSecond
                        velocities[0] = 30
                    }
                    else {
                        velocities[0] += (checkTime - startTime) * (30 / 333)
                    }
                    break;
                }
                case machineStates.startingSecond:{
                    if (checkTime - spinStartTime.current > 667){
                        machineState.current = machineStates.startingThird
                        velocities[1] = 30
                    }
                    else {
                        velocities[1] += (checkTime - startTime) * (30 / 333)
                    }
                    break;
                }
                case machineStates.startingThird:{
                    if (checkTime - spinStartTime.current > 1000){
                        machineState.current = machineStates.spinning
                        velocities[2] = 30
                    }
                    else {
                        velocities[2] += (checkTime - startTime) * (30 / 333)
                    }
                    break;
                }
                case machineStates.spinning:{
                    if (checkTime - spinStartTime.current > timePerSpin - 500){
                        for (let i = 0; i < velocities.length; i++){
                            velocities[i] = 0
                        }
                        machineState.current = machineStates.adjusting
                    }
                    else {
                        const spinTime = timePerSpin - 1500
                        const speedDecrement = 30/spinTime
                        for (let i = 0; i < velocities.length; i++){
                            velocities[i] -= speedDecrement * (checkTime - startTime)
                        }
                    }
                    break;
                }
                case machineStates.adjusting:{
                    if (checkTime - spinStartTime.current > timePerSpin){
                        machineState.current = machineStates.stopped
                    }
                    for (const turner of slotFields){
                        let minimalDistance = 1
                        let minSlot = 6
                        let directionUp = true
                        for (let i = 0; i < turner.length; i++){
                            const slot = turner[i];
                            if (Math.abs(slot.offset - 0.4) < minimalDistance) {
                                minimalDistance = Math.abs(slot.offset - 0.4)
                                minSlot = i
                                directionUp = slot.offset - 0.4 > 0;
                            }
                        }
                        const distanceToCover = minimalDistance
                        const distancePerMs = distanceToCover / ((timePerSpin+200) - (checkTime - spinStartTime.current))
                        for (const slot of turner) {
                            slot.offset += distancePerMs * (checkTime - startTime) * (directionUp ? -1 : 1)
                        }
                    }
                    break;
                }
            }
            console.log(spinStartTime)
            startTime = Date.now()
            setSlotFields([...slotFields]);
            await delay(1000/(fpsLimit === 0 ? 1000 : fpsLimit));

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
        <Button variant={'contained'} size={'large'} disabled={machineState.current !== machineStates.idle && machineState.current !== machineStates.stopped} sx={{width: '90%'}} onClick={() => {
            setCurrentMoney(currentMoney - 100)
            machineState.current = machineStates.startingFirst
            spinStartTime.current = Date.now()
        }}>Spin</Button>
        <p>Your current money: {currentMoney}, each time you spin you spend 100 coins.</p>
    </Box>)
}