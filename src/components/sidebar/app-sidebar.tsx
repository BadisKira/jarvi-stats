import {
  Brain,
  Home,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";


const items = [
  {
    title: "Accueil",
    href: "/dashboard",
    icon: Home,
  }
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className=" mb-8">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">JarviStats</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link to={item.href}>
                    <SidebarMenuButton asChild>
                      <span>
                        <item.icon />
                        <span>{item.title}</span>
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
