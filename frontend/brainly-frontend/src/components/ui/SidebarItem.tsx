import type { ReactElement } from "react"

export interface SidebarItemProps {
    text: string;
    startIcon: ReactElement;
}

export const SidebarItem = (props: SidebarItemProps) => {
    return (
        <div className="flex items-center gap-3 py-3 hover:bg-gray-300/50 rounded-lg cursor-pointer">
           
            <div className="flex items-center justify-center size-6 text-gray-900 shrink-0 pr-2">
                {props.startIcon}
            </div>
           
            <span className="text-gray-900 font-medium text-base select-none leading-none">
                {props.text}
            </span>
        </div>
    )
}