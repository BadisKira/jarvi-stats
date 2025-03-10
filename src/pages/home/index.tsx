import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart3, ChevronRight } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Navigation */}
            <nav className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <BarChart3 className="h-8 w-8 text-primary" />
                        <span className="text-2xl font-bold">JarviStats</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/dashboard">
                            <Button variant="ghost">Dashboard</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold tracking-tight mb-6">
                        Analysez vos données <span className="text-blue-600">et ameliorez votre outreach</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        JarviStats vous aide à visualiser et analyser vos données avec des outils statistiques avancés et une interface intuitive.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/dashboard">
                            <Button size="lg" className="gap-2">
                                Accéder au Dashboard <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>


            <footer className="border-t h-20 mt-auto">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BarChart3 className="h-6 w-6 text-primary" />
                            <span className="font-semibold">JarviStats</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2025 JarviStats. je suis pas sur que tous les droits sont réservés.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}