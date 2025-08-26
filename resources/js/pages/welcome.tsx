import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const dashbordRoute = auth.user 
        ? (auth.user.role === 'admin' ? route('admin.dashboard') : route('dashboard')) : route('login');
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div
                className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center text-white"
                style={{
                    backgroundImage: "url('/images/bg.png')",
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Hero content */}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                        CONTAINER DEPOT MANAGEMENT SYSTEM
                    </h1>
                    <p className="mb-6 text-sm md:text-xl text-gray-200 max-w-xl mx-auto drop-shadow">
                        Efficiently manage and monitor your container traffic in real time.
                    </p>
                    <Link
                        href={dashbordRoute}
                        className="inline-block rounded-4xl border border-white/60 px-5 md:px-6 py-2.5 md:py-3 text-xs md:text-base font-medium text-white hover:bg-white/20 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        Get Started
                    </Link>
                </div>
            </div>
        </>
    );
}
