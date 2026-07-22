import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const userpasswordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup () {
        const username = usernameRef.current?.value;
        const password = userpasswordRef.current?.value;

        try{
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                    username, 
                    password
            });
        navigate("/signin");
        } catch(error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Check console for details.");
        }
    }

    return <div className = "h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className = "bg-white rounded-xl border min-w-48 p-8">
            <Input reference = {usernameRef} placeholder = "UserName" />
            <Input reference = {userpasswordRef} placeholder = "password" />
            <div className = "flex justify-center pt-4">
                <Button loading = {false} variant = "primary" text = "SignUp" size = "sm" fullWidth = {true} onClick = {signup} /> 
            </div>
        </div>
    </div>
}