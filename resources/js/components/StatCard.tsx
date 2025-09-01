import { ArrowUpRight } from 'lucide-react';

type StatCardProps = {
    title: string;
    value: string | number;
    badge?: string;
    description?: string;
    icon?: boolean;
    variant?: 'default' | 'primary';
};

export default function StatCard({ title, value, badge, description, icon = true, variant = 'default' }: StatCardProps) {
    const isPrimary = variant === 'primary';
    const isPositiveBadge = badge?.startsWith('+'); // Cek jika badge dimulai dengan '+'

    return (
        <div
            className={
                isPrimary
                    ? 'relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 p-4 text-white'
                    : 'relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 text-gray-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100'
            }
        >
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-sm font-medium">{title}</h3>
                    <p className="mt-2 text-3xl font-bold">{value}</p>
                </div>
                {icon && <ArrowUpRight className={isPrimary ? 'h-6 w-6 text-white/80' : 'h-6 w-6 text-gray-500 dark:text-neutral-400'} />}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm">
                {badge && (
                    <span
                        className={
                            isPrimary
                                ? 'inline-flex items-center justify-center rounded-full bg-white/20 px-2 py-0.5 text-xs text-white'
                                : `inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs ${
                                      isPositiveBadge
                                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200' // Hijau untuk nilai '+'
                                          : 'bg-neutral-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-200' // Abu-abu untuk nilai lain
                                  }`
                        }
                    >
                        {badge}
                    </span>
                )}
                {description && <span className={isPrimary ? 'text-neutral-200' : 'text-gray-500 dark:text-neutral-400'}>{description}</span>}
            </div>
        </div>
    );
}
