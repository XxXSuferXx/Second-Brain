import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export function Signin() {
    return <div className = "h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className = "bg-white rounded-xl border min-w-48 p-8">
            <Input placeholder = "UserName" />
            <Input placeholder = "password" />
            <div className = "flex justify-center pt-4">
                <Button loading = {false} variant = "primary" text = "SignUp" size = "sm" fullWidth = {true} onClick = {() => {}} /> 
            </div>
        </div>
    </div>
}