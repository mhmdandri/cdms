import Modal from '@/components/Modal';
import { type History } from '@/types/history';
import { Building2, CheckCircle, Layers, MapPin, ShieldCheck, StickyNote, User } from 'lucide-react';
import { useState } from 'react';
import formatDate from '../types/formatDate';

interface HistoryListProps {
    title?: string;
    rec?: History[];
    total?: number;
}

// Helper untuk styling berdasarkan type
const getTypeClasses = (type: string) => {
    if (type === 'loading') {
        return {
            bg: 'bg-blue-100 dark:bg-blue-900/40',
            text: 'text-blue-600 dark:text-blue-300',
            btn: 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30',
            icon: 'text-blue-600 dark:text-blue-400',
        };
    } else if (type === 'unloading') {
        return {
            bg: 'bg-green-100 dark:bg-green-900/40',
            text: 'text-green-600 dark:text-green-300',
            btn: 'text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30',
            icon: 'text-green-600 dark:text-green-400',
        };
    }
    // fallback warna abu
    return {
        bg: 'bg-gray-100 dark:bg-gray-700',
        text: 'text-gray-600 dark:text-gray-300',
        btn: 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700',
        icon: 'text-gray-600 dark:text-gray-400',
    };
};

export default function HistoryCard({ title = 'Loading Records', rec = [], total }: HistoryListProps) {
    const [showModal, setShowModal] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState<History | null>(null);

    const handleViewDetails = (e: React.MouseEvent<HTMLButtonElement>, history: History) => {
        setSelectedHistory(history);
        setShowModal(true);
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                <span className="self-start rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-600 md:self-auto dark:bg-blue-900/40 dark:text-blue-300">
                    Total Records: {typeof total === 'number' ? total : rec.length}
                </span>
            </div>

            {rec.length === 0 ? (
                <div className="flex items-center justify-center rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
                    No records available.
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {rec.map((history) => {
                        const styles = getTypeClasses(history.type);
                        return (
                            <div
                                key={history.id}
                                className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-all hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <span className={`rounded-full px-3 py-0.5 text-sm font-medium ${styles.bg} ${styles.text}`}>
                                        {history.container.container_number}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatDate(history.event_time, 'absolute', false)}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        <span>
                                            {history.location.zone} R{history.location.rows}-C{history.location.columns}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        <span>{history.user.name}</span>
                                    </div>
                                </div>

                                {/* Footer */}
                                <button
                                    className={`mt-5 inline-flex items-center gap-1 self-end rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${styles.btn}`}
                                    onClick={(e) => handleViewDetails(e, history)}
                                >
                                    View Details →
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Title>History Details</Modal.Title>
                <Modal.Body>
                    {selectedHistory && (
                        <div className="space-y-5">
                            {/* Header info */}
                            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                                <h3 className="mb-1 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                                    <Layers className={`h-5 w-5 ${getTypeClasses(selectedHistory.type).icon}`} />
                                    {selectedHistory.container.container_number}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Event on {formatDate(selectedHistory.event_time)}</p>
                            </div>

                            {/* Detail grid */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900">
                                    <User className="mt-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">User</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{selectedHistory.user.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900">
                                    <Building2 className="mt-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Customer</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{selectedHistory.customer.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900">
                                    <MapPin className="mt-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Location</p>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                            {selectedHistory.location.zone} R{selectedHistory.location.rows}-C{selectedHistory.location.columns}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900">
                                    <ShieldCheck className={`mt-1 h-4 w-4 ${getTypeClasses(selectedHistory.type).icon}`} />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Type</p>
                                        <span
                                            className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${getTypeClasses(selectedHistory.type).bg} ${getTypeClasses(selectedHistory.type).text}`}
                                        >
                                            {selectedHistory.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900">
                                    <ShieldCheck className="mt-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Condition</p>
                                        {selectedHistory.condition === 'good' ? (
                                            <span className="inline-flex rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                                {selectedHistory.condition}
                                            </span>
                                        ) : selectedHistory.condition === 'damaged' ? (
                                            <span className="inline-flex rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300">
                                                {selectedHistory.condition}
                                            </span>
                                        ) : (
                                            <span className="inline-flex rounded-md bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
                                                {selectedHistory.condition}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-neutral-700 dark:bg-neutral-900">
                                    <CheckCircle className="mt-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Status</p>
                                        <span className="inline-flex rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                                            {selectedHistory.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {selectedHistory.notes && (
                                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300">
                                    <StickyNote className="mt-0.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Notes</p>
                                        <p>{selectedHistory.notes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}
