'use client'

import {Box, Button, Divider, Slider, TextField} from "@mui/material";
import React from "react";
import {number} from "prop-types";

export default function SettingsMain() {
    const [fpsLimit, setFpsLimit] = React.useState<number>( parseInt(localStorage.getItem('fps_limit')!))
    const [timePerSpin, setTimePerSpin] = React.useState<number>(parseInt(localStorage.getItem('time_per_spin')!))
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', width: '80vw', margin: 'auto', marginTop: '5vh', marginBottom: '2vh', gap: '3vh', flexGrow: 1}}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: '2vmin', padding: '1vmin', paddingLeft: '2vmin', paddingRight: '2vmin', gap: '0.5rem'}}>
                <p>
                    FPS Limit, set to 0 to disable
                </p>
                <Divider/>
                <Slider value={fpsLimit} marks valueLabelDisplay={'auto'} onChange={(e, value) => {
                    setFpsLimit(value as number)
                    localStorage.setItem('fps_limit', value.toString())
                }} step={10} min={0} max={100}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: '2vmin', padding: '1vmin', paddingLeft: '2vmin', paddingRight: '2vmin', gap: '0.5rem'}}>
                <p>
                    Time per spin in seconds
                </p>
                <Divider/>
                <Slider value={timePerSpin} marks valueLabelDisplay={'auto'} onChange={(e, value) => {
                    setTimePerSpin(value as number)
                    localStorage.setItem('time_per_spin', (value).toString())
                }} step={1} min={5} max={60}/>
            </Box>
            <Button sx={{marginTop: 'auto'}} variant={'contained'} color={'error'} onClick={() => {
                localStorage.setItem('current_money', '1000')
            }}>Reset Money</Button>
        </Box>
    )
}