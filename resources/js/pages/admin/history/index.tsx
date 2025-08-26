import HistoryCard from '@/components/HistoryCard';
import Pagination from '@/components/Pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type History } from '@/types/history';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'List History',
        href: 'admin/history',
    },
];
export default function History() {
    const { records } = usePage<{
        records: {
            data: History[];
            total: number;
            links: { url: string | null; label: string; active: boolean }[];
        };
    }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="List History" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-fit flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <HistoryCard title="History Records" rec={records.data} total={records.total} />
                </div>
                <Pagination links={records.links} />
            </div>
        </AppLayout>
    );
}
