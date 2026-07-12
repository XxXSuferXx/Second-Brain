import {ShareIcon} from "../icons/ShareIcon"

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter";
}

export function Card({title, link, type}: CardProps) {
    return (
        <div className = "p-8 bg-white rounded-md border-gray-200 max-w-72 border w-full">
            <div className = "flex justify-between">
                <div className = "flex items-center text-sm">
                    <div className = "text-gray-500 pr-2">   
                        <ShareIcon size = "md" />
                    </div>
                    {title}
                </div>
                <div className = "flex items-center">
                    <div className = "pr-2 text-gray-500">
                        <a href = {link} target = "_blank">
                            <ShareIcon size = "md"/>
                        </a>
                    </div>
                    <div className = "text-gray-500">
                        <ShareIcon size = "md"/>
                    </div>
                </div>
            </div>
            <div className = "pt-4">
                    {type === "youtube" && <iframe className = "w-full"
                    src= {link.replace("watch", "embed").replace("?v=", "/")} 
                    title="YouTube video player" allow="accelerometer; autoplay;
                     clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                     referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen></iframe>}
            </div>
        </div>
    )
}