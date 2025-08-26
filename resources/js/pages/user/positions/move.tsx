import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Move Container',
        href: '/user/positions',
    },
];
type Container = {
    id: number;
    container_number: string;
    size: string;
    type: string;
    location: { id: number; zone: string; rows: string; columns: string };
    customer: { id: number; name: string; email: string; phone: number; address: string; status: string };
    status: string;
    stack_level: number;
};
type Location = {
    id: number;
    zone: string;
    rows: string;
    columns: string;
};

export default function MoveContainer() {
    const { container } = usePage<{ container: Container }>().props;
    const { locations } = usePage<{ locations: Location[] }>().props;
    const zones = [...new Set(locations.map((loc) => loc.zone))];
    const { errors } = usePage().props as { errors: Record<string, string> };
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, put } = useForm({
        container_number: container.container_number || '',
        location_id: container.location?.id || '',
        status: container.status || 'in_yard',
        stack_level: container.stack_level,
    });
    const max = 5;
    const [localErrors, setLocalErrors] = useState(errors);
    useEffect(() => {
        setLocalErrors(errors);
    }, [errors]);
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setShowModal(true);
        put(route('positions.update', container.id), {
            onSuccess: () => {
                setIsLoading(false);
                setTimeout(() => {
                    setShowModal(false);
                    router.visit('/user/positions', { replace: true, preserveScroll: true });
                }, 1000);
            },
            onError: () => {
                setIsLoading(false);
                setShowModal(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Move Container" />
            <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="relative min-h-fit flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-neutral-900">
                        <div className="mb-2">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Move Container</h1>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Move the container from its current location to a new target location. The current stack level is visualized below.
                            </p>
                        </div>
                        <div className="mb-6">
                            <h2 className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
                                Current Location: {container.container_number}
                            </h2>
                            <div className="mt-6 flex flex-row items-start gap-8">
                                <p className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <span className="rounded-md bg-blue-100 px-2 py-1 dark:bg-blue-900/30">{zones}</span>
                                    <span className="rounded-md bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800">
                                        R{container.location?.rows}-C{container.location?.columns}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="location_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Lokasi Tujuan
                                </label>
                                <select
                                    value={data.location_id}
                                    onChange={(e) => setData('location_id', e.target.value)}
                                    name="location_id"
                                    id="location_id"
                                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-neutral-800 dark:text-white"
                                >
                                    <option value="">Pilih lokasi</option>
                                    {locations.map(({ id, zone, rows, columns }) => (
                                        <option key={id} value={id}>
                                            {zone} - R{rows}-C{columns}
                                        </option>
                                    ))}
                                </select>
                                {localErrors.location_id && <p className="mt-1 text-sm text-red-500">{localErrors.location_id}</p>}
                            </div>

                            <div className="justify-left flex items-center gap-4">
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className="border border-blue-600 bg-primary px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Memindahkan...
                                        </>
                                    ) : (
                                        'Simpan Perubahan'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Modal
                show={showModal}
                isLoading={isLoading}
                isSuccess={!isLoading}
                message={isLoading ? 'Sedang memproses...' : 'Container berhasil dipindahkan!'}
                onClose={() => setShowModal(false)}
            />
        </AppLayout>
    );
}
