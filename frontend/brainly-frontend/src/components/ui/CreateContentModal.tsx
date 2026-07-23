import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({open, onClose}) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            type,
            title   
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })

        onClose();
    }

    return (
    <div>
        {open && <div className = "w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center items-center"> 
            <div className = "flex flex-col justify-center">
                <div className = "bg-white opacity-100 p-4 rounded">
                    <div className = "flex justify-end cursor-pointer" onClick = {onClose}>
                       <CrossIcon />
                    </div>
                    <div className = "p-2 ">
                        <Input reference = {titleRef} placeholder = "Title"/>
                        <Input reference = {linkRef} placeholder = "Link"/>
                    </div>
                    <h1>Type</h1>
                    <div className = "flex gap-2"> 
                        <Button text = "Youtube" variant = {type === ContentType.Youtube ?
                         "primary": "secondary"} onClick = {() => {
                            setType(ContentType.Youtube)
                         }}></Button>
                        <Button text = "Twitter" variant = {type === ContentType.Twitter ?
                         "primary": "secondary"} onClick = {() => {
                            setType(ContentType.Twitter)
                         }}></Button>
                    </div>
                    <div className = "flex justify-center">
                        <Button variant = "primary" text = "Submit" size = "md" onClick={addContent} />
                    </div>
                </div>
            </div>
        </div>}
    </div>
    );
}