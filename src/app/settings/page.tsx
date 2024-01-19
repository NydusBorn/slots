import {Metadata} from "next";
import SettingsMain from "@/app/settings/main";

export const metadata: Metadata = {
    title: 'Slots: Settings',
    description: 'Slots: Settings',
}

export default function Home() {
    return (
        <SettingsMain/>
    )
}