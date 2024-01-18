import {Box} from "@mui/material";
import {Slot, SlotClass} from "@/app/game/slot";

export function Turner({slots}: Readonly<{ slots: SlotClass[] }>) {
    return (
        <Box sx={{display: 'grid', height: '72vmin'}}>
            {slots.map((slot, i) =>
                <Slot key={`slot${i}`} slotParams={slot}/>
            )}
        </Box>
    )
}