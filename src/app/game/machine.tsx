import {Box} from "@mui/material";
import {Turner} from "@/app/game/turner";
import {SlotClass} from "@/app/game/slot";

export function Machine({slotTurners}: Readonly<{slotTurners: SlotClass[][] }>) {
    return (
        <Box sx={{display: 'flex', flexDirection: 'row', gap: '5vmin', maskImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0) 33%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 67%, rgba(0,0,0,0))'}}>
            {slotTurners.map((slotTurner, i) =>
                <Turner key={`turner${i}`} slots={slotTurner} />)
            }
        </Box>
    )
}