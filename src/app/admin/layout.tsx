export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is not in use after removing the admin login feature.
  return <>{children}</>;
}
