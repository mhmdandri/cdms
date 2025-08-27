import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Positions',
        href: 'user/positions',
    },
];
type Container = {
    id: number;
    container_number: string;
    size: string;
    type: string;
    location: { id: number; zone: string; rows: string; columns: string };
    customer: { id: number; name: string };
    status: string;
    stack_level: number;
};
type Location = {
    id: number;
    zone: number;
    rows: number;
    columns: number;
};
export default function ShowPositions() {
    const { locations, containers } = usePage<{ containers: Container[]; locations: Location[] }>().props;
    const zones = [...new Set(locations.map((loc) => loc.zone))];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Positions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                <div className="relative min-h-fit flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-neutral-900">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Position Containers</h1>
                        <Button asChild>
                            <Link
                                href="/admin/customers/create"
                                className="border border-blue-600 bg-blue-600 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500"
                            >
                                Open 3D Map
                            </Link>
                        </Button>
                    </div>

                    {zones.map((zone) => (
                        <div key={zone} className="mb-10">
                            <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">📦 Zone {zone}</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                {locations
                                    .filter((location) => location.zone === zone)
                                    .map((location) => (
                                        <div
                                            key={location.id}
                                            className="rounded-lg border border-gray-300 bg-white p-3 shadow-sm dark:border-gray-600 dark:bg-neutral-800"
                                        >
                                            <div className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
                                                R{location.rows}-C{location.columns}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {containers
                                                    .filter((c) => c.location && c.location.id === location.id)
                                                    .sort((a, b) => b.stack_level - a.stack_level) // urutan stack dari atas ke bawah
                                                    .map((container) => (
                                                        <div key={container.id} className="rounded bg-blue-200 p-2 text-sm text-blue-900">
                                                            <div className="font-medium">
                                                                {container.container_number} ({container.stack_level})
                                                            </div>
                                                            <a
                                                                href={`/user/positions/${container.id}/move`}
                                                                className="block text-sm text-blue-800 underline hover:text-blue-600"
                                                            >
                                                                Pindah
                                                            </a>
                                                        </div>
                                                    ))}
                                                {containers.filter((c) => c.location && c.location.id === location.id).length === 0 && (
                                                    <div className="text-sm text-gray-400 italic dark:text-gray-500">No containers</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
