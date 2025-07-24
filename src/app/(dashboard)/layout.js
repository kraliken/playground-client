import { AppSidebar } from "@/components/AppSidebar"
import Navbar from "@/components/Navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers"

const DashboardLayout = async ({ children }) => {

    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-full min-h-full">
                <Navbar />
                <div className="px-4">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout