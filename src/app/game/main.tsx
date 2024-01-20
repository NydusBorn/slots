'use client'

import {Box, Button, Dialog} from "@mui/material";
import {Machine} from "@/app/game/machine";
import {SlotClass, SlotIcon} from "@/app/game/slot";
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
    const fpsLimit = React.useRef<number>(0)
    const timePerSpin = React.useRef<number>(0)
    const currentMoney = React.useRef<number>(0)
    const [velocities, setVelocities] = React.useState<number[]>([1, 1.1, 0.9]) // 1 velocity corresponds to 0.2 offset per second
    const [resultDialogText, setResultDialogText] = React.useState<string>("")
    const machineState = React.useRef<machineStates>(machineStates.idle)
    const spinStartTime = React.useRef<number>(0)
    const updater = async () => {
        function delay(milliseconds: number) {
            return new Promise(resolve => {
                setTimeout(resolve, milliseconds);
            });
        }

        let startTime = Date.now();
        while (true) {
            const checkTime = Date.now();
            for (let i = 0; i < slotFields.length; i++) {
                const slotTurner = slotFields[i];
                for (const slot of slotTurner) {
                    const next_offset = (slot.offset + (velocities[i] * 0.0001 * (checkTime - startTime)))
                    if (next_offset > 1) {
                        slot.offset = next_offset % 1
                        const roll = Math.random()
                        if (roll <= 0.01) {
                            slot.symbol = SlotIcon.Jackpot
                        } else if (roll <= 0.1) {
                            slot.symbol = SlotIcon.Loss
                        } else if (roll <= 0.6) {
                            slot.symbol = SlotIcon.Banana
                        } else if (roll <= 0.9) {
                            slot.symbol = SlotIcon.Cherry
                        } else {
                            slot.symbol = SlotIcon.Grapes
                        }
                    }
                    slot.offset = next_offset % 1
                }
            }
            switch (machineState.current) {
                case machineStates.idle: {
                    break;
                }
                case machineStates.stopped: {
                    break;
                }
                case machineStates.startingFirst: {
                    if (checkTime - spinStartTime.current > 333) {
                        machineState.current = machineStates.startingSecond
                        velocities[0] = 30 + (Math.random() - 0.5)
                    } else {
                        velocities[0] += (checkTime - startTime) * (30 / 333)
                    }
                    break;
                }
                case machineStates.startingSecond: {
                    if (checkTime - spinStartTime.current > 667) {
                        machineState.current = machineStates.startingThird
                        velocities[1] = 30 + (Math.random() - 0.5)
                    } else {
                        velocities[1] += (checkTime - startTime) * (30 / 333)
                    }
                    break;
                }
                case machineStates.startingThird: {
                    if (checkTime - spinStartTime.current > 1000) {
                        machineState.current = machineStates.spinning
                        velocities[2] = 30 + (Math.random() - 0.5)
                    } else {
                        velocities[2] += (checkTime - startTime) * (30 / 333)
                    }
                    break;
                }
                case machineStates.spinning: {
                    if (checkTime - spinStartTime.current > timePerSpin.current - 500) {
                        for (let i = 0; i < velocities.length; i++) {
                            velocities[i] = 0
                        }
                        machineState.current = machineStates.adjusting
                    } else {
                        const spinTime = timePerSpin.current - 1500
                        const speedDecrement = 30 / spinTime
                        for (let i = 0; i < velocities.length; i++) {
                            velocities[i] -= speedDecrement * (checkTime - startTime)
                        }
                    }
                    break;
                }
                case machineStates.adjusting: {
                    if (checkTime - spinStartTime.current > timePerSpin.current + 100) {
                        machineState.current = machineStates.stopped
                        let slotIcons:SlotIcon[] = []
                        for (const turner of slotFields) {
                            let minimalDistance = 1
                            let minSlot = 6
                            for (let i = 0; i < turner.length; i++) {
                                const slot = turner[i];
                                if (Math.abs(slot.offset - 0.4) < minimalDistance) {
                                    minimalDistance = Math.abs(slot.offset - 0.4)
                                    minSlot = i
                                }
                            }
                            slotIcons.push(turner[minSlot].symbol)
                        }
                        let jackpots = 0
                        let losses = 0
                        let bananas = 0
                        let cherries = 0
                        let grapes = 0
                        for (const slotIcon of slotIcons) {
                            switch (slotIcon) {
                                case SlotIcon.Jackpot: {
                                    jackpots++
                                    break;
                                }
                                case SlotIcon.Loss: {
                                    losses++
                                    break;
                                }
                                case SlotIcon.Banana: {
                                    bananas++
                                    break;
                                }
                                case SlotIcon.Cherry: {
                                    cherries++
                                    break;
                                }
                                case SlotIcon.Grapes: {
                                    grapes++
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }
                        if (jackpots === 3) {
                            currentMoney.current += 25100
                            setResultDialogText("You won a jackpot! +25000 coins")
                        }
                        else if (losses === 3){
                            currentMoney.current += 101
                            setResultDialogText("You may want to rethink your life choices... +1 coin")
                        }
                        else if (losses >= 1){
                            setResultDialogText("You didnt win any coins...")
                        }
                        else if (grapes === 1 && cherries === 1 && bananas === 1) {
                            currentMoney.current += 1100
                            setResultDialogText("Diversity bonus! +1000 coins")
                        }
                        else if (cherries === 2){
                            currentMoney.current += 600
                            setResultDialogText("All good things come in pairs! +500 coins")
                        }
                        else if (bananas >= 1 && (cherries >= 1 || grapes >= 1)) {
                            currentMoney.current += 150
                            setResultDialogText("You won a banana! +50 coins")
                        }
                        else if (bananas === 3){
                            setResultDialogText("An unhealthy obsession...")
                        }
                        else {
                            setResultDialogText("Unexpected situation!!!")
                        }
                        localStorage.setItem("current_money", currentMoney.current.toString())
                    } else {
                        for (const turner of slotFields) {
                            let minimalDistance = 1
                            let directionUp = true
                            for (const slot of turner) {
                                if (Math.abs(slot.offset - 0.4) < minimalDistance) {
                                    minimalDistance = Math.abs(slot.offset - 0.4)
                                    directionUp = slot.offset - 0.4 > 0;
                                }
                            }
                            const distanceToCover = minimalDistance
                            const distancePerMs = distanceToCover / ((timePerSpin.current + 200) - (checkTime - spinStartTime.current))
                            for (const slot of turner) {
                                slot.offset += distancePerMs * (checkTime - startTime) * (directionUp ? -1 : 1)
                            }
                        }
                    }
                    break;
                }
            }
            startTime = Date.now()
            setSlotFields([...slotFields]);
            await delay(1000 / (fpsLimit.current === 0 ? 1000 : fpsLimit.current));
        }
    }
    useEffect(() => {
        fpsLimit.current = parseInt(localStorage.getItem('fps_limit')!)
        timePerSpin.current = parseInt(localStorage.getItem('time_per_spin')!) * 1000
        currentMoney.current = parseInt(localStorage.getItem('current_money')!)
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
        <Button variant={'contained'} size={'large'}
                disabled={machineState.current !== machineStates.idle && machineState.current !== machineStates.stopped}
                sx={{width: '90%'}} onClick={() => {
            currentMoney.current -= 100
            machineState.current = machineStates.startingFirst
            spinStartTime.current = Date.now()
        }}>Spin</Button>
        <p>Your current money: {currentMoney.current}, each time you spin you spend 100 coins.</p>
        <Dialog open={resultDialogText !== ""} onClose={() => {
            setResultDialogText("")
        }}><Box sx={{padding: '1rem'}}>{resultDialogText}</Box></Dialog>
    </Box>)
}