import DentalSidebar from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0f18]">
      <DentalSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
