import { Activities } from '@/components/Activities';
import StatCard from '@/components/StatCard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function AdminDashboard() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Admin Dashboard',
            href: 'admin/dashboard',
        },
    ];
    const { totalCustomers, diffCustomer, diffContainer, totalContainers, inYard, otherContainers, availableStackSlots, totalStackSlots } = usePage<{
        totalCustomers: number;
        diffCustomer: number;
        totalContainers: number;
        diffContainer: number;
        inYard: number;
        otherContainers: number;
        availableStackSlots: number;
        totalStackSlots: number;
    }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <StatCard
                        title="Containers in Depot"
                        value={inYard}
                        badge={otherContainers > 0 ? `+${otherContainers}` : `${otherContainers}`}
                        description="Containers not in yard"
                    />
                    <StatCard
                        title="Available Stacks"
                        value={availableStackSlots}
                        badge={totalStackSlots > 0 ? `${totalStackSlots}` : `${totalStackSlots}`}
                        description="Total locations available"
                    />
                    <StatCard
                        title="Total Customers"
                        value={totalCustomers}
                        badge={diffCustomer > 0 ? `+${diffCustomer}` : `${diffCustomer}`}
                        description="Increased from last month"
                    />
                    <StatCard
                        title="Total Containers "
                        value={totalContainers}
                        badge={diffContainer > 0 ? `+${diffContainer}` : `${diffContainer}`}
                        description="Increased from last month"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Activities.Chart />
                    <Activities.List limit={4} />
                </div>
            </div>
        </AppLayout>
    );
}
