import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Briefcase, Cuboid, History, LayoutGrid, Map, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth?.user?.role === 'admin';
    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: isAdmin ? '/admin/dashboard' : '/dashboard',
            icon: LayoutGrid,
        },
        ...(isAdmin
            ? [
                  {
                      title: 'Containers ',
                      href: '/admin/containers',
                      icon: Cuboid,
                  },
                  {
                      title: 'Customers ',
                      href: '/admin/customers',
                      icon: UsersRound,
                  },
                  {
                      title: 'History',
                      href: '/admin/history',
                      icon: History,
                  },
              ]
            : [
                  {
                      title: 'Positions',
                      href: '/user/positions',
                      icon: Map,
                  },
              ]),
        {
            title: 'Task',
            href: isAdmin ? '/admin/task' : '/user/task',
            icon: Briefcase,
        },
    ];
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={isAdmin ? '/admin/dashboard' : '/dashboard'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
