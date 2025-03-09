import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";


export default function ErrorComponent() {
    const onRetry = () => {
        window.location.reload()
    }
    return (
        <Card className="max-w-md mx-auto p-4 border border-red-300 bg-red-50 text-red-700 rounded-lg shadow-sm">
            <CardContent className="flex flex-col items-center text-center space-y-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <p className="text-sm font-medium">Un problème est survenu. Veuillez réessayer.</p>
                <Button onClick={onRetry} variant="destructive" className="w-full">
                    Réessayer
                </Button>
            </CardContent>
        </Card>
    );
}
