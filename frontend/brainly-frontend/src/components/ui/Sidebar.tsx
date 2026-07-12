import { SidebarItem } from "./SidebarItem"
import { ShareIcon } from "../icons/ShareIcon"

export function Sidebar() {
    return <div>
        <aside className="w-64 bg-gray-400">
            <p>Sidebar Navigation</p>
            <SidebarItem text = "tweets" startIcon = {<ShareIcon size = "md" />} />
        </aside>
    </div>
}