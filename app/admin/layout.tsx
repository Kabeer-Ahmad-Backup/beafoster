export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-charcoal antialiased selection:bg-gold/35 selection:text-black">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(212,175,55,0.14),transparent_55%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
