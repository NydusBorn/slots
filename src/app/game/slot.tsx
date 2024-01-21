import {Box} from "@mui/material";
import React from "react";
import Image from "next/image"

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
        <Box sx={{position: 'relative', top: `${slotParams.offset * 75}vmin`, padding: '1rem', gridRow: '1', gridColumn: '1', height: '12vmin', width: '12vmin', borderRadius: '1rem', borderWidth: '2px', borderColor: 'rgba(128, 128, 128, 0.5)', backgroundColor: 'rgba(128, 128, 128, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {(() => {
                switch (slotParams.symbol) {
                    case SlotIcon.Jackpot:
                        return <Image src={"/Jackpot.png"} alt={'JACKPOT'} width={2000} height={2000} />;
                    case SlotIcon.Loss:
                        return <Image src={"/Loss.png"} alt={'LOSS'} width={2000} height={2000} />;
                    case SlotIcon.Banana:
                        return <Image src={"/Banana.png"} alt={'BANANA'} width={2000} height={2000} />;
                    case SlotIcon.Cherry:
                        return <Image src={"/Cherry.png"} alt={'CHERRY'} width={2000} height={2000} />;
                    case SlotIcon.Grapes:
                        return <Image src={"/Grape.png"} alt={'GRAPES'} width={100} height={100} />;
                    default:
                        return <p>UNKNOWN</p>;
                }
            })()}
        </Box>
    )
}