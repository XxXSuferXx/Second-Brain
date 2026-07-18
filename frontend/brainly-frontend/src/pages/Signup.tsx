import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const userpasswordRef = useRef<HTMLInputElement>();

    async function signup () {
        const username = usernameRef.current?.value;
        const password = userpasswordRef.current?.value;
        await axios.post(`${BACKEND_URL} /api/v1/signup`, {
            data: {
                username, 
                password
            }
        })
        alert("You have signed in")
    }

    return <div className = "h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className = "bg-white rounded-xl border min-w-48 p-8">
            <Input ref = {usernameRef} placeholder = "UserName" />
            <Input ref = {userpasswordRef} placeholder = "password" />
            <div className = "flex justify-center pt-4">
                <Button loading = {false} variant = "primary" text = "SignUp" size = "sm" fullWidth = {true} onClick = {signup} /> 
            </div>
        </div>
    </div>
}