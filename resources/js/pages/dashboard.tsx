import { Activities } from '@/components/Activities';
import StatCard from '@/components/StatCard';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage().props as any;
    useEffect(() => {
        if (auth?.user?.role === 'admin') {
            router.get('/admin/dashboard', {}, { replace: true });
        }
    }, [auth]);
    const { newTasks, completedTask, totalCompletedTasks, cancelledTasks, totalTasks } = usePage<{
        newTasks: number;
        completedTask: number;
        totalCompletedTasks: number;
        cancelledTasks: number;
        totalTasks: number;
    }>().props;
    // const [showModal, setShowModal] = useState(false);
    // const flash = {
    //     success: 'Sukses',
    //     // error: 'error',
    //     // info: 'Selamat datang di dashboard Anda!',
    // };
    // useEffect(() => {
    //     setShowModal(true);
    // });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <StatCard
                        title="New Tasks"
                        value={newTasks}
                        badge={completedTask > 0 ? `+${completedTask}` : `${completedTask}`}
                        description="Tasks your completed this month"
                    />
                    <StatCard
                        title="Cancelled Tasks"
                        value={cancelledTasks}
                        badge={cancelledTasks > 0 ? `+${cancelledTasks}` : `${cancelledTasks}`}
                        description="Increased from last month"
                    />
                    <StatCard
                        title="Completed Tasks"
                        value={totalCompletedTasks}
                        badge={totalCompletedTasks > 0 ? `+${totalCompletedTasks}` : `${totalCompletedTasks}`}
                        description="Total tasks completed this month"
                    />
                    <StatCard
                        title="Total Tasks"
                        value={totalTasks}
                        badge={totalTasks > 0 ? `+${totalTasks}` : `${totalTasks}`}
                        description="Total tasks this month"
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
