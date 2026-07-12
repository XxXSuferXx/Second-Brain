import type { ReactElement } from "react"

export interface SidebarItemProps {
    text: string;
    startIcon: ReactElement;
    endIcon?: ReactElement;
}

export const SidebarItem = (props: SidebarItemProps) => {
    return <div className = "flex items-center">
       {props.startIcon} {props.text} {props.endIcon}
    </div>
}