import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import Modal from './Modal';

const flashConfig = (flash: any) => {
    if (flash?.error) {
        return {
            title: 'Could not complete your request!',
            message: flash.error,
            color: 'red',
            icon: <AlertTriangle className="h-5 w-5 animate-pulse" />,
        };
    }
    if (flash?.success) {
        return {
            title: 'Successfully!',
            message: flash.success,
            color: 'green',
            icon: <CheckCircle2 className="h-5 w-5 animate-bounce" />,
        };
    }
    return null;
};

export default function FlashModal({ show, onClose, flash }: { show: boolean; onClose: () => void; flash: any }) {
    const config = flashConfig(flash);

    if (!config) return null;

    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Title>
                <div className={`flex items-center gap-2 text-${config.color}-600 dark:text-${config.color}-400`}>
                    {config.icon}
                    <span>{config.title}</span>
                </div>
            </Modal.Title>
            <Modal.Body>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-200">{config.message}</p>
            </Modal.Body>
        </Modal>
    );
}
