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
        title: 'List Customers',
        href: 'admin/customers',
    },
];

type Customer = {
    id: number;
    name: string;
    email: string;
    phone: number;
    address: string;
    total_containers: number;
    status: string;
};

export default function ShowCustomer() {
    // const { customers } = usePage<{ customers: Customer[] }>().props;
    const { customers } = usePage<{
        customers: {
            data: Customer[];
            links: { url: string | null; label: string; active: boolean }[];
        };
    }>().props;
    const { delete: destroy } = useForm();
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const destroyCustomer = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setSelectedId(id);
        setShowModal(true);
    };
    const handleConfirmDelete = () => {
        if (selectedId !== null) {
            destroy(route('customers.destroy', selectedId));
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
            <Head title="List Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-fit flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="mb-4 flex items-center justify-between">
                        <Button asChild>
                            <Link
                                href="/admin/customers/create"
                                className="border border-blue-600 bg-blue-600 px-2 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500"
                            >
                                Add Customer
                            </Link>
                        </Button>
                    </div>
                    {/* Table */}
                    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 dark:border-neutral-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                            <thead className="bg-gray-50 dark:bg-neutral-800">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Phone
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                                    >
                                        Address
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
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {customers.data.map(({ id, name, email, phone, address, total_containers, status }) => (
                                    <tr key={id} className="hover:bg-gray-50 dark:hover:bg-neutral-800">
                                        <td className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-gray-100">{name}</td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{email}</td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{phone}</td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">{address}</td>
                                        <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
                                            >
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`/admin/customers/${id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600"
                                                >
                                                    <Edit className="h-5 w-5" />
                                                </Link>
                                                <form onSubmit={(e) => destroyCustomer(e, id)}>
                                                    <button
                                                        type="submit"
                                                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
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
                <Pagination links={customers.links} />
            </div>
            <Modal show={showModal} onClose={handleCancelDelete}>
                <Modal.Title>Confirmation</Modal.Title>
                <Modal.Body>This action cannot be undone. Please confirm if you want to proceed with the deletion.</Modal.Body>
                <Modal.Footer>
                    <Button className="w-20" variant={'destructive'} onClick={handleConfirmDelete}>
                        Yes
                    </Button>
                    <Button className="w-20" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </AppLayout>
    );
}
