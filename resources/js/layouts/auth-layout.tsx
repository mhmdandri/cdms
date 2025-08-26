// import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

// export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
//     return (
//         <AuthLayoutTemplate title={title} description={description} {...props}>
//             {children}
//         </AuthLayoutTemplate>
//     );
// }
// export default function AuthLayoutTemplate({
//     children,
//     title,
//     description,
//     ...props
// }: {
//     children: React.ReactNode;
//     title: string;
//     description: string;
// }) {
//     return (
//         <div
//             className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center text-white"
//             style={{
//                 backgroundImage: "url('/images/bg.png')",
//                 backgroundAttachment: 'fixed',
//             }}
//             {...props}
//         >
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/50"></div>

//             {/* Content */}
//            <div className="relative z-10 w-full max-w-md px-4">
//   <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center drop-shadow-lg">{title}</h1>
//   <p className="mb-6 text-sm md:text-base text-gray-200 text-center drop-shadow">{description}</p>
  
//   <div className="rounded-lg border border-white/30 bg-black/40 backdrop-blur-sm p-6">
//     {children}
//   </div>
// </div>

//         </div>
//     );
// }
export default function AuthLayoutTemplate({
  children,
  title,
  description,
  ...props
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundAttachment: 'fixed',
      }}
      {...props}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="rounded-lg border border-white/30 bg-black/40 backdrop-blur-sm p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center drop-shadow-lg">{title}</h1>
          <p className="mb-6 text-sm md:text-base text-gray-200 text-center drop-shadow">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

