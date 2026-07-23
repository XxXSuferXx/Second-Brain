import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const userpasswordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin () {
        const username = usernameRef.current?.value;
        const password = userpasswordRef.current?.value;
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                    username, 
                    password
            });
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard");
            
        } catch(error) {
            console.error("Signin failed:", error);
            alert("Signin failed. Check console for details.");
        }
    }


    return <div className = "h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className = "bg-white rounded-xl border min-w-48 p-8">
            <Input reference = {usernameRef} placeholder = "UserName" />
            <Input reference = {userpasswordRef} placeholder = "password" />
            <div className = "flex justify-center pt-4">
                <Button loading = {false} variant = "primary" text = "SignIn" size = "sm" fullWidth = {true} onClick = {signin} /> 
            </div>
        </div>
    </div>
}