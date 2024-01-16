import {Metadata} from "next";
import {Box} from "@mui/material";
import GameMain from "@/app/game/main";

export const metadata: Metadata = {
    title: 'Slots: Game',
    description: 'Slots: Game',
}

export default function Home() {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
            <GameMain/>
        </Box>
    )
}