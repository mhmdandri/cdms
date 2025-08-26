export default function formatDate(
    dateString: string | null | undefined,
    mode: 'relative' | 'absolute' | 'auto' = 'absolute', // default absolute
    showTime: boolean = true,
): string {
    if (!dateString) return '-';

    const date = new Date(dateString);
    const now = new Date();
    const diff = (date.getTime() - now.getTime()) / 1000; // dalam detik
    const absDiff = Math.abs(diff);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    // Kalau mode absolute → langsung return tanggal
    if (mode === 'absolute') {
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            ...(showTime && {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
        });
    }

    // Kalau mode relative → selalu pakai relative
    if (mode === 'relative') {
        if (absDiff < 60) return rtf.format(Math.round(diff), 'second');
        if (absDiff < 3600) return rtf.format(Math.round(diff / 60), 'minute');
        if (absDiff < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
        if (absDiff < 604800) return rtf.format(Math.round(diff / 86400), 'day');
    }

    // Mode auto (campuran)
    if (absDiff < 60) return rtf.format(Math.round(diff), 'second');
    if (absDiff < 3600) return rtf.format(Math.round(diff / 60), 'minute');
    if (absDiff < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
    if (absDiff < 604800) return rtf.format(Math.round(diff / 86400), 'day');

    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        ...(showTime && {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }),
    });
}
