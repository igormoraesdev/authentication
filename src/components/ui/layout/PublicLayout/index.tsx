'use client';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full h-screen flex-col align-middle justify-center px-6 py-12 lg:px-8">
      {children}
    </div>
  );
}
