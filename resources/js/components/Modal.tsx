import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Loader2, X } from 'lucide-react';
import { ReactNode } from 'react';

// ================== MODAL COMPONENT ==================
interface ModalProps {
    show: boolean;
    isLoading?: boolean;
    isSuccess?: boolean;
    message?: string;
    onClose?: () => void;
    children?: ReactNode;
    footerChildren?: ReactNode;
}

function Modal({ show, isLoading = false, isSuccess = false, message, children, footerChildren, onClose }: ModalProps) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isLoading) {
            return;
        }
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        className={`relative mx-4 w-full max-w-md rounded-2xl p-6 shadow-2xl transition-colors ${
                            isLoading || isSuccess
                                ? 'border-none bg-transparent p-0 shadow-none'
                                : 'border border-gray-200/40 bg-white/80 dark:border-neutral-700/50 dark:bg-neutral-800/80'
                        } `}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        {/* Close Button */}
                        {onClose && !isLoading && !isSuccess && (
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 cursor-pointer rounded-full p-1 transition hover:bg-gray-200/50 dark:hover:bg-neutral-700"
                                aria-label="Close"
                            >
                                <X className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                            </button>
                        )}

                        {/* Body - Icon Animation */}
                        {!children && (
                            <div className="mb-2 flex justify-center">
                                <AnimatePresence mode="wait">
                                    {isLoading && (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Loader2 className="h-14 w-14 animate-spin text-blue-500" />
                                        </motion.div>
                                    )}

                                    {!isLoading && isSuccess && (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
                                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 20,
                                            }}
                                        >
                                            <CheckCircle2 className="h-14 w-14 text-green-500 dark:text-green-400" strokeWidth={1.75} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Custom Children */}
                        {children && <div className="my-4">{children}</div>}

                        {/* Default Message */}
                        {!children && message && (
                            <p
                                className={`mt-2 text-center text-base font-medium tracking-wide ${
                                    isLoading
                                        ? 'text-blue-500 dark:text-blue-400'
                                        : isSuccess
                                          ? 'text-green-500 dark:text-green-400'
                                          : 'text-gray-700 dark:text-gray-300'
                                } `}
                            >
                                {message}
                            </p>
                        )}

                        {/* Footer */}
                        {footerChildren && <div className="mt-6 flex justify-end space-x-3">{footerChildren}</div>}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

Modal.Title = function ModalTitle({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={`text-lg font-semibold text-gray-800 dark:text-gray-100 ${className || ''}`}>{children}</div>;
};

Modal.Body = function ModalBody({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={`my-4 text-gray-700 dark:text-gray-300 ${className || ''}`}>{children}</div>;
};

Modal.Footer = function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={`mt-6 flex justify-end space-x-3 ${className || ''}`}>{children}</div>;
};

export default Modal;
