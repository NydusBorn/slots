import {Box} from "@mui/material";
import React from "react";

export enum SlotIcon {
    Jackpot, // 1 percent, useless unless all 3 in line
    Loss, // 9 percent, having in line negates any other icons, unless all 3 are loss, in which case it's a small win
    Banana, // 50 percent, small win if paired with any other food (other than itself)
    Cherry, // 30 percent, win only if 2 on the line, medium win
    Grapes // 10 percent, big win if all food is different
}

export class SlotClass {
    offset: number = 0; // maps in the next way: 0 -> 0vmin, 0.2 -> 15vmin, ... 1 -> 75vmin
    symbol: SlotIcon = 0;
}

export function Slot({slotParams}: Readonly<{ slotParams: SlotClass }>) {
    return (
        <Box sx={{position: 'relative', top: `${slotParams.offset * 75}vmin`, gridRow: '1', gridColumn: '1', height: '12vmin', width: '12vmin', borderRadius: '1rem', borderWidth: '2px', borderColor: 'rgba(128, 128, 128, 0.5)', backgroundColor: 'rgba(128, 128, 128, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {(() => {
                switch (slotParams.symbol) {
                    case SlotIcon.Jackpot:
                        return <p>JACKPOT</p>;
                    case SlotIcon.Loss:
                        return <p>LOSS</p>;
                    case SlotIcon.Banana:
                        return <p>BANANA</p>;
                    case SlotIcon.Cherry:
                        return <p>CHERRY</p>;
                    case SlotIcon.Grapes:
                        return <p>GRAPE</p>;
                    default:
                        return <p>UNKNOWN</p>;
                }
            })()}
        </Box>
    )
}