import { SidebarItem } from "./SidebarItem"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"

export function Sidebar() {
    return <div>
        <div className="h-screen w-64 border-2 bg-gray-400 border-r fixed left-0 top-0">
            <p>Sidebar Navigation</p>
            <div>
                <SidebarItem text = "tweets" startIcon = {<TwitterIcon />} />
                <SidebarItem text = "youtube" startIcon = {<YoutubeIcon/>} />
            </div>
        </div>
    </div>
}