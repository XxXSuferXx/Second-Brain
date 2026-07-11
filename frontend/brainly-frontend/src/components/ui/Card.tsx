import {ShareIcon} from "../icons/ShareIcon"

export function Card() {
    return <div>
        <div className = "p-8 bg-white rounded-md border-gray-200 max-w-72 border">
            <div className = "flex justify-between">
                <div className = "flex items-center">
                    <div className = "text-gray-500 pr-2">   
                        <ShareIcon size = "md" />
                    </div>
                    <span>Project ideas</span>
                </div>
                <div className = "flex items-center">
                    <div className = "pr-2 text-gray-500">
                        <ShareIcon size = "md"/>
                    </div>
                    <div className = "text-gray-500">
                        <ShareIcon size = "md"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
}