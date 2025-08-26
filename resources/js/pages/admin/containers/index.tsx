import Modal from '@/components/Modal';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'List Container',
        href: 'admin/containers',
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
export default function ShowContainer() {
    const isDisabled = false;
    const { containers } = usePage<{
        containers: {
            data: Container[];
            links: { url: string | null; label: string; active: boolean }[];
        };
    }>().props;
    const { delete: destroy } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const destroyContainer = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setSelectedId(id);
        setShowModal(true);
    };
    const handleConfirmDelete = () => {
        if (selectedId !== null) {
            destroy(route('containers.destroy', selectedId));
            setShowModal(false);
            setSelectedId(null);
        }
    };
    const handleCancelDelete = () => {
        setShowModal(false);
        setSelectedId(null);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="List Containers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-fit flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <Button asChild>
                            <Link
                                href="/admin/containers/create"
                                className="border border-blue-600 bg-blue-600 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500"
                            >
                                Add Container
                            </Link>
                        </Button>
                    </div>
                    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Container Number
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Size
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Location
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Owned
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Stack
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {containers.data.map(({ id, container_number, size, type, location, customer, status, stack_level }) => (
                                    <tr key={id}>
                                        <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">
                                            {container_number}
                                        </td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">{size}</td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">{type}</td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">
                                            {location?.zone} R{location?.rows}-C{location?.columns}
                                        </td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">{customer?.name}</td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">{status}</td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-300">{stack_level}</td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                {isDisabled ? (
                                                    <span className="text-blue-600 opacity-50 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600">
                                                        <Edit className="h-5 w-5" />
                                                    </span>
                                                ) : (
                                                    <Link
                                                        href={`/admin/containers/${id}/edit`}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600"
                                                    >
                                                        <Edit className="h-5 w-5" />
                                                    </Link>
                                                )}
                                                <form onSubmit={(e) => destroyContainer(e, id)}>
                                                    <button
                                                        type="submit"
                                                        className="cursor-pointer text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination links={containers.links} />
            </div>
            <Modal show={showModal} isLoading={isLoading} onClose={handleCancelDelete}>
                <Modal.Title>Confirmation</Modal.Title>
                <Modal.Body>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        This action cannot be undone. Please confirm if you want to proceed with the deletion.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="w-20 cursor-pointer" variant={'destructive'} onClick={handleConfirmDelete}>
                        Yes
                    </Button>
                    <Button className="w-20 cursor-pointer" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </AppLayout>
    );
}
