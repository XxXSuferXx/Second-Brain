import { SidebarItem } from "./SidebarItem"
import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { Logo } from "../icons/Logo"

export function Sidebar() {
    return <div>
        <div className="h-screen w-64 border-2 bg-gray-400 border-r fixed left-0 top-0 pl-6">
            <div className = "flex text-2xl pt-4 items-center">
                <div className = "pr-2 text-purple-700">
                    <Logo />
                </div>
                Brainly
            </div>
            <div>
                <SidebarItem text = "Tweets" startIcon = {<TwitterIcon />} />
                <SidebarItem text = "Youtube" startIcon = {<YoutubeIcon/>} />
            </div>
        </div>
    </div>
}