import { Button } from "@/components/ui/button";
import { useNhostClient } from "@nhost/react";
import { useNavigate } from "react-router-dom"

export default function PageHome() {
    const navigate = useNavigate();
    const nhost = useNhostClient();
    const handleFormSubmit = async () => {
        const { error } = await nhost.auth.signIn({
            email: import.meta.env.VITE_EMAIL,
            password: import.meta.env.VITE_PASSWORD
        });
        if (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div>JarviStatistique</div>
            <Button onClick={async () => {
                await handleFormSubmit();
                navigate("dashboard")
            }}>To dashboard</Button>
        </div>

    )
}