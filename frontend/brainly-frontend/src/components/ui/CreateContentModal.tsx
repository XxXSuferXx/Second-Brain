import { CrossIcon } from "../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";

export function CreateContentModal({open, onClose}) {

    return (
    <div>
        {open && <div className = "w-screen h-screen bg-slate-500/60 fixed top-0 left-0 flex justify-center items-center"> 
            <div className = "flex flex-col justify-center">
                <div className = "bg-white opacity-100 p-4 rounded">
                    <div className = "flex justify-end cursor-pointer" onClick = {onClose}>
                       <CrossIcon />
                    </div>
                    <div className = "p-2 ">
                        <Input placeholder = "Title"/>
                        <Input placeholder = "Link"/>
                    </div>
                    <div className = "flex justify-center">
                        <Button variant = "primary" text = "Submit" size = "md" onClick={() => {}} />
                    </div>
                </div>
            </div>
        </div>}
    </div>
    );
}